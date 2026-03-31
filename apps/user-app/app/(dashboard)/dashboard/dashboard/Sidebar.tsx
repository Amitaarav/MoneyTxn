'use client';

import { cn } from '../lib/utils';
import {
  LayoutDashboard,
  ArrowUpDown,
  User,
  Settings,
  X,
  TrendingUp,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user?: { name?: string | null };
}

const navigation = [
  { id: 'dashboard',     label: 'Dashboard',     icon: LayoutDashboard },
  { id: 'transactions',  label: 'Transactions',  icon: ArrowUpDown     },
  { id: 'profile',       label: 'Profile',       icon: User            },
  { id: 'settings',      label: 'Settings',      icon: Settings        },
];

const getInitials = (name?: string | null) =>
  name ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) : 'U';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  user,
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-[220px] bg-gray-950 flex flex-col border-r border-white/[0.06] transform transition-transform duration-300 ease-in-out',
          'lg:translate-x-0 lg:static lg:inset-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Logo row */}
        <div className="relative z-10 flex items-center justify-between h-16 px-5 border-b border-white/[0.06] flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[11px] font-bold tracking-tight">TXN</span>
            </div>
            <span
              className="text-[17px] font-normal text-white tracking-tight leading-none"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Money<span className="text-blue-400">TXN</span>
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Nav */}
        <nav className="relative z-10 flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
          <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-gray-600 px-3 mb-2">
            Menu
          </p>
          {navigation.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setIsOpen(false); }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 group',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 hover:text-white hover:bg-white/[0.06]'
                )}
              >
                <Icon size={16} className={cn('flex-shrink-0', isActive ? 'text-white' : 'text-gray-600 group-hover:text-white')} />
                <span className="text-[13.5px] font-medium tracking-tight">{label}</span>
                {isActive && (
                  <span className="ml-auto w-1 h-1 rounded-full bg-white/60" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom: savings widget + user */}
        <div className="relative z-10 px-3 pb-4 flex flex-col gap-3">

          {/* Savings goal card */}
          <div className="border border-white/[0.08] rounded-xl p-4 bg-white/[0.03]">
            <div className="flex items-center gap-2 mb-2.5">
              <TrendingUp size={13} className="text-blue-400 flex-shrink-0" />
              <span className="text-[12px] font-medium text-white tracking-tight">Monthly goal</span>
            </div>
            <p className="text-[11.5px] text-gray-500 mb-3 font-light">Save $500 this month</p>
            {/* Progress bar */}
            <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden mb-1.5">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-600">$325 saved</span>
              <span className="text-[11px] text-blue-400 font-medium">65%</span>
            </div>
          </div>

          {/* User row */}
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0">
              {getInitials(user?.name)}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-white truncate tracking-tight">
                {user?.name ?? 'My Account'}
              </p>
              <p className="text-[11px] text-gray-600 truncate">Personal</p>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
}