"use client";

import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";

export function Appbar() {
    const router = useRouter();

    return (
        <div className="border-b border-slate-300 h-16 flex justify-between items-center px-4 fixed w-full">
            <div className="text-xl font-bold">
                MoneyTxn
            </div>
            <div>
                <Button 
                    onClick={() => router.push("/signin")}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    Login
                </Button>
            </div>
        </div>
    );
} 