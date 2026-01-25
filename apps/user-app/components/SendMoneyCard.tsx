"use client"
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "app/lib/actions/p2pTransfer";
import { toast } from "sonner";
import { Send } from "lucide-react";

export function SendMoneyCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSend = async () => {
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
        <Card className="h-fit">
            <CardHeader>
                <CardTitle>Send Money</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <TextInput
                        label="Friend's Number"
                        placeholder="Enter phone number"
                        onChange={(val) => setNumber(val)}
                        value={number}
                    />
                    <TextInput
                        label="Amount"
                        placeholder="Enter amount"
                        onChange={(val) => setAmount(Number(val))}
                        value={amount.toString()}
                    />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={handleSend} disabled={isProcessing}>
                            {isProcessing ? "Processing..." : (
                                <>
                                    Send <Send className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
