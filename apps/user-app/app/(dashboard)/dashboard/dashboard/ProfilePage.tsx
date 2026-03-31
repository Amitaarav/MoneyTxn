'use client';

import {
  User, Mail, Phone, MapPin, Calendar,
  Shield, CreditCard, Edit, Plus, Check, Bell, Lock,
} from 'lucide-react';

const inputClass =
  'w-full px-3.5 h-10 text-[13.5px] text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 placeholder:text-gray-400 transition-colors duration-150';

const labelClass = 'text-[12px] font-medium text-gray-600 tracking-tight';

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="px-6 pt-6 pb-4 border-b border-gray-100">
      <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-0.5">{label}</p>
      <h3 className="text-[15px] font-medium text-gray-950 tracking-tight"
        style={{ fontFamily: "'Georgia', serif" }}>{title}</h3>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-5 p-6 max-w-[1080px]">

      {/* ── Profile header card ── */}
      <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
        {/* Dark top band */}
        <div className="relative bg-gray-950 h-24 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute right-0 top-0 w-64 h-64 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />
        </div>

        <div className="px-8 pb-7 relative">
          {/* Avatar — overlaps band */}
          <div className="relative inline-block -mt-10 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-[22px] font-semibold border-4 border-white shadow-sm"
              style={{ fontFamily: "'Georgia', serif" }}>
              JD
            </div>
            <button className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors">
              <Edit size={12} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2
                className="text-[22px] font-normal text-gray-950 tracking-tight leading-tight mb-1"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                John Doe
              </h2>
              <p className="text-[13px] text-gray-400 font-light mb-3">Premium Member</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[11.5px] font-medium rounded-full px-3 py-1">
                  <Check size={10} /> Verified Account
                </span>
                <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 text-[11.5px] font-medium rounded-full px-3 py-1">
                  <Shield size={10} /> 2FA Enabled
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[12.5px] text-gray-400 font-light">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} className="text-gray-300" />
                Joined Jan 2024
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-gray-300" />
                New York, NY
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2-col grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Personal info */}
        <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
          <SectionHeader label="Account" title="Personal information" />
          <div className="p-6 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>First name</label>
                <div className="relative">
                  <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input defaultValue="John" className={`${inputClass} pl-9`} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Last name</label>
                <input defaultValue="Doe" className={inputClass} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Email address</label>
              <div className="relative">
                <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input type="email" defaultValue="john.doe@email.com" className={`${inputClass} pl-9`} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Phone number</label>
              <div className="relative">
                <Phone size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input defaultValue="+1 (555) 123-4567" className={`${inputClass} pl-9`} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Address</label>
              <div className="relative">
                <MapPin size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input defaultValue="123 Main St, New York, NY 10001" className={`${inputClass} pl-9`} />
              </div>
            </div>

            <button className="mt-1 w-full h-10 bg-gray-950 hover:bg-blue-600 text-white text-[13.5px] font-medium tracking-tight rounded-xl transition-all duration-200 hover:shadow-[0_4px_16px_rgba(37,99,235,0.25)]">
              Save changes
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
          <SectionHeader label="Security" title="Account security" />
          <div className="p-6 flex flex-col gap-3">

            {/* 2FA row */}
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3.5">
              <div>
                <p className="text-[13.5px] font-medium text-emerald-800 tracking-tight">Two-factor authentication</p>
                <p className="text-[12px] text-emerald-600 font-light mt-0.5">Active on your account</p>
              </div>
              <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-semibold rounded-full px-2.5 py-1">
                <Check size={10} /> On
              </span>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Password</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input type="password" value="••••••••••" readOnly className={`${inputClass} pl-9 bg-gray-50 cursor-not-allowed`} />
                </div>
                <button className="h-10 px-4 text-[13px] font-medium text-gray-700 border border-gray-200 hover:border-gray-400 hover:text-gray-900 rounded-xl transition-all duration-150 whitespace-nowrap">
                  Change
                </button>
              </div>
            </div>

            {/* Recovery email */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Recovery email</label>
              <div className="relative">
                <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input defaultValue="recovery@email.com" className={`${inputClass} pl-9`} />
              </div>
            </div>

            {/* Login notifications */}
            <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-xl px-4 py-3.5">
              <div>
                <p className="text-[13.5px] font-medium text-blue-800 tracking-tight">Login notifications</p>
                <p className="text-[12px] text-blue-600 font-light mt-0.5">Alerts on new sign-ins</p>
              </div>
              <Bell size={15} className="text-blue-400" />
            </div>

            <button className="mt-1 w-full h-10 bg-gray-950 hover:bg-blue-600 text-white text-[13.5px] font-medium tracking-tight rounded-xl transition-all duration-200 hover:shadow-[0_4px_16px_rgba(37,99,235,0.25)]">
              Update security
            </button>
          </div>
        </div>
      </div>

      {/* ── Payment methods ── */}
      <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-0.5">Billing</p>
            <h3 className="text-[15px] font-medium text-gray-950 tracking-tight"
              style={{ fontFamily: "'Georgia', serif" }}>Payment methods</h3>
          </div>
          <button className="inline-flex items-center gap-2 text-[12.5px] font-medium text-blue-600 hover:text-blue-700 border border-blue-100 hover:border-blue-300 bg-blue-50 rounded-full px-3.5 py-1.5 transition-colors">
            <Plus size={12} /> Add card
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Card 1 */}
            <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-blue-600 rounded-md" />
                  <span className="text-[14px] font-medium text-gray-900 tracking-tight">•••• 4242</span>
                </div>
                <span className="inline-flex items-center gap-1 bg-gray-950 text-white text-[10.5px] font-semibold rounded-full px-2.5 py-1">
                  Primary
                </span>
              </div>
              <p className="text-[12.5px] text-gray-400 font-light">Visa Debit · Expires 12/26</p>
            </div>

            {/* Card 2 */}
            <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-red-500 rounded-md" />
                  <span className="text-[14px] font-medium text-gray-900 tracking-tight">•••• 8888</span>
                </div>
              </div>
              <p className="text-[12.5px] text-gray-400 font-light">Mastercard Credit · Expires 08/27</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}