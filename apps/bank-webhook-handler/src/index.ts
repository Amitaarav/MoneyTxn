
import express from 'express'
import db from "@repo/db/client"
import z from 'zod'
const app = express()

app.use(express.json())

const bankWebhookSchema = z.object({
    token: z.string(),
    user_identifier: z.string(),
    amount: z.string()
})

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "bank_server_secret";

app.post("/bankwebhook", async (req: any, res: any) => {
    // Basic Security Check
    const secret = req.headers["x-webhook-secret"];
    if (secret !== WEBHOOK_SECRET) {
        return res.status(403).json({
            message: "Unauthorized"
        })
    }

    // validation
    const { success, data: paymentInformation } = bankWebhookSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Invalid request format"
        })
    }

    try {
        const transactionStatus = await db.onRampTransaction.findFirst({
            where: {
                token: paymentInformation.token
            }
        })

        if (!transactionStatus) {
            return res.status(400).json({
                message: "Invalid token"
            })
        }

        if (transactionStatus.status !== "Processing") {
            return res.status(400).json({
                message: "Transaction already processed"
            })
        }

        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.user_identifier)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch (e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3002, () => {
    console.log("Listening on port 3002");
})