"use client"
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "app/lib/actions/p2pTransfer";
import { toast } from "sonner";
import { Send, User, Coins } from "lucide-react";

export function SendMoneyCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSend = async () => {
        if (!number || amount <= 0) {
            toast.error("Please enter a valid number and amount");
            return;
        }
        setIsProcessing(true);
        try {
            const res = await p2pTransfer(number, Number(amount) * 100);
            if (res.message === "Transfer successful") {
                toast.success("Money sent successfully!");
                setNumber("");
                setAmount(0);
                window.location.reload();
            } else {
                toast.error(res.message);
            }
        } catch (e) {
            toast.error("Error while sending money");
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <Card className="border-none shadow-xl bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#6a51a6] to-[#8b5cf6] py-8">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                        <Send className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-white text-xl font-black tracking-tight">Send Money</CardTitle>
                        <p className="text-purple-100 text-xs font-medium">Instantly transfer to any recipient</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
                <div className="space-y-4">
                    <div className="relative">
                        <TextInput
                            label="Recipient Phone Number"
                            placeholder="e.g. 9988776655"
                            onChange={(val) => setNumber(val)}
                            value={number}
                        />
                    </div>
                    <div className="relative">
                        <TextInput
                            label="Amount to Transfer (₹)"
                            placeholder="Enter amount"
                            onChange={(val) => setAmount(Number(val))}
                            value={amount.toString()}
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <Button
                        onClick={handleSend}
                        disabled={isProcessing}
                        className="w-full bg-[#6a51a6] hover:bg-[#5a4496] py-4 rounded-xl font-bold text-white shadow-lg shadow-purple-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        {isProcessing ? "Processing Transfer..." : (
                            <>
                                Send Money Now <Send className="w-4 h-4" />
                            </>
                        )}
                    </Button>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-start gap-3">
                    <Coins className="w-5 h-5 text-[#6a51a6] mt-0.5" />
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                        Transfers are processed instantly and are irreversible once completed. Please verify the recipient's number before sending.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
