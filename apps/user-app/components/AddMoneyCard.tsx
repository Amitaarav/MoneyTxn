"use client";

import { useState } from "react";
import { ArrowUpRight, Building2, Shield, ChevronDown } from "lucide-react";
import { createOnRampTransaction } from "app/lib/actions/createOnRamptxn";
import { processMockWebhook } from "app/lib/actions/processWebhook";
import { toast } from "sonner";

const SUPPORTED_BANKS = [
  { name: "HDFC Bank",  redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank",  redirectUrl: "https://www.axisbank.com/"       },
  { name: "Test Bank",  redirectUrl: "TEST_MODE"                        },
];

const QUICK_AMOUNTS = [500, 1000, 2000, 5000];

const inputClass =
  "w-full h-11 px-3.5 text-[14px] text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 placeholder:text-gray-400 transition-colors duration-150";

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl ?? "");
  const [amount, setAmount]           = useState("");
  const [provider, setProvider]       = useState(SUPPORTED_BANKS[0]?.name ?? "");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddMoney = async () => {
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    setIsProcessing(true);
    try {
      const result = await createOnRampTransaction(numAmount, provider);
      if (result.message && !result.token) {
        toast.error(result.message);
        return;
      }
      if (provider === "Test Bank") {
        toast.loading("Simulating bank webhook…");
        await new Promise((r) => setTimeout(r, 1000));
        if (result.token && result.userId) {
          await processMockWebhook(result.token, result.userId, (numAmount * 100).toString());
          toast.dismiss();
          toast.success("Transaction successful!");
          window.location.reload();
        } else {
          toast.error("Failed to get transaction token");
        }
      } else {
        window.location.href = redirectUrl;
      }
    } catch {
      toast.error("Transaction failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-5">

      {/* Amount input */}
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

      {/* Bank select */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[12.5px] font-medium text-gray-700 tracking-tight">
          Select bank
        </label>
        <div className="relative">
          <Building2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select
            value={provider}
            onChange={(e) => {
              const bank = SUPPORTED_BANKS.find((b) => b.name === e.target.value);
              setProvider(bank?.name ?? "");
              setRedirectUrl(bank?.redirectUrl ?? "");
            }}
            className={`${inputClass} pl-9 pr-9 appearance-none cursor-pointer`}
          >
            {SUPPORTED_BANKS.map((b) => (
              <option key={b.name} value={b.name}>{b.name}</option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {provider === "Test Bank" && (
          <p className="text-[11.5px] text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 font-light">
            Test mode — no real money will be transferred.
          </p>
        )}
      </div>

      {/* Summary row */}
      {Number(amount) > 0 && (
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
          <span className="text-[12.5px] text-gray-400">You're adding</span>
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
        onClick={handleAddMoney}
        disabled={isProcessing || !amount || Number(amount) <= 0}
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
            Add money
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
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
};