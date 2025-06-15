import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) {
            console.error("User ID not found in session");
            return { amount: 0, locked: 0 };
        }

        const balance = await prisma.balance.findFirst({
            where: {
                userId: Number(userId),
            },
        });

        return {
            amount: balance?.amount || 0,
            locked: balance?.locked || 0,
        };
    } catch (error) {
        console.error("Error fetching balance:", error);
        return { amount: 0, locked: 0 };
    }
}

async function getOnRampTransactions() {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) {
            console.error("User ID not found in session");
            return [];
        }

        const txns = await prisma.onRampTransaction.findMany({
            where: {
                userId: Number(userId),
            },
        });

        return txns.map((t) => ({
            time: new Date(t.startTime),
            amount: t.amount,
            status: t.status,
            provider: t.provider,
        }));
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
    }
}

export default async function Dashboard() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 px-4 sm:px-6 lg:px-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#6a51a6] pt-8 mb-6 sm:mb-10">
                Transfer
            </h1>

            <div className="flex flex-wrap gap-8">
                {/* Left Column */}
                <div className="space-y-4">
                    <AddMoney />
                </div>

                {/* Right Column */}
                <div className="space-y-4 w-auto">
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    );
}
