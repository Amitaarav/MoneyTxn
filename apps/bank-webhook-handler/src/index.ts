import express from 'express'
import crypto from "crypto"
import db from "@repo/db/client"
import z from 'zod'

const app = express()

const bankWebhookSchema = z.object({
    token: z.string(),
    user_identifier: z.string().uuid(), // Ensure it's a valid UUID
    amount: z.string().regex(/^\d+$/) // Ensure it's a numeric string
})

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET as string;

if(!WEBHOOK_SECRET){
    throw new Error("WEBHOOK_SECRET environment variable is not set. Refusing to start...");
}
// whithout secret -> anyone can send requests to the server

// The verify callback runs before JSON.parse()
// save the original bytes -HMAC must be computed over the exact bytes
// the bank sent, not over a re-serialised JS object.

app.use(
    express.json({
        verify: (req: any, res, buf) => {
            req.rawBody = buf;
        }
    })
)

// HMAC verification middleware

function verifyHmacSignature(req: any, res: any, next: any){
    // expect "sha256=<hex>"
    const receivedSig = req.headers['x-webhook-signature'] as string | undefined;
    const receivedTs = req.headers['x-webhook-timestamp'] as string | undefined;
    
    if(!receivedSig || !receivedTs){
        return res.status(401).json({ message: "Unauthorized"})
    }

    // Replay attack window: reject request older than 5 minutes
    const tsMs = parseInt(receivedTs, 10);
    const ageMs = Date.now() - tsMs;

    if(isNaN(tsMs) || ageMs > 5 * 60 * 1000 || ageMs < -30_000){
        return res.status(401).json({message: "Unauthorized"})
    }

    // recompute the expected signature
    // sign timestamp + body together so the signature is unique per-request
    
    const rawBody = req.rawBody as Buffer;

    const expectedSig = 'sha256=' + crypto.createHmac('sha256', WEBHOOK_SECRET)
        .update(receivedTs + '.')
        .update(rawBody)
        .digest('hex');

    // timing safe comparision
    //

    const a = Buffer.from(receivedSig);
    const b = Buffer.from(expectedSig);

    if(a.length !== b.length || !crypto.timingSafeEqual(a,b)){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    next();
    
}

app.post("/bankwebhook", verifyHmacSignature, async (req: any, res: any) => {
    // ── 1. Security Check ──
    const parsed = bankWebhookSchema.safeParse(req.body);
    
    if (!parsed.success) {
        return res.status(400).json({ message: "Invalid request format", errors: parsed.error.flatten() })
    }

    const { token, user_identifier: userId, amount } = parsed.data;

    class FinalStateError extends Error {};
    class TransientError extends Error {};

    try {
        // ── 3. Atomically check and update ──
        await db.$transaction(async (tx) => {
            // a. Find and lock the transaction record
            // Note: Using findUnique on token ensures exact match
            const rampTxn = await tx.rampTransaction.findUnique({
                where: { token: token }
            });

            if (!rampTxn) {
                throw new FinalStateError("Invalid token");
            }

            // b. Check status and type
            if (rampTxn.status !== "Processing") {
                throw new FinalStateError("Transaction already processed");
            }

            if (rampTxn.type !== "OnRamp") {
                throw new FinalStateError("Invalid transaction type for this endpoint");
            }

            if (rampTxn.userId !== userId) {
                throw new FinalStateError("User mismatch for token");
            }

            // c. Lock the balance row to prevent any concurrent race conditions
            await tx.$queryRaw`SELECT * FROM "balances" WHERE "userId" = ${userId}::uuid FOR UPDATE;`;

            // d. Update Balance (Increment)
            await tx.balance.update({
                where: { userId: userId },
                data: {
                    amount: { increment: parseInt(amount) }
                }
            });

            // e. Update RampTransaction status and set settledAt
            await tx.rampTransaction.update({
                where: { token: token },
                data: {
                    status: "Success",
                    settledAt: new Date()
                }
            });
        });

        return res.status(200).json({message: "Captured"});

    } catch (e: any) {
        console.error("Webhook processing error:", e.message);
        
        // Return 400 for logic errors (invalid token, already processed)
        // so the provider doesn't keep retrying if it's a final state.
        const status = (e.message === "Invalid token" || e.message === "Transaction already processed") 
            ? 400 
            : 500;

        return res.status(status).json({
            message: e.message || "Internal server error"
        });
    }
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Bank Webhook Handler listening on port ${PORT}`);
});