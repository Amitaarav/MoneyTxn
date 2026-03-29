'use client';

import { Menu, Bell, Search } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  activeTab: string;
  user?: { name?: string | null };
  notificationCount?: number;
}

const pageMeta: Record<string, { eyebrow: string; title: string }> = {
  dashboard:    { eyebrow: 'Overview',  title: 'Dashboard'           },
  transactions: { eyebrow: 'History',   title: 'Transactions'        },
  profile:      { eyebrow: 'Account',   title: 'Profile settings'    },
  settings:     { eyebrow: 'Account',   title: 'Account settings'    },
};

const getInitials = (name?: string | null) => {
  if (!name) return 'U';
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
};

export default function Header({
  onMenuClick,
  activeTab,
  user,
  notificationCount = 3,
}: HeaderProps) {
  const meta = pageMeta[activeTab] ?? { eyebrow: 'App', title: 'Dashboard' };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-6 h-16 flex items-center justify-between gap-4">

      {/* Left: hamburger + page title */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-150 flex-shrink-0"
        >
          <Menu size={17} />
        </button>

        {/* Title block */}
        <div className="min-w-0">
          <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-gray-400 leading-none mb-0.5">
            {meta.eyebrow}
          </p>
          <h1
            className="text-[18px] font-normal text-gray-950 leading-none tracking-tight truncate"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {meta.title}
          </h1>
        </div>
      </div>

      {/* Right: search + bell + avatar */}
      <div className="flex items-center gap-2.5 flex-shrink-0">

        {/* Search — hidden on mobile */}
        <div className="relative hidden md:block">
          <Search
            size={13}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search transactions…"
            className="h-9 pl-9 pr-4 w-56 text-[13px] text-gray-900 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-150"
          />
        </div>

        {/* Notification bell */}
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 transition-colors duration-150">
          <Bell size={15} />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-blue-600 text-white text-[10px] font-semibold rounded-full flex items-center justify-center px-1 leading-none">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white text-[12px] font-semibold flex-shrink-0 cursor-pointer hover:bg-blue-700 transition-colors duration-150">
          {getInitials(user?.name)}
        </div>

      </div>
    </header>
  );
}