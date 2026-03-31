'use client';

import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  date: Date;
  status: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center px-6">
        <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
          <ArrowUpRight size={16} className="text-gray-400" />
        </div>
        <p
          className="text-[15px] font-normal text-gray-950 tracking-tight mb-1"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          No transactions yet
        </p>
        <p className="text-[12.5px] text-gray-400 font-light">Your recent activity will appear here.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {transactions.map((t) => {
        const isIncome = t.type === 'income';
        const Icon = isIncome ? ArrowUpRight : ArrowDownRight;

        const statusStyle =
          t.status === 'Success'
            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
            : t.status === 'Processing'
            ? 'bg-amber-50 text-amber-700 border-amber-100'
            : 'bg-gray-100 text-gray-500 border-gray-200';

        return (
          <div
            key={t.id}
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/60 transition-colors duration-150 group"
          >
            {/* Left: icon + meta */}
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isIncome
                  ? 'bg-emerald-50 border border-emerald-100'
                  : 'bg-gray-100 border border-gray-200'
              }`}>
                <Icon size={15} className={isIncome ? 'text-emerald-600' : 'text-gray-500'} />
              </div>

              <div className="min-w-0">
                <p className="text-[13.5px] font-medium text-gray-900 tracking-tight truncate">
                  {t.description}
                </p>
                <p className="text-[12px] text-gray-400 font-light mt-0.5">
                  {t.category}
                  <span className="mx-1.5 text-gray-300">·</span>
                  {new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Right: amount + status + menu */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className={`hidden sm:inline-flex text-[11px] font-medium tracking-[0.04em] border rounded-full px-2.5 py-1 ${statusStyle}`}>
                {t.status}
              </span>

              <div className="text-right min-w-[80px]">
                <p className={`text-[14px] font-medium tracking-tight ${isIncome ? 'text-emerald-600' : 'text-gray-900'}`}>
                  {isIncome ? '+' : '−'}₹{Math.abs(t.amount / 100).toFixed(2)}
                </p>
                <p className="text-[11px] text-gray-400 font-light capitalize">{t.type}</p>
              </div>

              <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-150">
                <MoreHorizontal size={13} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}