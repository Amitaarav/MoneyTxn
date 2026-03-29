import { SendMoneyCard } from "../../../components/SendMoneyCard";
import { RecentP2P } from "../../../components/RecentP2P";
import { getP2PTransfers } from "../../lib/actions/getP2PTransfers";
import { Zap, ShieldCheck } from "lucide-react";

export default async function P2PPage() {
  const transfers = await getP2PTransfers();

  return (
    <div className="max-w-[1080px] mx-auto px-6 py-8 flex flex-col gap-6">

      {/* ── Page header ── */}
      <div>
        <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-blue-600 mb-2">
          Transfers
        </p>
        <h1
          className="text-[28px] font-normal text-gray-950 tracking-tight leading-tight mb-1"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          P2P <em className="italic text-blue-600">transfers.</em>
        </h1>
        <p className="text-[14px] text-gray-400 font-light">
          Send money to friends and family instantly, anywhere.
        </p>
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">

        {/* Left: Send money */}
        <div className="xl:col-span-5 flex flex-col gap-4">
          <div>
            <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-3">
              Send funds
            </p>
            <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
              <SendMoneyCard />
            </div>
          </div>

          {/* Feature tiles */}
          <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
            <div className="bg-white p-5 flex flex-col gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Zap size={16} className="text-emerald-600" />
              </div>
              <div>
                <h4 className="text-[13px] font-medium text-gray-900 tracking-tight mb-1">
                  Instant settlement
                </h4>
                <p className="text-[12px] text-gray-400 font-light leading-relaxed">
                  Money lands in the recipient's wallet with zero delays.
                </p>
              </div>
            </div>
            <div className="bg-white p-5 flex flex-col gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <ShieldCheck size={16} className="text-blue-600" />
              </div>
              <div>
                <h4 className="text-[13px] font-medium text-gray-900 tracking-tight mb-1">
                  Encrypted & secure
                </h4>
                <p className="text-[12px] text-gray-400 font-light leading-relaxed">
                  256-bit encryption with atomic database transactions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recent activity */}
        <div className="xl:col-span-7">
          <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-3">
            Recent activity
          </p>
          <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
            <RecentP2P transfers={transfers} />
          </div>
        </div>

      </div>
    </div>
  );
}