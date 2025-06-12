import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import prisma from "@repo/db/client";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const transactions = await prisma.p2PTransfer.findMany({
            where: {
                OR: [
                    { fromUserId: Number(userId) },
                    { toUserId: Number(userId) }
                ]
            },
            include: {
                fromUser: {
                    select: {
                        name: true,
                        number: true
                    }
                },
                toUser: {
                    select: {
                        name: true,
                        number: true
                    }
                }
            },
            orderBy: {
                timestamp: 'desc'
            },
            take: 5
        });

        return NextResponse.json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return NextResponse.json(
            { message: "Error fetching transactions" },
            { status: 500 }
        );
    }
} 