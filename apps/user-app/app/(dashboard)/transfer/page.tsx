import { TransferActions } from "../../../components/TransferActions";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { ArrowLeftRight } from "lucide-react";
import prisma from "@repo/db/client";

async function getBalance() {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) return { amount: 0, locked: 0 };

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
        return { amount: 0, locked: 0 };
    }
}

async function getOnRampTransactions() {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) return [];

        const txns = await prisma.onRampTransaction.findMany({
            where: {
                userId: Number(userId),
            },
            orderBy: {
                startTime: 'desc'
            },
            take: 10
        });

        return txns.map((t) => ({
            time: new Date(t.startTime),
            amount: t.amount,
            status: t.status,
            provider: t.provider,
        }));
    } catch (error) {
        return [];
    }
}

export default async function TransferPage() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-[#6a51a6] tracking-tight flex items-center gap-3">
                        <ArrowLeftRight className="w-8 h-8" />
                        Move Funds
                    </h1>
                    <p className="text-slate-500 text-lg font-medium mt-1">Manage your wallet balance and external bank transfers</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Side - Actions and History */}
                <div className="lg:col-span-8 space-y-8">
                    <section>
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">Quick Actions</h3>
                        <TransferActions />
                    </section>

                    <section>
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">Recent Activity</h3>
                        <OnRampTransactions transactions={transactions} />
                    </section>
                </div>

                {/* Right Side - Balance Summary */}
                <div className="lg:col-span-4 sticky top-24 space-y-8">
                    <section>
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">Wallet Card</h3>
                        <BalanceCard amount={balance.amount} locked={balance.locked} />
                    </section>

                    {/* Secondary info card */}
                    <div className="bg-[#6a51a6]/5 border border-[#6a51a6]/10 rounded-2xl p-6">
                        <h4 className="text-[#6a51a6] font-bold text-sm mb-2 flex items-center gap-2">
                            <ArrowLeftRight className="w-4 h-4" />
                            Transfer limits
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                            Your current daily transfer limit is <span className="text-[#6a51a6] font-bold">₹1,00,000</span>.
                            Complete full KYC to increase your limits.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
