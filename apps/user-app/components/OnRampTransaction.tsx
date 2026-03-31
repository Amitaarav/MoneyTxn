import { ArrowDownLeft, Clock, CheckCircle2, XCircle, MoreHorizontal } from "lucide-react";

interface OnRampTransaction {
  time: Date;
  amount: number;
  status: string;
  provider: string;
}

const statusConfig = (status: string) => {
  switch (status) {
    case "Success":
      return {
        iconBg:    "bg-emerald-50 border-emerald-100",
        iconColor: "text-emerald-600",
        badgeBg:   "bg-emerald-50 border-emerald-100 text-emerald-700",
        Icon:      CheckCircle2,
      };
    case "Failure":
      return {
        iconBg:    "bg-rose-50 border-rose-100",
        iconColor: "text-rose-500",
        badgeBg:   "bg-rose-50 border-rose-100 text-rose-600",
        Icon:      XCircle,
      };
    default:
      return {
        iconBg:    "bg-amber-50 border-amber-100",
        iconColor: "text-amber-500",
        badgeBg:   "bg-amber-50 border-amber-100 text-amber-600",
        Icon:      Clock,
      };
  }
};

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: OnRampTransaction[];
}) => {
  if (!transactions.length) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center px-6">
        <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
          <Clock size={16} className="text-gray-400" />
        </div>
        <p
          className="text-[15px] font-normal text-gray-950 tracking-tight mb-1"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          No payments yet
        </p>
        <p className="text-[12.5px] text-gray-400 font-light">
          Your on-ramp transaction history will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {transactions.map((t, i) => {
        const { iconBg, iconColor, badgeBg, Icon } = statusConfig(t.status);

        return (
          <div
            key={i}
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/60 transition-colors duration-150 group"
          >
            {/* Left: icon + provider + date */}
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border flex-shrink-0 ${iconBg}`}>
                <ArrowDownLeft size={15} className={iconColor} />
              </div>
              <div className="min-w-0">
                <p className="text-[13.5px] font-medium text-gray-900 tracking-tight truncate">
                  {t.provider}
                </p>
                <p className="text-[12px] text-gray-400 font-light mt-0.5">
                  {new Date(t.time).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Right: amount + status + menu */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-right">
                <p className="text-[14px] font-medium text-emerald-600 tracking-tight">
                  +₹{(t.amount / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <span className={`inline-flex items-center gap-1 text-[11px] font-medium border rounded-full px-2.5 py-0.5 mt-1 ${badgeBg}`}>
                  <Icon size={10} />
                  {t.status}
                </span>
              </div>

              <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-150">
                <MoreHorizontal size={13} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};