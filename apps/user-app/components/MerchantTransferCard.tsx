"use client"
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { useState } from "react";
import { transferToMerchant } from "../app/lib/actions/transfer";
import { toast } from "sonner";

export function MerchantTransferCard() {
    const [merchantId, setMerchantId] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const handleTransfer = async () => {
        if (!merchantId || !amount) {
            toast.error("Please fill in all fields");
            return;
        }

        const amountNum = Number(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        setLoading(true);
        try {
            const result = await transferToMerchant(merchantId, amountNum * 100);
            if (result.message === "Transfer successful") {
                toast.success("Transfer successful");
                setMerchantId("");
                setAmount("");
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Transfer failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Transfer to Merchant</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="merchantId">Merchant ID</Label>
                            <Input
                                id="merchantId"
                                type="text"
                                placeholder="Enter merchant ID"
                                value={merchantId}
                                onChange={(e) => setMerchantId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <Button
                            onClick={handleTransfer}
                            disabled={loading}
                            className="w-full"
                        >
                            {loading ? "Sending..." : "Send Money"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 