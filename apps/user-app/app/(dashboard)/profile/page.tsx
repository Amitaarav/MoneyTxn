import { getUserProfile } from "../../lib/actions/getUserProfile";
import { User, Phone, Mail, Calendar, ShieldCheck, CreditCard, Fingerprint, ArrowUpRight } from "lucide-react";
import { BalanceCard } from "../../../components/BalanceCard";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-3">
      {children}
    </p>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray-400">{label}</p>
      <p className="text-[14.5px] font-medium text-gray-900 tracking-tight">{value}</p>
    </div>
  );
}

const securityItems = [
  { icon: Fingerprint, title: "Biometric authentication", status: "Inactive" },
  { icon: ShieldCheck,  title: "Two-step verification",   status: "Active"   },
  { icon: CreditCard,   title: "Transaction PIN",          status: "Set"      },
];

export default async function ProfilePage() {
  const profile = await getUserProfile();

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-sm">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <User size={20} className="text-gray-400" />
          </div>
          <h2
            className="text-[20px] font-normal text-gray-950 mb-2 tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Session expired
          </h2>
          <p className="text-[14px] text-gray-400 font-light">Please sign in again to view your profile.</p>
        </div>
      </div>
    );
  }

  const initials = profile.name
    ? profile.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-8 flex flex-col gap-6">

      {/* ── Profile header ── */}
      <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
        {/* Dark top band */}
        <div className="relative bg-gray-950 h-24 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute right-0 top-0 w-64 h-64 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />
        </div>

        <div className="px-8 pb-7 relative">
          {/* Avatar overlapping band */}
          <div className="relative inline-block -mt-10 mb-4">
            <div
              className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-[22px] font-semibold border-4 border-white shadow-sm"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {initials}
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-emerald-500 border-2 border-white rounded-xl flex items-center justify-center">
              <ShieldCheck size={13} className="text-white" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1
                className="text-[24px] font-normal text-gray-950 tracking-tight leading-tight mb-1"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {profile.name}
              </h1>
              <p className="text-[13px] text-gray-400 font-light mb-3">Premium Member</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[11.5px] font-medium rounded-full px-3 py-1">
                  <ShieldCheck size={10} /> Verified
                </span>
                <span className="inline-flex items-center gap-1.5 bg-gray-100 border border-gray-200 text-gray-600 text-[11.5px] font-medium rounded-full px-3 py-1">
                  <Calendar size={10} /> Since March 2024
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ── Left: identity + security ── */}
        <div className="lg:col-span-7 flex flex-col gap-5">

          {/* Account Identity */}
          <div>
            <SectionLabel>Account identity</SectionLabel>
            <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                <div className="p-6 flex flex-col gap-5">
                  <InfoRow label="Full name"      value={profile.name}  />
                  <InfoRow label="Email contact"  value={profile.email} />
                </div>
                <div className="p-6 flex flex-col gap-5">
                  <InfoRow label="Phone"          value={profile.number} />
                  <InfoRow label="Recovery mobile" value={`+91 ••••••${profile.number.slice(-2)}`} />
                </div>
              </div>

              {/* Onboarding date footer */}
              <div className="border-t border-gray-100 px-6 py-4 flex items-center gap-3 bg-gray-50/60">
                <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <Calendar size={13} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.07em] uppercase text-gray-400">Onboarding date</p>
                  <p className="text-[13px] font-medium text-gray-700 font-mono">24-03-2024 · 14:22 IST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security framework */}
          <div>
            <SectionLabel>Security</SectionLabel>
            <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden divide-y divide-gray-100">
              {securityItems.map(({ icon: Icon, title, status }) => {
                const isActive = status === "Active" || status === "Set";
                return (
                  <div
                    key={title}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/60 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-white group-hover:border group-hover:border-gray-200 flex items-center justify-center transition-all">
                        <Icon size={15} className="text-gray-500 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <span className="text-[13.5px] font-medium text-gray-800 tracking-tight">{title}</span>
                    </div>
                    <span className={`text-[11px] font-semibold tracking-[0.06em] uppercase rounded-full px-2.5 py-1 ${
                      isActive
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "bg-gray-100 text-gray-400 border border-gray-200"
                    }`}>
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Right: balance + upgrade ── */}
        <div className="lg:col-span-5 flex flex-col gap-5">

          <div>
            <SectionLabel>Financial summary</SectionLabel>
            <BalanceCard amount={profile.balance} locked={profile.locked} />
          </div>

          {/* Upgrade card */}
          <div className="relative bg-gray-950 border border-white/[0.06] rounded-2xl p-7 overflow-hidden">
            {/* Dot grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.07]"
              style={{
                backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10">
              <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-blue-400 mb-3">
                Pro plan
              </p>
              <h4
                className="text-[20px] font-normal text-white tracking-tight mb-3 leading-tight"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Upgrade to <em className="italic text-blue-400">Pro.</em>
              </h4>
              <p className="text-[13px] text-gray-500 font-light leading-relaxed mb-6">
                Higher limits, personal account manager, and zero fees on P2P transfers.
              </p>

              <ul className="flex flex-col gap-2 mb-6">
                {["Higher transaction limits", "Zero P2P processing fees", "Dedicated account manager"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[12.5px] text-gray-400 font-light">
                    <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-[13.5px] font-medium tracking-tight rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(37,99,235,0.3)] group">
                Start free trial
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}