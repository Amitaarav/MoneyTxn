import { SendMoneyCard } from "../../../components/SendMoneyCard";
import { RecentP2P } from "../../../components/RecentP2P";
import { getP2PTransfers } from "../../lib/actions/getP2PTransfers";
import { Users2, ShieldCheck, Zap } from "lucide-react";

export default async function P2PPage() {
    const transfers = await getP2PTransfers();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-[#6a51a6] tracking-tight flex items-center gap-3">
                        <Users2 className="w-8 h-8" />
                        P2P Transfers
                    </h1>
                    <p className="text-slate-500 text-lg font-medium mt-1">Send money to friends and family instantly</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Side - Main Action */}
                <div className="lg:col-span-12 xl:col-span-5">
                    <section>
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">Transfer Funds</h3>
                        <SendMoneyCard />
                    </section>
                </div>

                {/* Right Side - History and Info */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-8">
                    <section>
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">Recent Activity</h3>
                        <RecentP2P transfers={transfers} />
                    </section>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 transition-all hover:shadow-md">
                            <div className="bg-emerald-100 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                                <Zap className="w-5 h-5 text-emerald-600" />
                            </div>
                            <h4 className="font-bold text-emerald-900 mb-1">Instant Settlement</h4>
                            <p className="text-xs text-emerald-700/70 font-medium leading-relaxed">
                                Recipients get the money in their wallet immediately with zero delays and no processing fees.
                            </p>
                        </div>
                        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 transition-all hover:shadow-md">
                            <div className="bg-indigo-100 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h4 className="font-bold text-indigo-900 mb-1">Encrypted & Secure</h4>
                            <p className="text-xs text-indigo-700/70 font-medium leading-relaxed">
                                Every transaction is protected with military-grade encryption and atomic database transactions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}