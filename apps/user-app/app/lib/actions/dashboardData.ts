"use server"

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export interface Transaction {
    id: number;
    type: 'income' | 'expense';
    category: string;
    description: string;
    amount: number;
    date: Date;
    status: string;
    description_details?: string;
}

export async function getDashboardData() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    if (!userId) {
        return {
            balance: { amount: 0, locked: 0 },
            recentTransactions: [],
            spendingStats: []
        };
    }

    // Fetch Balance
    const balance = await prisma.balance.findFirst({
        where: { userId }
    });

    // Fetch OnRamp Transactions (Credits)
    const onRampTxns = await prisma.onRampTransaction.findMany({
        where: { userId },
        orderBy: { startTime: 'desc' },
        take: 5
    });

    // Fetch P2P Sent (Debits)
    const p2pSent = await prisma.p2PTransfer.findMany({
        where: { fromUserId: userId },
        include: { toUser: true },
        orderBy: { timestamp: 'desc' },
        take: 5
    });

    // Fetch P2P Received (Credits)
    const p2pReceived = await prisma.p2PTransfer.findMany({
        where: { toUserId: userId },
        include: { fromUser: true },
        orderBy: { timestamp: 'desc' },
        take: 5
    });

    // Combine and Sort Transactions
    const combinedTransactions: Transaction[] = [
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
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 5); // Take top 5 most recent overall

    // Calculate Basic Spending Stats (Mocked for now as we don't have categories in DB yet)
    // In a real app, we would aggregate p2pSent by some category or user defined tag.
    const spendingStats = [
        { category: 'Transfers', amount: p2pSent.reduce((acc, t) => acc + t.amount, 0), percentage: 100, color: 'bg-indigo-500' }
    ];

    return {
        balance: {
            amount: balance?.amount || 0,
            locked: balance?.locked || 0
        },
        recentTransactions: combinedTransactions,
        spendingStats
    };
}
