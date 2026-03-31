"use server"

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function getP2PTransfers() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    if (!userId) {
        return [];
    }

    const txns = await prisma.p2PTransfer.findMany({
        where: {
            OR: [
                { fromUserId: userId },
                { toUserId: userId }
            ]
        },
        include: {
            fromUser: true,
            toUser: true
        },
        orderBy: {
            timestamp: 'desc'
        },
        take: 10
    });

    return txns.map(t => ({
        id: t.id,
        amount: t.amount,
        timestamp: t.timestamp,
        type: t.fromUserId === userId ? 'sent' : 'received',
        otherUser: t.fromUserId === userId ? (t.toUser.name || t.toUser.number) : (t.fromUser.name || t.fromUser.number)
    }));
}
