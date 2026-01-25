import { SendMoneyCard } from "../../../components/SendMoneyCard";

export default function P2PPage() {
    return (
        <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 pt-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-[#6a51a6] mb-8">P2P Transfer</h1>
                <div className="grid grid-cols-1 gap-6">
                    <SendMoneyCard />
                    {/* We can add P2P specific history here later if needed */}
                </div>
            </div>
        </div>
    )
}