"use server"

export async function processMockWebhook(token: string, userId: string, amount: string) {
    try {
        const response = await fetch("http://localhost:3002/bankwebhook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-webhook-secret": process.env.WEBHOOK_SECRET || "bank_server_secret"
            },
            body: JSON.stringify({
                token,
                user_identifier: userId,
                amount
            })
        });

        if (!response.ok) {
            return {
                message: "Webhook failed"
            }
        }

        const data = await response.json();
        return {
            message: "Captured",
            data
        }
    } catch (e) {
        return {
            message: "Error connecting to webhook server"
        }
    }
}
