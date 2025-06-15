'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  CreditCard,
  PiggyBank,
  Target
} from 'lucide-react';

const actions = [
  {
    title: 'Add Income',
    description: 'Record new income',
    icon: ArrowUpRight,
    color: 'bg-green-100 text-green-600 hover:bg-green-200',
    buttonColor: 'bg-green-600 hover:bg-green-700'
  },
  {
    title: 'Add Expense',
    description: 'Record new expense',
    icon: ArrowDownRight,
    color: 'bg-red-100 text-red-600 hover:bg-red-200',
    buttonColor: 'bg-red-600 hover:bg-red-700'
  },
  {
    title: 'Transfer Money',
    description: 'Between accounts',
    icon: CreditCard,
    color: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
    buttonColor: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    title: 'Set Budget',
    description: 'Create spending limit',
    icon: Target,
    color: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
    buttonColor: 'bg-purple-600 hover:bg-purple-700'
  }
];

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <p className="text-sm text-gray-600">Frequently used features</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                className="w-full h-auto p-4 flex items-center justify-start space-x-3 hover:bg-gray-50"
              >
                <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{action.title}</p>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </Button>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-[#6a51a6] to-[#8b5cf6] rounded-lg text-white">
          <div className="flex items-center mb-2">
            <PiggyBank className="w-5 h-5 mr-2" />
            <span className="font-semibold">Savings Goal</span>
          </div>
          <p className="text-sm opacity-90 mb-3">Emergency Fund</p>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mb-2">
            <div className="bg-white h-2 rounded-full" style={{ width: '40%' }}></div>
          </div>
          <div className="flex justify-between text-xs opacity-75">
            <span>$2,000</span>
            <span>$5,000</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}