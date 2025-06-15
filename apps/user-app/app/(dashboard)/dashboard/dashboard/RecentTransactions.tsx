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

const transactions = [
  {
    id: 1,
    type: 'expense',
    category: 'Food & Dining',
    description: 'Starbucks Coffee',
    amount: -8.50,
    date: '2024-01-15',
    icon: Coffee,
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: 2,
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 4250.00,
    date: '2024-01-15',
    icon: ArrowUpRight,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 3,
    type: 'expense',
    category: 'Shopping',
    description: 'Amazon Purchase',
    amount: -127.99,
    date: '2024-01-14',
    icon: ShoppingBag,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 4,
    type: 'expense',
    category: 'Transportation',
    description: 'Gas Station',
    amount: -45.20,
    date: '2024-01-14',
    icon: Car,
    color: 'bg-gray-100 text-gray-600'
  },
  {
    id: 5,
    type: 'expense',
    category: 'Bills',
    description: 'Electric Bill',
    amount: -89.30,
    date: '2024-01-13',
    icon: Home,
    color: 'bg-yellow-100 text-yellow-600'
  }
];

export default function RecentTransactions() {
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
          {transactions.map((transaction) => {
            const Icon = transaction.icon;
            return (
              <div 
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full ${transaction.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xl  text-gray-700">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transaction.category} • {transaction.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`font-semibold text-2xl ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toFixed(2)}
                  </span>
                  <Badge variant={transaction.type === 'income' ? 'default' : 'secondary'}>
                    {transaction.type}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}