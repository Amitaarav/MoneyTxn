"use client";

import { useState } from "react";
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { toast } from "sonner";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"; // fallback if not defined

const MerchantTransferCard = () => {
  const [merchantId, setMerchantId] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    if (!merchantId || !amount || amount <= 0) {
      toast.error("Please provide a valid Merchant ID and Amount.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/user/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ merchantId, amount }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Transfer successful");
        setMerchantId("");
        setAmount("");
      } else {
        toast.error(data.message || "Transfer failed");
      }
    } catch (error) {
      console.error("Transfer error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center max-w-4xl mx-auto p-4 m-20">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Transfer to Merchant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="merchantId" className="text-white">Merchant ID</Label>
              <Input
                id="merchantId"
                type="text"
                className="text-black text-sm"
                placeholder="Enter merchant ID"
                value={merchantId}
                onChange={(e) => setMerchantId(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-white">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                className="text-black text-sm"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="1"
                required
              />
            </div>
            <Button onClick={handleTransfer} disabled={loading} className="w-full">
              {loading ? "Sending..." : "Send Money"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MerchantTransferCard;
