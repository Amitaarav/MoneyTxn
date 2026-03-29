"use client";

import { ArrowUpRight, ArrowDownLeft, Clock, MoreHorizontal } from "lucide-react";

interface P2PTransfer {
  id: number;
  type: "sent" | "received";
  otherUser: string;
  amount: number;
  timestamp: Date;
}

const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

export function RecentP2P({ transfers }: { transfers: P2PTransfer[] }) {
  if (!transfers.length) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center px-6">
        <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
          <Clock size={16} className="text-gray-400" />
        </div>
        <p
          className="text-[15px] font-normal text-gray-950 tracking-tight mb-1"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          No transfers yet
        </p>
        <p className="text-[12.5px] text-gray-400 font-light">
          Your P2P activity will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {transfers.map((t) => {
        const isSent = t.type === "sent";
        const Icon   = isSent ? ArrowUpRight : ArrowDownLeft;

        return (
          <div
            key={t.id}
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/60 transition-colors duration-150 group"
          >
            {/* Left: direction icon + user info */}
            <div className="flex items-center gap-3 min-w-0">
              {/* Direction tile */}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border flex-shrink-0 ${
                isSent
                  ? "bg-gray-100 border-gray-200"
                  : "bg-emerald-50 border-emerald-100"
              }`}>
                <Icon size={15} className={isSent ? "text-gray-500" : "text-emerald-600"} />
              </div>

              {/* User avatar + meta */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-[10px] font-semibold flex-shrink-0">
                  {getInitials(t.otherUser)}
                </div>
                <div className="min-w-0">
                  <p className="text-[13.5px] font-medium text-gray-900 tracking-tight truncate">
                    {isSent ? `To ${t.otherUser}` : `From ${t.otherUser}`}
                  </p>
                  <p className="text-[12px] text-gray-400 font-light mt-0.5">
                    {new Date(t.timestamp).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: amount + type + menu */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-right">
                <p className={`text-[14px] font-medium tracking-tight ${
                  isSent ? "text-gray-900" : "text-emerald-600"
                }`}>
                  {isSent ? "−" : "+"}₹{(t.amount / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <p className="text-[11px] text-gray-400 font-light capitalize mt-0.5">
                  {t.type}
                </p>
              </div>

              <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-150">
                <MoreHorizontal size={13} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}