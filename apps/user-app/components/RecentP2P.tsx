"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react"

export function RecentP2P({ transfers }: { transfers: any[] }) {
    return (
        <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-50 bg-slate-50/30">
                <CardTitle className="text-lg font-bold text-slate-800">Recent P2P Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {!transfers.length ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
                        <Clock className="w-10 h-10 mb-2 opacity-20" />
                        <p className="text-sm font-medium">No recent transfers</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {transfers.map((t) => (
                            <div key={t.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105
                                        ${t.type === 'sent' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                        {t.type === 'sent' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-sm">
                                            {t.type === 'sent' ? `Sent to ${t.otherUser}` : `From ${t.otherUser}`}
                                        </p>
                                        <p className="text-xs text-slate-500 font-medium">
                                            {new Date(t.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-black text-slate-900 ${t.type === 'sent' ? 'text-slate-900' : 'text-emerald-600'}`}>
                                        {t.type === 'sent' ? '-' : '+'}₹{(t.amount / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </p>
                                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-0.5">
                                        {t.type}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
