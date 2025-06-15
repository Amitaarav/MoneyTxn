'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export default function SpendingChart() {
  const data = [
    { category: 'Food & Dining', amount: 450, percentage: 35, color: 'bg-orange-500' },
    { category: 'Shopping', amount: 320, percentage: 25, color: 'bg-blue-500' },
    { category: 'Transportation', amount: 180, percentage: 14, color: 'bg-gray-500' },
    { category: 'Bills & Utilities', amount: 230, percentage: 18, color: 'bg-yellow-500' },
    { category: 'Entertainment', amount: 100, percentage: 8, color: 'bg-purple-500' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Overview</CardTitle>
        <p className="text-sm text-gray-600">Your expenses this month</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {item.category}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold">
                    ₹{item.amount}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {item.percentage}%
                  </Badge>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${item.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Spent</span>
            <span className="text-lg font-bold text-gray-900">₹1,280</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm text-gray-600">Budget Remaining</span>
            <span className="text-sm font-semibold text-green-600">₹720</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}