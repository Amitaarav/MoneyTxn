"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client"

import { onRampSchema } from "../schemas";

export async function createOnRampTransaction(amount: number, provider: string) {

    // never take user id from the client side
    // always get it from the session
    // to avoid user spoofing

    const session = await getServerSession(authOptions);

    if (!session?.user || !session.user?.id) {
        return {
            message: "User not authenticated",
        }
    }

    const { success } = onRampSchema.safeParse({ amount, provider });
    if (!success) {
        return {
            message: "Invalid input"
        }
    }

    // instead of token coming from the bank server
    // dummy token since we are simulating bank webhook. Do not have banking api

    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // get user id from session
    const userId = session.user.id

    // puts entry in the database
    await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            amount: amount * 100,
            provider: provider,
            status: "Processing",
            startTime: new Date(),
            token: token
        },
    })


    return {
        message: "On ramp transaction added",
        token: token,
        userId: userId.toString()
    }
}