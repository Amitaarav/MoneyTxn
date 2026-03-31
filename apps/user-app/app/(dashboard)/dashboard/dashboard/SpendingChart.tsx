'use client';

import { TrendingDown } from 'lucide-react';

interface SpendingChartProps {
  stats: {
    category: string;
    amount: number;
    percentage: number;
    color: string;
  }[];
}

// Map arbitrary Tailwind bg-* color classes to hex for the SVG donut
const colorMap: Record<string, string> = {
  'bg-blue-500':    '#3b82f6',
  'bg-emerald-500': '#10b981',
  'bg-amber-500':   '#f59e0b',
  'bg-rose-500':    '#f43f5e',
  'bg-violet-500':  '#8b5cf6',
  'bg-sky-500':     '#0ea5e9',
  'bg-orange-500':  '#f97316',
};

function DonutChart({ data }: { data: SpendingChartProps['stats'] }) {
  const size = 120;
  const r = 44;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="flex-shrink-0">
      {/* Track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth="12" />
      {data.map((item, i) => {
        const dash = (item.percentage / 100) * circumference;
        const gap  = circumference - dash;
        const el = (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={colorMap[item.color] ?? '#3b82f6'}
            strokeWidth="12"
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        );
        offset += dash;
        return el;
      })}
    </svg>
  );
}

export default function SpendingChart({ stats }: SpendingChartProps) {
  const data = stats ?? [];
  const totalSpent = data.reduce((acc, item) => acc + item.amount, 0);

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center px-6">
        <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
          <TrendingDown size={16} className="text-gray-400" />
        </div>
        <p
          className="text-[15px] font-normal text-gray-950 tracking-tight mb-1"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          No spending data
        </p>
        <p className="text-[12.5px] text-gray-400 font-light">Your monthly breakdown will appear here.</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-6">

      {/* Top row: donut + total */}
      <div className="flex items-center gap-6">
        <DonutChart data={data} />

        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray-400">
            Total spent
          </p>
          <p
            className="text-[32px] font-normal text-gray-950 leading-none tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            ₹{(totalSpent / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[12px] text-gray-400 font-light">This month</p>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="flex flex-col gap-3">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colorMap[item.color] ?? '#3b82f6' }}
                />
                <span className="text-[13px] font-medium text-gray-700 tracking-tight">
                  {item.category}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[13px] font-medium text-gray-900">
                  ₹{(item.amount / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[11px] text-gray-400 font-light w-8 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: colorMap[item.color] ?? '#3b82f6',
                }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}