'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface SpendingChartProps {
  stats: {
    category: string;
    amount: number;
    percentage: number;
    color: string;
  }[];
}

export default function SpendingChart({ stats }: SpendingChartProps) {
  // Use stats from props, or fallback to empty if none provided
  const data = stats.length > 0 ? stats : [];
  const totalSpent = data.reduce((acc, item) => acc + item.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Overview</CardTitle>
        <p className="text-sm text-gray-600">Your expenses this month</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No spending data available
            </div>
          ) : (
            data.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {item.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold">
                      ₹{item.amount / 100}
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
            ))
          )}
        </div>
        {data.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Spent</span>
              <span className="text-lg font-bold text-gray-900">₹{totalSpent / 100}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}