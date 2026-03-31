"use server"

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export interface TransactionType {
    id: number;
    type: 'income' | 'expense';
    category: string;
    description: string;
    amount: number;
    date: Date;
    status: string;
}

export async function getTransactions() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    if (!userId) {
        return [];
    }

    // Fetch OnRamp Transactions (Credits)
    const onRampTxns = await prisma.onRampTransaction.findMany({
        where: { userId },
        orderBy: { startTime: 'desc' },
        take: 50
    });

    // Fetch P2P Sent (Debits)
    const p2pSent = await prisma.p2PTransfer.findMany({
        where: { fromUserId: userId },
        include: { toUser: true },
        orderBy: { timestamp: 'desc' },
        take: 50
    });

    // Fetch P2P Received (Credits)
    const p2pReceived = await prisma.p2PTransfer.findMany({
        where: { toUserId: userId },
        include: { fromUser: true },
        orderBy: { timestamp: 'desc' },
        take: 50
    });

    // Combine and Sort Transactions
    const combinedTransactions: TransactionType[] = [
        ...onRampTxns.map(t => ({
            id: t.id,
            type: 'income' as const,
            category: 'Wallet Load',
            description: `Added via ${t.provider}`,
            amount: t.amount,
            date: t.startTime,
            status: t.status
        })),
        ...p2pSent.map(t => ({
            id: t.id,
            type: 'expense' as const,
            category: 'Transfer',
            description: `Sent to ${t.toUser.name || t.toUser.number}`,
            amount: t.amount,
            date: t.timestamp,
            status: 'Success'
        })),
        ...p2pReceived.map(t => ({
            id: t.id,
            type: 'income' as const,
            category: 'Transfer',
            description: `Received from ${t.fromUser.name || t.fromUser.number}`,
            amount: t.amount,
            date: t.timestamp,
            status: 'Success'
        }))
    ]
        .sort((a, b) => b.date.getTime() - a.date.getTime());

    return combinedTransactions;
}
