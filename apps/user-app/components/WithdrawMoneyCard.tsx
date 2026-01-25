"use client"
import { Button } from "@repo/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/card";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput"
import { Select } from "@repo/ui/select";
import { createOffRampTransaction } from "app/lib/actions/createOffRampTransaction";
import { toast } from "sonner";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const WithdrawMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState("HDFC Bank");
    const [message, setMessage] = useState("");

    return (
        <div className="w-full text-gray-900 space-y-6">
            <div className="space-y-4">
                <TextInput label={"Amount (₹)"} placeholder={"Enter amount e.g. 500"} onChange={(value) => {
                    setAmount(Number(value))
                }} />

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Bank Provider</label>
                    <Select onSelect={(value: any) => {
                        setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
                        setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
                    }} options={SUPPORTED_BANKS.map(x => ({
                        key: x.name,
                        value: x.name
                    }))} />
                </div>
            </div>

            <Button
                onClick={async () => {
                    const res = await createOffRampTransaction(amount, provider);
                    setMessage(res.message);
                    if (res.message === "Off ramp transaction added") {
                        toast.success("Withdrawal request initiated!");
                    } else {
                        toast.error(res.message);
                    }
                }}
                className="w-full border-2 border-[#6a51a6] text-[#6a51a6] hover:bg-[#6a51a6] hover:text-white py-3 rounded-xl font-bold transition-all active:scale-95 shadow-sm"
            >
                Request Withdrawal
            </Button>

            {message && <p className="text-xs text-center font-bold text-[#6a51a6] animate-pulse">{message}</p>}

            <p className="text-[10px] text-center text-slate-400 font-medium">
                Withdrawals may take up to 24-48 hours specialized on your bank.
            </p>
        </div>
    );
}
