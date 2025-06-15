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

export default function DashboardContent() {
  const stats = [
    {
      title: 'Total Balance',
      value: '₹12,847.50',
      change: '+12.5%',
      trend: 'up',
      icon: IndianRupee,
      color: 'text-green-600'
    },
    {
      title: 'This Month Income',
      value: '₹4,250.00',
      change: '+8.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      title: 'This Month Expenses',
      value: '₹2,890.30',
      change: '-3.1%',
      trend: 'down',
      icon: TrendingDown,
      color: 'text-red-600'
    },
    {
      title: 'Active Cards',
      value: '3',
      change: 'No change',
      trend: 'neutral',
      icon: CreditCard,
      color: 'text-purple-600'
    }
  ];
  const username = "Amit" as string;
  return (
    <div className="space-y-4">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#6a51a6] to-[#8b5cf6] rounded-xl p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome back, {username}!</h2>
        <p className="text-purple-100 mb-4">
          Here's your financial overview for today
        </p>
        <Button className="bg-white text-[#6a51a6] hover:bg-gray-100">
          <Plus className="w-4 h-4 mr-2" />
          Add Transaction
        </Button>
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
                  {stat.trend === 'up' && (
                    <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  )}
                  {stat.trend === 'down' && (
                    <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={
                    stat.trend === 'up' ? 'text-green-600' :
                    stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                  }>
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
        <div className="lg:col-span-2">
          <SpendingChart />
        </div>
        
        {/* Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Recent Transactions */}
      <RecentTransactions />
    </div>
  );
}