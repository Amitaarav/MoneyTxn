'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from 'lucide-react';
import { Button } from '../ui/button';
import RecentTransactions from './RecentTransactions';
import SpendingChart from './SpendingChart';
import QuickActions from './QuickActions';

interface DashboardContentProps {
  balance: { amount: number; locked: number };
  recentTransactions: any[];
  spendingStats: any[];
}

export default function DashboardContent({ balance, recentTransactions, spendingStats }: DashboardContentProps) {
  const stats = [
    {
      title: 'Total Balance',
      value: `₹${(balance.amount / 100).toFixed(2)}`,
      change: 'Available',
      trend: 'up',
      icon: IndianRupee,
      color: 'text-green-600'
    },
    {
      title: 'Locked Balance',
      value: `₹${(balance.locked / 100).toFixed(2)}`,
      change: 'Pending',
      trend: 'neutral',
      icon: CreditCard,
      color: 'text-purple-600'
    },
    // We can add more real stats here later
  ];

  return (
    <div className="space-y-4">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#6a51a6] via-[#7c3aed] to-[#4f46e5] rounded-2xl p-8 text-white shadow-xl">
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold mb-3 tracking-tight">Welcome back!</h2>
          <p className="text-purple-100 text-lg mb-6 max-w-md opacity-90">
            Manage your wealth, track expenses and send money instantly anywhere in the world.
          </p>
          <div className="flex gap-4">
            <Button className="bg-white text-[#6a51a6] hover:bg-white/90 font-bold px-6 py-2 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md">
              <Plus className="w-5 h-5 mr-2" />
              Add Money
            </Button>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400/20 rounded-full -ml-10 -mb-10 blur-2xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-500">
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Chart */}
        <div className="lg:col-span-2 space-y-2">
          <SpendingChart stats={spendingStats} />
          {/* Recent Transactions */}
          <RecentTransactions transactions={recentTransactions} />
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>

    </div>
  );
}