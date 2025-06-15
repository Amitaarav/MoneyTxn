"use client"
import { Button } from "@repo/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/card";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput"
import { Select } from "@repo/ui/select";
import { Center } from "@repo/ui/center";
import { createOnRampTransaction } from "app/lib/actions/createOnRamptxn";

// Hardcoded bank
const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState("HDFC Bank");
    return <Card>
        <CardHeader>
            <CardTitle>Add Money</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="w-full">
                <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
                    setAmount(Number(value))
                }} />
                <div className="py-4 text-left">
                    Bank
                </div>
                <Select onSelect={(value : any) => {
                    setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
                    setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
                }} options={SUPPORTED_BANKS.map(x => ({
                    key: x.name,
                    value: x.name
                }))} />
                <div className="flex justify-center pt-4">
                    <Button onClick={ async () => {
                        await createOnRampTransaction(amount*100,provider)
                        window.location.href = redirectUrl || "";
                    }}>
                    Add Money
                    </Button>
                </div>
            </div>
        </CardContent>
    </Card>
}