import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/card";

export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {
    return <Card>
        <CardHeader>
            <CardTitle>Balance</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex justify-between border-b border-slate-300 pb-2 ">
                <div>
                    Unlocked balance
                </div>
                <div>
                    {amount / 100} INR
                </div>
            </div>
            <div className="flex justify-between border-b border-slate-300 py-2">
                <div>
                    Total Locked Balance
                </div>
                <div>
                    {locked / 100} INR
                </div>
            </div>
            <div className="flex justify-between border-b border-slate-300 py-2">
                <div>
                    Total Balance
                </div>
                <div>
                    {(locked + amount) / 100} INR
                </div>
            </div>
        </CardContent>
    </Card>
}