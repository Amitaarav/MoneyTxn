"use client";

import { useState } from "react";
import { Send, Phone, Shield, AlertCircle } from "lucide-react";
import { p2pTransfer } from "app/lib/actions/p2pTransfer";
import { toast } from "sonner";

const QUICK_AMOUNTS = [100, 500, 1000, 2000];

const inputClass =
  "w-full h-11 px-3.5 text-[14px] text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 placeholder:text-gray-400 transition-colors duration-150";

export function SendMoneyCard() {
  const [number, setNumber]         = useState("");
  const [amount, setAmount]         = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = async () => {
    if (!number || !amount || Number(amount) <= 0) {
      toast.error("Please enter a valid number and amount");
      return;
    }
    setIsProcessing(true);
    try {
      const res = await p2pTransfer(number, Number(amount) * 100);
      if (res.message === "Transfer successful") {
        toast.success("Money sent successfully!");
        setNumber("");
        setAmount("");
        window.location.reload();
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Error while sending money. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-5">

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

      {/* Irreversible warning */}
      <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
        <AlertCircle size={13} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-[12px] text-amber-700 font-light leading-relaxed">
          Transfers are <span className="font-medium">instant and irreversible.</span>{" "}
          Please verify the recipient's number before sending.
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={handleSend}
        disabled={isProcessing || !number || !amount || Number(amount) <= 0}
        className="w-full h-11 bg-gray-950 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[14px] font-medium tracking-tight rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(37,99,235,0.3)] group"
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white/70" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Processing…
          </>
        ) : (
          <>
            Send money
            <Send size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </>
        )}
      </button>

      {/* Security note */}
      <div className="flex items-center justify-center gap-1.5">
        <Shield size={11} className="text-gray-300" />
        <span className="text-[11.5px] text-gray-400">Secured with 256-bit encryption</span>
      </div>

    </div>
  );
}