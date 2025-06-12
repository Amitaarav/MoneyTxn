"use client"
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { useState, useEffect } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { toast } from "sonner";
import prisma from "@repo/db/client";

interface Transaction {
    id: number;
    amount: number;
    timestamp: Date;
    fromUser: {
        name: string;
        number: string;
    };
    toUser: {
        name: string;
        number: string;
    };
}

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
    const [recentContacts, setRecentContacts] = useState<{ name: string; number: string }[]>([]);

    useEffect(() => {
        // Fetch recent transactions and contacts
        fetchRecentTransactions();
        fetchRecentContacts();
    }, []);

    const fetchRecentTransactions = async () => {
        try {
            const response = await fetch("/api/transactions/recent");
            const data = await response.json();
            setRecentTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const fetchRecentContacts = async () => {
        try {
            const response = await fetch("/api/contacts/recent");
            const data = await response.json();
            setRecentContacts(data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    const handleTransfer = async () => {
        if (!number || !amount) {
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
            const result = await p2pTransfer(number, amountNum * 100);
            if (!result) {
                toast.error("Transfer failed");
                return;
            }
            if (result.message === "Insufficient funds") {
                toast.error("Insufficient balance");
            } else if (result.message === "User not found") {
                toast.error("Recipient not found");
            } else {
                toast.success("Transfer successful");
                setNumber("");
                setAmount("");
                fetchRecentTransactions();
            }
        } catch (error) {
            toast.error("Transfer failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount / 100);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Send Money</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="number">Recipient's Phone Number</Label>
                            <Input
                                id="number"
                                type="tel"
                                placeholder="Enter phone number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
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

            {recentContacts.length > 0 && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Recent Contacts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recentContacts.map((contact) => (
                                <div
                                    key={contact.number}
                                    className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                                    onClick={() => setNumber(contact.number)}
                                >
                                    <div className="font-medium">{contact.name}</div>
                                    <div className="text-sm text-gray-500">{contact.number}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {recentTransactions.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentTransactions.map((txn) => (
                                <div key={txn.id} className="p-4 border rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-medium">
                                                {txn.toUser.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {txn.toUser.number}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium text-green-600">
                                                {formatAmount(txn.amount)}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {new Date(txn.timestamp).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}