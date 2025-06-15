"use client";

import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  const router = useRouter();
  const isLoggedIn = localStorage.getItem("token") !== null;
  const handleLogout = () => {
    localStorage.removeItem("token");
    onSignout(); // external signout logic
    router.push("/signin");
  };

  const handleLogin = () => {
    onSignin();
    router.push("/dashboard");
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center border-b px-4 py-2 bg-gradient-to-r from-indigo-200 via-purple-500 to-pink-200 shadow-lg ">
      <div className="text-3xl font-extrabold flex items-center gap-1">
        <span className="text-xl">Money</span>
        <span className="bg-gradient-to-r from-blue-600 to-red-600 border-2 rounded-lg bg-clip-text text-transparent text-4xl px-1">
          TXN
        </span>
      </div>
      <div>
        {isLoggedIn ? (
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

