"use client";

import { useState } from "react";
import { AddMoney } from "./AddMoneyCard";
import { WithdrawMoney } from "./WithdrawMoneyCard";
import { PlusCircle, ArrowDownRight } from "lucide-react";

const tabs = [
  { id: "add",      label: "Add money",  Icon: PlusCircle    },
  { id: "withdraw", label: "Withdraw",   Icon: ArrowDownRight },
] as const;

type Tab = typeof tabs[number]["id"];

export function TransferActions() {
  const [activeTab, setActiveTab] = useState<Tab>("add");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex border-b border-gray-100">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-[13.5px] font-medium tracking-tight transition-all duration-150 relative ${
                isActive
                  ? "text-gray-950"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              <Icon size={14} />
              {label}
              {/* Active underline */}
              {isActive && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      {activeTab === "add" ? <AddMoney /> : <WithdrawMoney />}
    </div>
  );
}