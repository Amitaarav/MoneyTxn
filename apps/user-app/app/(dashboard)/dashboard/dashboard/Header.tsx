'use client';

import { Menu, Bell, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface HeaderProps {
  onMenuClick: () => void;
  activeTab: string;
}

const getPageTitle = (tab: string) => {
  switch (tab) {
    case 'dashboard':
      return 'Dashboard Overview';
    case 'transactions':
      return 'Transaction History';
    case 'profile':
      return 'Profile Settings';
    case 'settings':
      return 'Account Settings';
    default:
      return 'Dashboard';
  }
};

export default function Header({ onMenuClick, activeTab }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden mr-2"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">
            {getPageTitle(activeTab)}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search transactions..."
              className="pl-10 w-64"
            />
          </div>
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>
          
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-[#6a51a6] text-white">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}