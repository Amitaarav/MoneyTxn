"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAccount } from "../lib/actions/createAccount";
import { ArrowRight, User, Phone, Lock, Shield } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", password: "" });

  const handleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await createAccount(formData.name, formData.phone, formData.password);
      if (res.error) {
        setError(res.error);
      } else {
        router.push("/signin");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full pl-9 pr-4 h-11 text-[14px] text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 placeholder:text-gray-400 transition-colors duration-150";

  return (
    <div className="min-h-screen bg-white flex">

      {/* ── Left panel: branding ── */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] flex-shrink-0 bg-gray-950 p-12 relative overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white text-[11px] font-bold tracking-tight">TXN</span>
          </div>
          <span
            className="text-[18px] font-normal text-white tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Money<span className="text-blue-400">TXN</span>
          </span>
        </div>

        {/* Middle copy */}
        <div className="relative z-10">
          <h2
            className="font-normal text-white leading-[1.08] tracking-tight mb-4"
            style={{ fontFamily: "'Georgia', serif", fontSize: "36px" }}
          >
            Join <em className="italic text-blue-400">50 million</em><br />
            people who trust us.
          </h2>
          <p className="text-[14px] text-gray-500 font-light leading-relaxed">
            Send money to 190+ countries in seconds. Free to sign up, no hidden fees.
          </p>

          {/* Mini proof points */}
          <div className="mt-8 flex flex-col gap-3">
            {["Free account, no credit card needed", "Transfers arrive in ~30 seconds", "Bank-level security from day one"].map((point) => (
              <div key={point} className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span className="text-[13px] text-gray-500 font-light">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 flex items-center gap-2">
          <Shield size={13} className="text-emerald-500" />
          <span className="text-[12px] text-gray-600">256-bit encrypted · Licensed by FinCEN</span>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 relative">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(#e8e8f0 1px, transparent 1px), linear-gradient(90deg, #e8e8f0 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 w-full max-w-[380px]">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white text-[11px] font-bold tracking-tight">TXN</span>
            </div>
            <span
              className="text-[18px] font-normal text-gray-950 tracking-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Money<span className="text-blue-600">TXN</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-blue-600 mb-3">
              Get started
            </p>
            <h1
              className="font-normal text-gray-950 leading-tight tracking-tight"
              style={{ fontFamily: "'Georgia', serif", fontSize: "32px" }}
            >
              Create your free account
            </h1>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">

            {/* Full name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-medium text-gray-700 tracking-tight">
                Full name
              </label>
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-medium text-gray-700 tracking-tight">
                Phone number
              </label>
              <div className="relative">
                <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-medium text-gray-700 tracking-tight">
                Password
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="password"
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-[13px] rounded-xl px-4 py-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSignup}
              disabled={loading}
              className="mt-1 w-full inline-flex items-center justify-center gap-2 bg-gray-950 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[14px] font-medium tracking-tight h-11 rounded-xl transition-all duration-200 hover:shadow-[0_4px_16px_rgba(37,99,235,0.3)] group"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white/70" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating account…
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </>
              )}
            </button>

            {/* Terms note */}
            <p className="text-center text-[11.5px] text-gray-400 leading-relaxed">
              By signing up you agree to our{" "}
              <a href="#" className="text-gray-600 hover:text-gray-900 underline underline-offset-2 transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-gray-600 hover:text-gray-900 underline underline-offset-2 transition-colors">
                Privacy Policy
              </a>.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[12px] text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Sign in link */}
            <p className="text-center text-[13px] text-gray-500">
              Already have an account?{" "}
              <Link href="/signin" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          {/* Security note */}
          <div className="mt-8 flex items-center justify-center gap-1.5">
            <Shield size={11} className="text-gray-300" />
            <span className="text-[11.5px] text-gray-400">Secured with 256-bit encryption</span>
          </div>

        </div>
      </div>
    </div>
  );
}