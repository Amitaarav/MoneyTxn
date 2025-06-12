"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending"
        }
    }
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }
    await prisma.$transaction(async (tx) => {
        // this transaction is atomic.. either all four things happen or neither
        // What if FE guy sends request multiple times ? whether the get handles in sequentially or parallelly ?
        // even the guy's account posses on
        // make sure only one databas request at a time
        // use queue and process them in order/ sequentially
        // locking at database level

        // prisma does not support locking at database level
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE;`;
        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) },
          });
          // check if sufficient amount is available in the balance
          if (!fromBalance || fromBalance.amount < amount) {
            // throw new Error('Insufficient funds');
            return {
                message: "Insufficient funds"
            }
          }

          // Decrease the balance of the first user
          await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
          });
          // increase the balance of the second user
          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
          });

          // create a transfer record
          await tx.p2PTransfer.create({
            data: {
              fromUserId: Number(from),
              toUserId: toUser.id,
              amount: amount,
              timestamp: new Date(),
            },
          })
    });
}