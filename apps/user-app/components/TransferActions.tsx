"use client"

import { useState } from "react"
import { Card, CardContent } from "@repo/ui/card"
import { AddMoney } from "./AddMoneyCard"
import { WithdrawMoney } from "./WithdrawMoneyCard"
import { PlusCircle, ArrowUpRight } from "lucide-react"

export function TransferActions() {
    const [activeTab, setActiveTab] = useState<'add' | 'withdraw'>('add')

    return (
        <Card className="border-none shadow-sm bg-white overflow-hidden">
            <div className="flex border-b border-slate-100">
                <button
                    onClick={() => setActiveTab('add')}
                    className={`flex-1 py-4 text-sm font-bold transition-all flex items-center justify-center gap-2
                        ${activeTab === 'add'
                            ? "text-[#6a51a6] border-b-2 border-[#6a51a6] bg-purple-50/30"
                            : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
                >
                    <PlusCircle className="w-4 h-4" />
                    Add Money
                </button>
                <button
                    onClick={() => setActiveTab('withdraw')}
                    className={`flex-1 py-4 text-sm font-bold transition-all flex items-center justify-center gap-2
                        ${activeTab === 'withdraw'
                            ? "text-[#6a51a6] border-b-2 border-[#6a51a6] bg-purple-50/30"
                            : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
                >
                    <ArrowUpRight className="w-4 h-4" />
                    Withdraw
                </button>
            </div>
            <CardContent className="pt-6">
                {activeTab === 'add' ? <AddMoney /> : <WithdrawMoney />}
            </CardContent>
        </Card>
    )
}
