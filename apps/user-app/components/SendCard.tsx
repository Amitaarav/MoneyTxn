"use client";

import { useState, useEffect } from "react";
import { Phone, ArrowUpRight, Send, Clock, UserCircle2 } from "lucide-react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { toast } from "sonner";

interface Transaction {
  id: number;
  amount: number;
  timestamp: Date;
  fromUser: { name: string; number: string };
  toUser:   { name: string; number: string };
}

const QUICK_AMOUNTS = [100, 500, 1000, 2000];

const inputClass =
  "w-full h-11 px-3.5 text-[14px] text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 placeholder:text-gray-400 transition-colors duration-150";

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount / 100);

const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

export function SendCard() {
  const [number, setNumber]   = useState("");
  const [amount, setAmount]   = useState("");
  const [loading, setLoading] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [recentContacts, setRecentContacts]         = useState<{ name: string; number: string }[]>([]);

  useEffect(() => {
    fetch("/api/transactions/recent").then((r) => r.json()).then(setRecentTransactions).catch(() => {});
    fetch("/api/contacts/recent").then((r) => r.json()).then(setRecentContacts).catch(() => {});
  }, []);

  const handleTransfer = async () => {
    if (!number || !amount) { toast.error("Please fill in all fields"); return; }
    const amountNum = Number(amount);
    if (isNaN(amountNum) || amountNum <= 0) { toast.error("Please enter a valid amount"); return; }

    setLoading(true);
    try {
      const result = await p2pTransfer(number, amountNum * 100);
      if (!result)                              { toast.error("Transfer failed"); return; }
      if (result.message === "Insufficient funds") { toast.error("Insufficient balance"); }
      else if (result.message === "User not found") { toast.error("Recipient not found"); }
      else {
        toast.success("Transfer successful!");
        setNumber(""); setAmount("");
        fetch("/api/transactions/recent").then((r) => r.json()).then(setRecentTransactions).catch(() => {});
      }
    } catch { toast.error("Transfer failed. Please try again."); }
    finally  { setLoading(false); }
  };

  return (
    <div className="flex flex-col gap-5 p-6">

      {/* ── Send form ── */}
      <div className="flex flex-col gap-4">

        {/* Recipient */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12.5px] font-medium text-gray-700 tracking-tight">
            Recipient's phone
          </label>
          <div className="relative">
            <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="tel"
              placeholder="+91 00000 00000"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className={`${inputClass} pl-9`}
            />
          </div>
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12.5px] font-medium text-gray-700 tracking-tight">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] font-medium text-gray-400 pointer-events-none">
              ₹
            </span>
            <input
              type="number"
              min="1"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`${inputClass} pl-8`}
            />
          </div>

          {/* Quick amount pills */}
          <div className="flex items-center gap-2 mt-1">
            {QUICK_AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(String(amt))}
                className={`flex-1 h-8 text-[12px] font-medium rounded-lg border transition-all duration-150 ${
                  amount === String(amt)
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"
                }`}
              >
                ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
              </button>
            ))}
          </div>
        </div>

        {/* Summary row */}
        {number && Number(amount) > 0 && (
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
            <span className="text-[12.5px] text-gray-400">Sending to {number}</span>
            <span
              className="text-[16px] font-normal text-gray-950 tracking-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              ₹{Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleTransfer}
          disabled={loading || !number || !amount || Number(amount) <= 0}
          className="w-full h-11 bg-gray-950 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[14px] font-medium tracking-tight rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(37,99,235,0.3)] group"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white/70" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Sending…
            </>
          ) : (
            <>
              Send money
              <Send size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </>
          )}
        </button>
      </div>

      {/* ── Recent contacts ── */}
      {recentContacts.length > 0 && (
        <div>
          <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-3">
            Recent contacts
          </p>
          <div className="grid grid-cols-2 gap-2">
            {recentContacts.map((contact) => (
              <button
                key={contact.number}
                onClick={() => setNumber(contact.number)}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-150 ${
                  number === contact.number
                    ? "border-blue-300 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0">
                  {getInitials(contact.name)}
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-gray-900 truncate tracking-tight">{contact.name}</p>
                  <p className="text-[11.5px] text-gray-400 font-light truncate">{contact.number}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Recent transactions ── */}
      {recentTransactions.length > 0 && (
        <div>
          <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-3">
            Recent transfers
          </p>
          <div className="flex flex-col divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
            {recentTransactions.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50/60 transition-colors duration-150 cursor-pointer group"
                onClick={() => setNumber(txn.toUser.number)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0">
                    {getInitials(txn.toUser.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-gray-900 truncate tracking-tight">{txn.toUser.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock size={10} className="text-gray-300 flex-shrink-0" />
                      <p className="text-[11.5px] text-gray-400 font-light truncate">
                        {new Date(txn.timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <span className="text-[13.5px] font-medium text-gray-900 tracking-tight">
                    {formatAmount(txn.amount)}
                  </span>
                  <ArrowUpRight
                    size={13}
                    className="text-gray-300 group-hover:text-blue-500 transition-colors duration-150"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}