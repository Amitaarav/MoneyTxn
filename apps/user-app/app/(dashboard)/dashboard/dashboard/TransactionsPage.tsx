'use client';

import { useState, useMemo } from 'react';
import {
  Download, Plus, Search, Calendar,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, SlidersHorizontal,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  date: Date;
  status: string;
}

interface TransactionsPageProps {
  transactions: Transaction[];
}

const selectClass =
  'h-10 pl-3 pr-8 text-[13px] text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-150 appearance-none cursor-pointer';

export default function TransactionsPage({ transactions = [] }: TransactionsPageProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [dateRange, setDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all');

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || t.type === filterType;
      const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
      const tDate = new Date(t.date);
      const now = new Date();
      let matchesDate = true;
      if (dateRange === 'today') {
        matchesDate = tDate.toDateString() === now.toDateString();
      } else if (dateRange === 'week') {
        const d = new Date(); d.setDate(now.getDate() - 7);
        matchesDate = tDate >= d;
      } else if (dateRange === 'month') {
        const d = new Date(); d.setMonth(now.getMonth() - 1);
        matchesDate = tDate >= d;
      }
      return matchesSearch && matchesType && matchesCategory && matchesDate;
    });
  }, [transactions, searchTerm, filterType, filterCategory, dateRange]);

  const exportToCSV = () => {
    const headers = ['ID', 'Type', 'Category', 'Description', 'Amount', 'Date', 'Status'];
    const rows = filteredTransactions.map((t) => [
      t.id, t.type, t.category, t.description,
      (t.amount / 100).toFixed(2), new Date(t.date).toLocaleString(), t.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearFilters = () => {
    setSearchTerm(''); setFilterType('all');
    setFilterCategory('all'); setDateRange('all');
  };

  return (
    <div className="max-w-[1080px] mx-auto px-6 py-8 flex flex-col gap-6">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-blue-600 mb-2">
            History
          </p>
          <h1
            className="text-[28px] font-normal text-gray-950 tracking-tight leading-tight mb-1"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Transaction <em className="italic text-blue-600">history.</em>
          </h1>
          <p className="text-[14px] text-gray-400 font-light">
            Track and manage all your financial movements.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 h-10 px-4 text-[13px] font-medium text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-400 rounded-xl transition-all duration-150"
          >
            <Download size={14} />
            Export
          </button>
          <button
            onClick={() => router.push('/transfer')}
            className="inline-flex items-center gap-2 h-10 px-4 text-[13px] font-medium text-white bg-gray-950 hover:bg-blue-600 rounded-xl transition-all duration-200 hover:shadow-[0_4px_16px_rgba(37,99,235,0.25)]"
          >
            <Plus size={14} />
            Add Money
          </button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="border border-gray-200 rounded-2xl bg-white p-4">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search transactions…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-9 pr-4 text-[13px] text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white placeholder:text-gray-400 transition-all duration-150"
            />
          </div>

          {/* Type */}
          <div className="relative">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className={selectClass}>
              <option value="all">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <SlidersHorizontal size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Category */}
          <div className="relative">
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className={selectClass}>
              <option value="all">All categories</option>
              <option value="Wallet Load">Wallet Load</option>
              <option value="Transfer">P2P Transfer</option>
            </select>
            <SlidersHorizontal size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Date */}
          <div className="relative">
            <Calendar size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as typeof dateRange)}
              className={`${selectClass} pl-8`}
            >
              <option value="all">All time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
            </select>
            <SlidersHorizontal size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── Transaction list ── */}
      <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">

        {/* List header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-0.5">
              Ledger
            </p>
            <h3
              className="text-[15px] font-medium text-gray-950 tracking-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              All transactions
            </h3>
          </div>
          <span className="inline-flex items-center bg-gray-100 border border-gray-200 text-gray-500 text-[12px] font-medium rounded-full px-3 py-1">
            {filteredTransactions.length} result{filteredTransactions.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-100">
          {filteredTransactions.map((t) => {
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
                {/* Left: icon + info */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isIncome ? 'bg-emerald-50 border border-emerald-100' : 'bg-gray-100 border border-gray-200'
                  }`}>
                    <Icon size={16} className={isIncome ? 'text-emerald-600' : 'text-gray-500'} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-gray-900 tracking-tight truncate">
                      {t.description}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[12px] text-gray-400">{t.category}</span>
                      <span className="text-gray-300 text-[10px]">·</span>
                      <span className="text-[12px] text-gray-400">
                        {new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: status + amount + menu */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className={`hidden sm:inline-flex text-[11px] font-medium tracking-[0.04em] border rounded-full px-2.5 py-1 ${statusStyle}`}>
                    {t.status}
                  </span>

                  <div className="text-right min-w-[96px]">
                    <p className={`text-[15px] font-medium tracking-tight ${isIncome ? 'text-emerald-600' : 'text-gray-900'}`}>
                      {isIncome ? '+' : '−'}₹{(t.amount / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-[11px] text-gray-400 font-light capitalize mt-0.5">{t.type}</p>
                  </div>

                  <button className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-150">
                    <MoreHorizontal size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredTransactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center px-6">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <Search size={18} className="text-gray-400" />
            </div>
            <h3
              className="text-[17px] font-normal text-gray-950 tracking-tight mb-2"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              No transactions found
            </h3>
            <p className="text-[13.5px] text-gray-400 font-light max-w-[240px] leading-relaxed mb-5">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
              className="text-[13px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}