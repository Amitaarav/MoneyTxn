import { TransferActions } from "../../../components/TransferActions";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import prisma from "@repo/db/client";

async function getBalance() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) return { amount: 0, locked: 0 };
    const balance = await prisma.balance.findFirst({ where: { userId: Number(userId) } });
    return { amount: balance?.amount || 0, locked: balance?.locked || 0 };
  } catch {
    return { amount: 0, locked: 0 };
  }
}

async function getOnRampTransactions() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) return [];
    const txns = await prisma.onRampTransaction.findMany({
      where: { userId: Number(userId) },
      orderBy: { startTime: 'desc' },
      take: 10,
    });
    return txns.map((t) => ({
      time: new Date(t.startTime),
      amount: t.amount,
      status: t.status,
      provider: t.provider,
    }));
  } catch {
    return [];
  }
}

export default async function TransferPage() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="max-w-[1080px] mx-auto px-6 py-8 flex flex-col gap-6">

      {/* ── Page header ── */}
      <div>
        <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-blue-600 mb-2">
          Wallet
        </p>
        <h1
          className="text-[28px] font-normal text-gray-950 tracking-tight leading-tight mb-1"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Move <em className="italic text-blue-600">funds.</em>
        </h1>
        <p className="text-[14px] text-gray-400 font-light">
          Manage your wallet balance and external bank transfers.
        </p>
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left: actions + history */}
        <div className="lg:col-span-8 flex flex-col gap-5">

          <div>
            <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-3">
              Quick actions
            </p>
            <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
              <TransferActions />
            </div>
          </div>

          <div>
            <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-3">
              Recent activity
            </p>
            <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
              <OnRampTransactions transactions={transactions} />
            </div>
          </div>

        </div>

        {/* Right: balance + limits */}
        <div className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-24">

          <div>
            <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-3">
              Wallet
            </p>
            <BalanceCard amount={balance.amount} locked={balance.locked} />
          </div>

          {/* Transfer limits card */}
          <div className="border border-gray-200 rounded-2xl bg-white p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                <ArrowUpRight size={13} className="text-blue-600" />
              </div>
              <p className="text-[13px] font-medium text-gray-900 tracking-tight">Transfer limits</p>
            </div>

            <div className="flex flex-col gap-2.5 mb-4">
              {[
                { label: "Daily limit", value: "₹1,00,000" },
                { label: "Per transaction", value: "₹50,000" },
                { label: "Monthly limit", value: "₹10,00,000" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-[12.5px] text-gray-400 font-light">{label}</span>
                  <span className="text-[13px] font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>

            {/* KYC prompt */}
            <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-3.5 py-3">
              <ShieldCheck size={13} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-[12px] text-blue-700 font-light leading-relaxed">
                Complete <span className="font-medium">full KYC</span> to unlock higher transfer limits.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}