"use client";
import Dashboard from "./dashboard/Dashboard";
import Header from "./dashboard/Header";
import ProfilePage from "./dashboard/ProfilePage";
import QuickActions from "./dashboard/QuickActions";
import RecentTransactions from "./dashboard/RecentTransactions";
import SettingsPage from "./dashboard/SettingsPage";
import SpendingChart from "./dashboard/SpendingChart";
import Sidebar from "./dashboard/Sidebar";
import Transaction from "./dashboard/TransactionsPage";
import TransactionsPage from "./dashboard/TransactionsPage";
import DashboardContent from "./dashboard/DashboardContent";
export default function DashboardPage() {
    const handleMenuClick = () => {
        console.log("Menu Clicked");
    };
    return (
        <div className="text-3xl sm:text-4xl font-bold text-[#6a51a6] pt-8 mb-6 sm:mb-10">
            <div>
                <DashboardContent/>
            </div>
        </div>
    )
}