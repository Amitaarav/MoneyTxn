'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  ArrowUpRight,
  ArrowDownRight,
  Coffee,
  ShoppingBag,
  Car,
  Home,
  MoreHorizontal
} from 'lucide-react';

interface RecentTransactionsProps {
  transactions: {
    id: number;
    type: 'income' | 'expense';
    category: string;
    description: string;
    amount: number;
    date: Date;
    status: string;
  }[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No recent transactions
            </div>
          ) : (
            transactions.map((transaction) => {
              // const Icon = transaction.icon; // We don't have icon in DB yet
              const isIncome = transaction.type === 'income';
              const Icon = isIncome ? ArrowUpRight : ArrowDownRight;
              const color = isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xl  text-gray-700">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`font-semibold text-2xl ${isIncome ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {isIncome ? '+' : '-'}₹{Math.abs(transaction.amount / 100).toFixed(2)}
                    </span>
                    <Badge variant={isIncome ? 'default' : 'secondary'}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}