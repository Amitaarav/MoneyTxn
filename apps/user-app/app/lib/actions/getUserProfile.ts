"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function getUserProfile() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return null;
    }

    const user = await prisma.user.findFirst({
        where: {
            id: Number(session.user.id)
        },
        include: {
            Balance: true
        }
    });

    if (!user) return null;

    return {
        id: user.id,
        name: user.name || "User",
        email: user.email || "No email linked",
        number: user.number,
        balance: user.Balance[0]?.amount || 0,
        locked: user.Balance[0]?.locked || 0
    };
}
