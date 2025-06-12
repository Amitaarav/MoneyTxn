"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function transferToMerchant(merchantId: string, amount: number) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return {
            message: "User not authenticated"
        };
    }

    try {
        const response = await fetch(`${process.env.MERCHANT_BACKEND_URL}/user/transfer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.token}` // Make sure your session includes the token
            },
            body: JSON.stringify({
                merchantId,
                amount
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                message: data.message || "Transfer failed"
            };
        }

        return {
            message: "Transfer successful",
            data
        };
    } catch (error) {
        console.error("Transfer error:", error);
        return {
            message: "Transfer failed. Please try again."
        };
    }
} 