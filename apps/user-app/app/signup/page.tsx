"use client"
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAccount } from "../lib/actions/createAccount";

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async () => {
        setError("");
        const res = await createAccount(name, phone, password);
        if (res.error) {
            setError(res.error);
        } else {
            router.push("/signin");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <Card className="w-full max-w-md mx-4">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
                    <CardDescription className="text-center">Enter your details to get started</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <TextInput label="Full Name" placeholder="John Doe" onChange={setName} />
                    <TextInput label="Phone Number" placeholder="1234567890" onChange={setPhone} />
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-gray-100">Password</label>
                        <input
                            type="password"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="******"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                    <div className="pt-4">
                        <Button className="w-full" onClick={handleSignup}>
                            Sign Up
                        </Button>
                    </div>

                    <div className="text-center text-sm">
                        Already have an account? <span className="underline cursor-pointer" onClick={() => router.push("/signin")}>Sign in</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
