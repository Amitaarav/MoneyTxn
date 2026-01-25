"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client"

export async function createOffRampTransaction(amount: number, provider: string) {
    const session = await getServerSession(authOptions);

    if (!session?.user || !session.user?.id) {
        return {
            message: "User not authenticated",
        }
    }

    const userId = session.user.id;

    // Simulate a token/identifier from the bank
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    try {
        await prisma.$transaction(async (tx) => {
            // 1. Check Balance
            const balance = await tx.balance.findUnique({
                where: { userId: Number(userId) }
            });

            if (!balance || balance.amount < amount * 100) {
                throw new Error("Insufficient funds");
            }

            // 2. Lock funds (optional, depending on business logic - here we decrement immediately or hold?)
            // Simple version: Decrement now, if webhook fails we refund? Or just mark as Processing and hold?
            // Let's go with: Mark as processing, don't decrement yet OR decrement and hold in locked state.
            // Given the schema had a "locked" field in Balance, let's use it.

            // Decrement amount, Increment locked
            await tx.balance.update({
                where: { userId: Number(userId) },
                data: {
                    amount: { decrement: amount * 100 },
                    locked: { increment: amount * 100 }
                }
            });

            // 3. Create Transaction Record
            await tx.offRampTransaction.create({
                data: {
                    userId: Number(userId),
                    amount: amount * 100,
                    provider: provider,
                    status: "Processing",
                    startTime: new Date(),
                    token: token
                }
            });
        });

        return {
            message: "Withdrawal initiated"
        }

    } catch (e: any) {
        return {
            message: e.message || "Error processing withdrawal"
        }
    }
}
