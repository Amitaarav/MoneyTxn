'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Download,
  Plus,
  Search,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
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

export default function TransactionsPage({ transactions = [] }: TransactionsPageProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [dateRange, setDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || transaction.type === filterType;
      const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;

      // Date range filter
      const tDate = new Date(transaction.date);
      const now = new Date();
      let matchesDate = true;
      if (dateRange === 'today') {
        matchesDate = tDate.toDateString() === now.toDateString();
      } else if (dateRange === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        matchesDate = tDate >= weekAgo;
      } else if (dateRange === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        matchesDate = tDate >= monthAgo;
      }

      return matchesSearch && matchesType && matchesCategory && matchesDate;
    });
  }, [transactions, searchTerm, filterType, filterCategory, dateRange]);

  const exportToCSV = () => {
    const headers = ['ID', 'Type', 'Category', 'Description', 'Amount', 'Date', 'Status'];
    const csvData = filteredTransactions.map(t => [
      t.id,
      t.type,
      t.category,
      t.description,
      (t.amount / 100).toFixed(2),
      new Date(t.date).toLocaleString(),
      t.status
    ]);

    const csvContent = [headers, ...csvData].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Transaction History</h2>
          <p className="text-gray-500 text-lg">Manage and track your financial movements</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={exportToCSV} className="flex-1 sm:flex-none">
            <Download className="w-4 h-4 mr-2 text-slate-500" />
            Export
          </Button>
          <Button
            onClick={() => router.push('/transfer')}
            className="text-white bg-[#6a51a6] hover:bg-[#5a4496] flex-1 sm:flex-none shadow-md shadow-purple-100"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Money
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-none shadow-sm bg-white">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 border-slate-200 focus:ring-[#6a51a6] focus:border-[#6a51a6] text-black"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="h-11 border-slate-200">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="h-11 border-slate-200">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Wallet Load">Wallet Load</SelectItem>
                <SelectItem value="Transfer">P2P Transfer</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={(val: any) => setDateRange(val)}>
              <SelectTrigger className="h-11 border-slate-200">
                <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <CardHeader className="border-b border-slate-50 bg-slate-50/30">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold text-slate-800">All Transactions</CardTitle>
            <Badge variant="secondary" className="bg-white border-slate-200 text-slate-600 font-medium">
              {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {filteredTransactions.map((transaction) => {
              const isIncome = transaction.type === 'income';
              const Icon = isIncome ? ArrowUpRight : ArrowDownRight;
              const colorClasses = isIncome
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                : 'bg-rose-50 text-rose-600 border-rose-100';

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition-all duration-150 group"
                >
                  <div className="flex items-center space-x-5">
                    <div className={`w-12 h-12 rounded-2xl border ${colorClasses} flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-lg line-clamp-1">
                        {transaction.description}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-medium text-slate-500">{transaction.category}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-sm text-slate-400">{new Date(transaction.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="hidden sm:block">
                      <Badge
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${transaction.status === 'Success'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : transaction.status === 'Processing'
                            ? 'bg-amber-100 text-amber-800 border-amber-200'
                            : 'bg-slate-100 text-slate-800 border-slate-200'
                          }`}
                        variant="outline"
                      >
                        {transaction.status}
                      </Badge>
                    </div>

                    <div className="text-right min-w-[100px]">
                      <p className={`text-xl font-bold ${isIncome ? 'text-emerald-600' : 'text-slate-900'
                        }`}>
                        {isIncome ? '+' : '-'}₹{(transaction.amount / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-0.5">
                        {transaction.type}
                      </p>
                    </div>

                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-[#6a51a6] hover:bg-purple-50">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-slate-50 p-6 rounded-full mb-4">
                <Search className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No transactions found</h3>
              <p className="text-slate-500 max-w-[250px] mt-1">Try adjusting your filters or search terms to find what you're looking for.</p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                  setFilterCategory('all');
                  setDateRange('all');
                }}
                className="text-[#6a51a6] mt-4 font-bold"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}