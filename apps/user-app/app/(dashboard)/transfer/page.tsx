import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { MerchantTransferCard } from "../../../components/MerchantTransferCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if(!userId){
            console.error("User Id not found");
        }

        const balance = await prisma.balance.findFirst({
            where: {
                userId: Number(userId)
            }
        });
        return {
            amount: balance?.amount || 0,
            locked: balance?.locked || 0
        }
        
    } catch (error) {
        console.log(error)
        return {
            amount: 0,
            locked: 0
        }   
    }
    
}

async function getOnRampTransactions() {
    try {
        const session = await getServerSession(authOptions);

    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });

    // here t takes types automatically from the prisma schema
    return txns.map((t) => ({
        time: new Date(t.startTime),
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
    } catch (error) {
        console.error("userId does not exist");
        return [];
    }
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="w-full bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold ml-10 ">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
                <div className="mt-4">
                    <MerchantTransferCard />
                </div>
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}