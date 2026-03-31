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
      onClick={() => router.push(href)}
      className={`mx-2 my-0.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 flex items-center gap-3 group
        ${isSelected
          ? "bg-blue-600 text-white"
          : "text-gray-500 hover:text-white hover:bg-white/[0.06]"
        }`}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 transition-colors duration-150
        ${isSelected ? "text-white" : "text-gray-600 group-hover:text-white"}`}
      >
        {icon}
      </div>

      {/* Label */}
      <span className={`text-[13.5px] font-medium tracking-tight transition-colors duration-150
        ${isSelected ? "text-white" : "text-gray-500 group-hover:text-white"}`}
      >
        {title}
      </span>

      {/* Active dot */}
      {isSelected && (
        <span className="ml-auto w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
      )}
    </div>
  );
};