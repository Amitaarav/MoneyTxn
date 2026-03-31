"use client";

import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { ArrowRight, LogOut } from "lucide-react";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
  getProfile: () => void;
}

export const Appbar = ({ user, onSignin, onSignout, getProfile }: AppbarProps) => {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 bg-white/90 backdrop-blur-md border-b border-gray-200/80">

      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => router.push("/")}
      >
        {/* Icon mark */}
        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 transition-colors duration-200">
          <span className="text-white text-[11px] font-bold tracking-tight">TXN</span>
        </div>
        {/* Wordmark */}
        <span
          className="text-[18px] font-normal text-gray-950 tracking-tight leading-none"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Money<span className="text-blue-600">TXN</span>
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        {user ? (
          <div className="flex items-center gap-3">
            {/* User name pill */}
            {user.name && (
              <button onClick={getProfile} className="hover: cursor-pointer">
                <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3.5 py-1.5">
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-semibold flex-shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[13px] font-medium text-gray-700 tracking-tight">
                    {user.name}
                  </span>
                </div>
              </button>
            )}
            {/* Logout */}
            <button
              onClick={onSignout}
              className="inline-flex items-center gap-2 text-[13.5px] font-medium text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-400 rounded-full px-4 py-2 transition-all duration-150"
            >
              <LogOut size={13} />
              <span>Sign out</span>
            </button>
          </div>
        ) : (
          <button
            onClick={onSignin}
            className="inline-flex items-center gap-2 bg-gray-950 hover:bg-blue-600 text-white text-[13.5px] font-medium tracking-tight px-5 py-2 rounded-full transition-all duration-200 hover:shadow-[0_4px_16px_rgba(37,99,235,0.3)] group"
          >
            Sign in
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        )}
      </div>
    </header>
  );
};