import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card>
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center pb-8 pt-8 text-ellipsis text-white">
                    No Recent transactions
                </div>
            </CardContent>
        </Card>
    }
    return <Card>
        <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="pt-2">
                {transactions.map(t => <div key={t.time.toString()} className="flex justify-between">
                    <div>
                        <div className="text-sm">
                            Received INR
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        + Rs {t.amount / 100}
                    </div>
                </div>)}
            </div>
        </CardContent>
    </Card>
}