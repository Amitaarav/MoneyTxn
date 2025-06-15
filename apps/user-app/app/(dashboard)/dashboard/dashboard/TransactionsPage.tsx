'use client';

import { useState } from 'react';
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
  Filter, 
  Download, 
  Plus,
  Search,
  Calendar,
  Coffee, 
  ShoppingBag, 
  Car, 
  Home,
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';

const allTransactions = [
  {
    id: 1,
    type: 'expense',
    category: 'Food & Dining',
    description: 'Starbucks Coffee',
    amount: -8.50,
    date: '2025-01-15',
    status: 'completed',
    icon: Coffee,
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: 2,
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 4250.00,
    date: '2025-02-15',
    status: 'completed',
    icon: ArrowUpRight,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 3,
    type: 'expense',
    category: 'Shopping',
    description: 'Amazon Purchase',
    amount: -127.99,
    date: '2025-03-14',
    status: 'pending',
    icon: ShoppingBag,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 4,
    type: 'expense',
    category: 'Transportation',
    description: 'Gas Station',
    amount: -45.20,
    date: '2025-04-14',
    status: 'completed',
    icon: Car,
    color: 'bg-gray-100 text-gray-600'
  },
  {
    id: 5,
    type: 'expense',
    category: 'Bills',
    description: 'Electric Bill',
    amount: -89.30,
    date: '2025-05-13',
    status: 'completed',
    icon: Home,
    color: 'bg-yellow-100 text-yellow-600'
  }
];

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6 ">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-4xl font-bold text-gray-900">Transaction History</h2>
          <p className="text-gray-600 text-2xl">Manage and track all your transactions</p>
        </div>
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-1">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="text-white bg-[#6a51a6] hover:bg-[#5a4496]">
            <Plus className="text-white w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="">
              <Search className="left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-black"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
                <SelectItem value="Transportation">Transportation</SelectItem>
                <SelectItem value="Bills">Bills</SelectItem>
                <SelectItem value="Salary">Salary</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Transactions</CardTitle>
            <span className="text-sm text-gray-500">
              {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => {
              const Icon = transaction.icon;
              return (
                <div 
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-white transition-colors duration-150"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full ${transaction.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-xl">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.category} • {transaction.date}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge 
                      className={`px-2 py-1 text-xs font-medium rounded-lg ${transaction.status === 'completed' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}
                      variant={transaction.status === 'completed' ? `default` : 'secondary'}
                    >
                      {transaction.status}
                    </Badge>
                    
                    <div className="text-right text-2xl">
                      <p className={`font-semibold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.type}
                      </p>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No transactions found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}