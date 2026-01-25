import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/card"
import { Badge } from "../app/(dashboard)/dashboard/ui/badge"
import { ArrowDownLeft, Clock, CheckCircle2, XCircle } from "lucide-react"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {
    return (
        <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-50 bg-slate-50/30">
                <CardTitle className="text-lg font-bold text-slate-800">Payment History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {!transactions.length ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
                        <Clock className="w-10 h-10 mb-2 opacity-20" />
                        <p className="text-sm font-medium">No recent payments found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {transactions.map((t, i) => (
                            <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105
                                        ${t.status === 'Success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            t.status === 'Failure' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                        <ArrowDownLeft className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-sm">{t.provider}</p>
                                        <p className="text-xs text-slate-500 font-medium">
                                            {new Date(t.time).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end gap-1">
                                    <p className="font-black text-slate-900">
                                        +₹{(t.amount / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </p>
                                    <Badge
                                        className={`px-2 py-0 text-[10px] uppercase font-black border-none rounded-full
                                            ${t.status === 'Success' ? 'bg-emerald-100 text-emerald-700' :
                                                t.status === 'Failure' ? 'bg-rose-100 text-rose-700' :
                                                    'bg-amber-100 text-amber-700'}`}
                                    >
                                        {t.status === 'Success' ? <CheckCircle2 className="w-3 h-3 mr-1" /> :
                                            t.status === 'Failure' ? <XCircle className="w-3 h-3 mr-1" /> :
                                                <Clock className="w-3 h-3 mr-1" />}
                                        {t.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}