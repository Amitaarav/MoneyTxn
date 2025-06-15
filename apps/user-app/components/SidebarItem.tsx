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

  const baseClasses = "m-2 p-2 pl-8 rounded-md cursor-pointer transition duration-300";
  const selectedClasses = isSelected
    ? "bg-purple-500 text-white"
    : "border border-gray-600 text-slate-500 hover:bg-purple-600 hover:text-white";

  return (
    <div
      className={`${baseClasses} ${selectedClasses}`}
      onClick={() => router.push(href)}
    >
      <div className="flex items-center hover:text-white space-x-2">
        <div className={isSelected ? "text-white" : "text-gray-500 hover:text-white"}>
          {icon}
        </div>
        <div className={`font-bold ${isSelected ? "text-white" : "text-slate-500 hover:text-white"}`}>
          {title}
        </div>
      </div>
    </div>
  );
};
