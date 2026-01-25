import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Wallet, Lock, Info } from "lucide-react";

export const BalanceCard = ({ amount, locked }: {
    amount: number;
    locked: number;
}) => {
    return (
        <Card className="border-none shadow-lg bg-gradient-to-br from-[#6a51a6] to-[#4f46e5] text-white">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-purple-100 font-medium text-sm flex items-center gap-2">
                        <Wallet className="w-4 h-4" />
                        Total Balance
                    </CardTitle>
                    <Info className="w-4 h-4 text-purple-200 opacity-50 cursor-pointer" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="mb-6">
                    <h2 className="text-4xl font-black tracking-tight">
                        ₹{((amount + locked) / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </h2>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            Available Funds
                        </div>
                        <div className="font-bold">
                            ₹{(amount / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-sm font-medium text-purple-100">
                            <Lock className="w-3.5 h-3.5" />
                            Locked
                        </div>
                        <div className="font-bold text-purple-100">
                            ₹{(locked / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}