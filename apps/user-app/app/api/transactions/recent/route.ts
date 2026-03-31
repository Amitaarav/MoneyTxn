import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import  prisma  from "@repo/db/client";
import { Prisma } from "@prisma/client";

const UUID_REGEX      = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const VALID_STATUSES  = ["Processing", "Success", "Failure", "Reversed"] as const;
const MAX_PAGE_SIZE   = 100;
const DEFAULT_LIMIT   = 10;

type TxStatus = typeof VALID_STATUSES[number];

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId || !UUID_REGEX.test(userId)) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Account health check
        const user = await prisma.user.findUnique({
            where: {id: userId, deletedAt: null},
            select: { isLocked: true}

        });

        if(!user) return NextResponse.json({ message: "Unauthorized"}, { status: 401});

        if(user.isLocked) return NextResponse.json({ message: "Account is locked"}, { status: 403});

        const {searchParams} = new URL(request.url)
        const limit = Math.min(MAX_PAGE_SIZE, parseInt(searchParams.get("limit") || String(DEFAULT_LIMIT)));
        const cursor = searchParams.get("cursor") ?? undefined;

        const rawStatus = searchParams.get("status");
        const statusFilter = VALID_STATUSES.includes(rawStatus as TxStatus) ? rawStatus as TxStatus : undefined;

        const where: Prisma.P2PTransferWhereInput = {
            OR: [{ fromUserId: userId }, { toUserId: userId }],
            AND: [
                { fromUser: { deletedAt: null } },
                { toUser: { deletedAt: null } }
            ],
            ...(statusFilter && { status: statusFilter })
        };


            const [transfers, total] = await Promise.all([
            prisma.p2PTransfer.findMany({
                where,
                select: {
                id:          true,
                amount:      true,
                currency:    true,
                status:      true,
                note:        true,
                initiatedAt: true,
                settledAt:   true,
                fromUserId:  true,
                toUserId:    true,
                fromUser:    { select: { name: true, number: true } },
                toUser:      { select: { name: true, number: true } },
                },
                orderBy: { initiatedAt: "desc" },
                take: limit + 1,
                ...(cursor && { cursor: { id: cursor }, skip: 1 }),
            }),
                prisma.p2PTransfer.count({ where }),
            ]);
            const hasNextPage = transfers.length > limit;
            const data        = hasNextPage ? transfers.slice(0, -1) : transfers;
            const nextCursor  = hasNextPage ? data[data.length - 1]?.id : null;

            const sanitized = data.map((tx)=> {
                const isSender = tx.fromUserId === userId;
                return {
                    ...tx,
                    amountFormatted: `₹${(tx.amount / 100).toFixed(2)}`,
                    fromUser: isSender ? tx.fromUser : { name: tx.fromUser.name, number: "****" + tx.fromUser.number.slice(-4)},
                    toUser: isSender ? tx.toUser : { name: tx.toUser.name, number: "****" + tx.toUser.number.slice(-4)},
                }
            })
            return NextResponse.json({
                data: sanitized,
                meta: {total, limit, nextCursor, hasNextPage},
            },
            {
                headers: {"Cache-Control": "no-store, max-age=0"}
            }
            
            );
    } catch (error) {
        const correlationId = crypto.randomUUID();
        console.error(`[${correlationId}] Transaction fetch error`, error);

        if(error instanceof Prisma.PrismaClientInitializationError){
            return NextResponse.json(
                { message: "Database connection error", correlationId },
                { status: 503 }
            );
        }
        return NextResponse.json(
            { message: "Error fetching transactions", correlationId },
            { status: 500 }
        );
    }
} 