"use client"
import { Button } from "@repo/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/card";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput"
import { Select } from "@repo/ui/select";
import { createOnRampTransaction } from "app/lib/actions/createOnRamptxn";
import { processMockWebhook } from "app/lib/actions/processWebhook";
import { toast } from "sonner";

// Hardcoded bank
const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}, {
    name: "Test Bank",
    redirectUrl: "TEST_MODE"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState("HDFC Bank");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAddMoney = async () => {
        setIsProcessing(true);
        try {
            // 1. Create Transaction
            const result = await createOnRampTransaction(amount, provider);

            if (result.message && !result.token) {
                toast.error(result.message);
                setIsProcessing(false);
                return;
            }

            // 2. Handle Test Mode
            if (provider === "Test Bank") {
                toast.loading("Simulating Bank Webhook...");

                // Simulate delay
                await new Promise(r => setTimeout(r, 1000));

                // Call Mock Webhook
                // Note: createOnRampTransaction needs to return the token and userId for this to work
                // We need to update createOnRampTransaction to return these values
                if (result.token && result.userId) {
                    await processMockWebhook(result.token, result.userId, (amount * 100).toString());
                    toast.dismiss();
                    toast.success("Transaction Successful!");
                    window.location.reload(); // Refresh to show new balance
                } else {
                    toast.error("Failed to get transaction token");
                }
            } else {
                // 3. Real Bank Redirect
                window.location.href = redirectUrl || "";
            }
        } catch (e) {
            toast.error("Transaction Failed");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="w-full text-gray-900 space-y-6">
            <div className="space-y-4">
                <TextInput label={"Amount (₹)"} placeholder={"Enter amount e.g. 500"} onChange={(value) => {
                    setAmount(Number(value))
                }} />

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Select Bank</label>
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
                onClick={handleAddMoney}
                disabled={isProcessing}
                className="w-full bg-[#6a51a6] hover:bg-[#5a4496] py-3 rounded-xl font-bold text-white shadow-lg shadow-purple-100 transition-all active:scale-95"
            >
                {isProcessing ? "Processing Transaction..." : "Complete Add Money"}
            </Button>

            <p className="text-[10px] text-center text-slate-400 font-medium">
                Payments are securely processed via encrypted channels.
            </p>
        </div>
    );
}