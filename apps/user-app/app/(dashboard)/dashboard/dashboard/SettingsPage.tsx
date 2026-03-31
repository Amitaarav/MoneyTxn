'use client';

import { useState } from 'react';
import {
  Bell, Shield, Palette, Globe, Database,
  Download, Trash, AlertTriangle, ChevronRight,
} from 'lucide-react';

const selectClass =
  'w-full h-10 pl-3.5 pr-8 text-[13px] text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-150 appearance-none cursor-pointer';

const labelClass = 'text-[12.5px] font-medium text-gray-700 tracking-tight';

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="px-6 pt-6 pb-4 border-b border-gray-100">
      <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-0.5">{label}</p>
      <h3
        className="text-[15px] font-medium text-gray-950 tracking-tight"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        {title}
      </h3>
    </div>
  );
}

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative w-10 h-5.5 rounded-full flex-shrink-0 transition-colors duration-200 focus:outline-none ${on ? 'bg-blue-600' : 'bg-gray-200'}`}
      style={{ height: '22px', width: '40px' }}
    >
      <span
        className={`absolute top-[3px] w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${on ? 'translate-x-[19px]' : 'translate-x-[3px]'}`}
      />
    </button>
  );
}

function ToggleRow({ label, description, defaultChecked = false }: { label: string; description: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 border-b border-gray-100 last:border-0">
      <div className="min-w-0">
        <p className="text-[13.5px] font-medium text-gray-900 tracking-tight">{label}</p>
        <p className="text-[12px] text-gray-400 font-light mt-0.5">{description}</p>
      </div>
      <Toggle defaultChecked={defaultChecked} />
    </div>
  );
}

function SelectRow({ label, defaultValue, options }: {
  label: string;
  defaultValue: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1.5 py-3.5 border-b border-gray-100 last:border-0">
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <select defaultValue={defaultValue} className={selectClass}>
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronRight size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none rotate-90" />
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="max-w-[1080px] mx-auto px-6 py-8 flex flex-col gap-6">

      {/* ── Page header ── */}
      <div>
        <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-blue-600 mb-2">
          Account
        </p>
        <h1
          className="text-[28px] font-normal text-gray-950 tracking-tight leading-tight mb-1"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Account <em className="italic text-blue-600">settings.</em>
        </h1>
        <p className="text-[14px] text-gray-400 font-light">
          Manage your preferences, privacy, and account data.
        </p>
      </div>

      {/* ── 2-col grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Notifications */}
        <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
          <SectionHeader label="Alerts" title="Notifications" />
          <div className="px-6 pb-2">
            <ToggleRow label="Email notifications"   description="Receive updates via email"              defaultChecked />
            <ToggleRow label="Transaction alerts"    description="Get notified of new transactions"       defaultChecked />
            <ToggleRow label="Budget warnings"       description="Alert when nearing budget limits"       defaultChecked />
            <ToggleRow label="Security alerts"       description="Important security notifications"       defaultChecked />
            <ToggleRow label="Marketing emails"      description="Tips, news and product updates"         />
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
          <SectionHeader label="Security" title="Privacy & security" />
          <div className="px-6 pb-2">
            <SelectRow
              label="Session timeout"
              defaultValue="30"
              options={[
                { value: '15', label: '15 minutes' },
                { value: '30', label: '30 minutes' },
                { value: '60', label: '1 hour' },
                { value: '120', label: '2 hours' },
              ]}
            />
            <ToggleRow label="Data sharing"       description="Share anonymized data for insights"       />
            <ToggleRow label="Location services"  description="Use location for transaction context"     defaultChecked />
          </div>
          <div className="px-6 pb-5">
            <button className="w-full h-10 border border-gray-200 hover:border-gray-400 text-gray-700 hover:text-gray-900 text-[13px] font-medium rounded-xl flex items-center justify-center gap-2 transition-all duration-150">
              <Shield size={14} />
              View login history
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
          <SectionHeader label="Display" title="Appearance" />
          <div className="px-6 pb-5">
            <SelectRow
              label="Theme"
              defaultValue="system"
              options={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'system', label: 'System' },
              ]}
            />
            <SelectRow
              label="Currency"
              defaultValue="usd"
              options={[
                { value: 'usd', label: 'USD ($)' },
                { value: 'eur', label: 'EUR (€)' },
                { value: 'gbp', label: 'GBP (£)' },
                { value: 'inr', label: 'INR (₹)' },
              ]}
            />
            <SelectRow
              label="Date format"
              defaultValue="mm-dd-yyyy"
              options={[
                { value: 'mm-dd-yyyy', label: 'MM/DD/YYYY' },
                { value: 'dd-mm-yyyy', label: 'DD/MM/YYYY' },
                { value: 'yyyy-mm-dd', label: 'YYYY-MM-DD' },
              ]}
            />
          </div>
        </div>

        {/* Language & Region */}
        <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
          <SectionHeader label="Localisation" title="Language & region" />
          <div className="px-6 pb-5">
            <SelectRow
              label="Language"
              defaultValue="en"
              options={[
                { value: 'en', label: 'English' },
                { value: 'hi', label: 'Hindi' },
                { value: 'es', label: 'Spanish' },
                { value: 'fr', label: 'French' },
              ]}
            />
            <SelectRow
              label="Time zone"
              defaultValue="ist"
              options={[
                { value: 'ist',  label: 'IST — India Standard Time' },
                { value: 'est',  label: 'EST — Eastern Time' },
                { value: 'pst',  label: 'PST — Pacific Time' },
                { value: 'utc',  label: 'UTC' },
              ]}
            />
            <SelectRow
              label="Number format"
              defaultValue="in"
              options={[
                { value: 'in', label: '1,23,456.78 (Indian)' },
                { value: 'us', label: '1,234.56 (US)' },
                { value: 'eu', label: '1.234,56 (EU)' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* ── Data management ── */}
      <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
        <SectionHeader label="Data" title="Data management" />
        <div className="p-6 flex flex-col gap-4">

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button className="inline-flex items-center gap-2 h-10 px-4 text-[13px] font-medium text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-400 rounded-xl transition-all duration-150 justify-center">
              <Download size={14} />
              Export data
            </button>
            <button className="inline-flex items-center gap-2 h-10 px-4 text-[13px] font-medium text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-400 rounded-xl transition-all duration-150 justify-center">
              <Database size={14} />
              Backup settings
            </button>
            <button className="inline-flex items-center gap-2 h-10 px-4 text-[13px] font-medium text-red-600 hover:text-red-700 border border-red-100 hover:border-red-300 bg-red-50 rounded-xl transition-all duration-150 justify-center">
              <Trash size={14} />
              Delete account
            </button>
          </div>

          {/* Data retention notice */}
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3.5">
            <AlertTriangle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[13px] font-medium text-amber-800 mb-0.5">Data retention policy</p>
              <p className="text-[12px] text-amber-700 font-light leading-relaxed">
                Your transaction data is stored securely and retained for 7 years as required by financial regulations. You can export your data at any time.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}