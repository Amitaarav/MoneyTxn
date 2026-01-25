import DashboardContent from "./dashboard/DashboardContent";
import { getDashboardData } from "../../lib/actions/dashboardData";

export default async function DashboardPage() {
    const data = await getDashboardData();

    return (
        <div className="mt-6 text-3xl sm:text-4xl font-bold text-[#6a51a6] pt-8 mb-6 sm:mb-10">
            <div>
                <DashboardContent
                    balance={data.balance}
                    recentTransactions={data.recentTransactions}
                    spendingStats={data.spendingStats}
                />
            </div>
        </div>
    )
}