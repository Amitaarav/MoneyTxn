import { Wallet, Lock, ArrowUpRight } from "lucide-react";

export const BalanceCard = ({ amount, locked }: {
  amount: number;
  locked: number;
}) => {
  const total     = ((amount + locked) / 100).toLocaleString(undefined, { minimumFractionDigits: 2 });
  const available = (amount / 100).toLocaleString(undefined, { minimumFractionDigits: 2 });
  const lockedAmt = (locked / 100).toLocaleString(undefined, { minimumFractionDigits: 2 });

  // Available % for progress bar
  const pct = amount + locked > 0 ? Math.round((amount / (amount + locked)) * 100) : 0;

  return (
    <div className="relative bg-gray-950 border border-white/[0.06] rounded-2xl overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <Wallet size={13} className="text-white" />
            </div>
            <p className="text-[12px] font-medium text-gray-400 tracking-tight">Total balance</p>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Active
          </div>
        </div>

        {/* Total amount */}
        <div
          className="text-[38px] font-normal text-white leading-none tracking-tight mb-1"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          ₹{total}
        </div>
        <p className="text-[12px] text-gray-600 font-light mb-6">Across all accounts</p>

        {/* Progress bar */}
        <div className="mb-1.5">
          <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <p className="text-[11px] text-gray-600 font-light mb-5">
          {pct}% available
        </p>

        {/* Breakdown rows */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
              <span className="text-[13px] text-gray-400 font-light">Available</span>
            </div>
            <span className="text-[13.5px] font-medium text-white">₹{available}</span>
          </div>

          <div className="flex items-center justify-between bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <Lock size={11} className="text-gray-600 flex-shrink-0" />
              <span className="text-[13px] text-gray-500 font-light">Locked</span>
            </div>
            <span className="text-[13.5px] font-medium text-gray-400">₹{lockedAmt}</span>
          </div>
        </div>

        {/* CTA */}
        <button className="mt-4 w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-[13.5px] font-medium tracking-tight rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(37,99,235,0.3)] group">
          Add funds
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </button>

      </div>
    </div>
  );
};