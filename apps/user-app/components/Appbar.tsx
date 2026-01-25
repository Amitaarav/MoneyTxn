"use client";

import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";
import ThemeToggle from "./ThemeToggle";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {

  const router = useRouter();

  const handleLogout = () => {
    onSignout();
  };

  const handleLogin = () => {
    onSignin();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-8 backdrop-blur-md bg-white/80 border-b border-slate-200 dark:bg-gray-900/80 dark:border-gray-800">
      <div className="flex items-center gap-2 group cursor-pointer" onClick={() => router.push("/")}>
        <div className="bg-gradient-to-br from-[#6a51a6] to-[#8b5cf6] p-2 rounded-xl transition-transform group-hover:scale-110 shadow-lg shadow-purple-200">
          <span className="text-white font-black text-xl italic tracking-tighter">TXN</span>
        </div>
        <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
          Money<span className="text-[#6a51a6]">TXN</span>
        </span>
      </div>
      <div className="flex items-center gap-6">
        <ThemeToggle />
        <Button
          onClick={user ? handleLogout : handleLogin}
          className={`px-6 py-2.5 rounded-xl font-bold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg ${user
            ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-100"
            : "bg-[#6a51a6] hover:bg-[#5a4496] text-white shadow-purple-100"
            }`}
        >
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </header>
  );
};
