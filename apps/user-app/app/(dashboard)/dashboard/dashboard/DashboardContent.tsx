'use client';

import {
  IndianRupee,
  CreditCard,
  Plus,
  ArrowUpRight,
  Send,
  History,
} from 'lucide-react';
import RecentTransactions from './RecentTransactions';
import SpendingChart from './SpendingChart';
import QuickActions from './QuickActions';

interface DashboardContentProps {
  balance: { amount: number; locked: number };
  recentTransactions: any[];
  spendingStats: any[];
}

export default function DashboardContent({
  balance,
  recentTransactions,
  spendingStats,
}: DashboardContentProps) {
  const available = (balance.amount / 100).toFixed(2);
  const locked = (balance.locked / 100).toFixed(2);
  const total = ((balance.amount + balance.locked) / 100).toFixed(2);

  const stats = [
    {
      title: 'Available Balance',
      value: `₹${available}`,
      sub: 'Ready to use',
      icon: IndianRupee,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Locked Balance',
      value: `₹${locked}`,
      sub: 'Pending clearance',
      icon: CreditCard,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Total Portfolio',
      value: `₹${total}`,
      sub: 'All accounts',
      icon: ArrowUpRight,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
  ];

  return (
    <div className="flex flex-col gap-6">

      {/* ── Welcome banner ── */}
      <div className="relative overflow-hidden bg-gray-950 rounded-2xl p-8 border border-white/[0.06]">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-blue-400 mb-3">
              Dashboard
            </p>
            <h2
              className="font-normal text-white leading-[1.06] tracking-tight mb-2"
              style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(26px, 3.5vw, 38px)" }}
            >
              Welcome <em className="italic text-blue-400">back.</em>
            </h2>
            <p className="text-[14px] text-gray-500 font-light max-w-sm">
              Track your balance, send money, and manage transfers — all in one place.
            </p>
          </div>

          {/* Quick action buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white text-[13.5px] font-medium tracking-tight px-4 py-2.5 rounded-xl transition-all duration-150">
              <Send size={14} />
              Send
            </button>
            <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-[13.5px] font-medium tracking-tight px-4 py-2.5 rounded-xl transition-all duration-150 hover:shadow-[0_4px_16px_rgba(37,99,235,0.3)]">
              <Plus size={14} />
              Add Money
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
        {stats.map(({ title, value, sub, icon: Icon, iconBg, iconColor }) => (
          <div key={title} className="bg-white px-6 py-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray-400">
                {title}
              </p>
              <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}>
                <Icon size={15} className={iconColor} />
              </div>
            </div>
            <div>
              <div
                className="text-[28px] font-normal text-gray-950 leading-none tracking-tight mb-1"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {value}
              </div>
              <p className="text-[12.5px] text-gray-400">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Chart + Transactions */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <div className="px-6 pt-6 pb-2 border-b border-gray-100">
              <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray-400 mb-1">
                Spending overview
              </p>
              <h3 className="text-[15px] font-medium text-gray-900 tracking-tight">
                Monthly activity
              </h3>
            </div>
            <div className="p-4">
              <SpendingChart stats={spendingStats} />
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <div className="px-6 pt-6 pb-2 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray-400 mb-1">
                  History
                </p>
                <h3 className="text-[15px] font-medium text-gray-900 tracking-tight">
                  Recent transactions
                </h3>
              </div>
              <button className="inline-flex items-center gap-1.5 text-[12.5px] text-blue-600 hover:text-blue-700 font-medium transition-colors">
                <History size={12} />
                View all
              </button>
            </div>
            <RecentTransactions transactions={recentTransactions} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white h-full">
            <div className="px-6 pt-6 pb-2 border-b border-gray-100">
              <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray-400 mb-1">
                Actions
              </p>
              <h3 className="text-[15px] font-medium text-gray-900 tracking-tight">
                Quick actions
              </h3>
            </div>
            <div className="p-4">
              <QuickActions />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}