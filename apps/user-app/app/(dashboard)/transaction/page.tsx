import TransactionsPage from "../dashboard/dashboard/TransactionsPage"
import { getTransactions } from "../../lib/actions/transactions"

export default async function () {
    const transactions = await getTransactions();
    return <div className="text-3xl sm:text-4xl font-bold text-[#6a51a6] pt-8 mb-6 sm:mb-10">
        <TransactionsPage transactions={transactions as any} />
    </div>
}