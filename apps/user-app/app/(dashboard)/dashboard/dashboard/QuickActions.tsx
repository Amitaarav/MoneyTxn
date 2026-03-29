'use client';

import {
  ArrowUpRight, ArrowDownRight, CreditCard, Target, PiggyBank
} from 'lucide-react';

const actions = [
  {
    title: 'Add income',
    description: 'Record new income',
    icon: ArrowUpRight,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Add expense',
    description: 'Record new expense',
    icon: ArrowDownRight,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500',
  },
  {
    title: 'Transfer money',
    description: 'Between accounts',
    icon: CreditCard,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Set budget',
    description: 'Create spending limit',
    icon: Target,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
  },
];

export default function QuickActions() {
  return (
    <div className="flex flex-col gap-1">

      {/* Action rows */}
      {actions.map(({ title, description, icon: Icon, iconBg, iconColor }, index) => (
        <button
          key={index}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-150 group text-left"
        >
          <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-150`}>
            <Icon size={16} className={iconColor} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-medium text-gray-900 tracking-tight">{title}</p>
            <p className="text-[12px] text-gray-400 font-light">{description}</p>
          </div>
          <ArrowUpRight size={13} className="text-gray-300 group-hover:text-gray-500 flex-shrink-0 transition-colors duration-150 rotate-45" />
        </button>
      ))}

      {/* Divider */}
      <div className="mx-4 my-2 h-px bg-gray-100" />

      {/* Savings goal widget */}
      <div className="relative mx-2 mb-2 bg-gray-950 border border-white/[0.06] rounded-xl p-4 overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 blur-2xl rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <PiggyBank size={13} className="text-blue-400 flex-shrink-0" />
            <p className="text-[12px] font-medium text-white tracking-tight">Savings goal</p>
          </div>
          <p className="text-[11.5px] text-gray-500 font-light mb-3">Emergency fund</p>

          {/* Progress bar */}
          <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden mb-2">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-600">₹2,000 saved</span>
            <span className="text-[11px] text-blue-400 font-medium">40% of ₹5,000</span>
          </div>
        </div>
      </div>

    </div>
  );
}