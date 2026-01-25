"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarItemProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export const SidebarItem = ({ href, title, icon }: SidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isSelected = pathname === href;

  return (
    <div
      className={`mx-2 my-1 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group flex items-center space-x-3
        ${isSelected
          ? "bg-[#6a51a6] text-white shadow-md shadow-purple-200"
          : "text-slate-600 hover:bg-[#6a51a6]/10 hover:text-[#6a51a6]"
        }`}
      onClick={() => router.push(href)}
    >
      <div className={`transition-colors duration-200 ${isSelected ? "text-white" : "text-slate-400 group-hover:text-[#6a51a6]"}`}>
        {icon}
      </div>
      <div className={`font-semibold transition-colors duration-200 ${isSelected ? "text-white" : "text-slate-600 group-hover:text-[#6a51a6]"}`}>
        {title}
      </div>
    </div>
  );
};
