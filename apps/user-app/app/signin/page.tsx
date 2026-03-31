"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input, Button, Label } from "@repo/ui";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowRight, Phone, Lock, Shield } from "lucide-react";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ number: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        phone: formData.number,
        password: formData.password,
      });
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Signed in successfully");
        router.push("/dashboard");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
            Move money <em className="italic text-blue-400">instantly,</em><br />
            anywhere.
          </h2>
          <p className="text-[14px] text-gray-500 font-light leading-relaxed">
            Trusted by 50M+ customers across 190 countries.
          </p>
        </div>

        {/* Bottom trust badge */}
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
              Welcome back
            </p>
            <h1
              className="font-normal text-gray-950 leading-tight tracking-tight"
              style={{ fontFamily: "'Georgia', serif", fontSize: "32px" }}
            >
              Sign in to your account
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="number" className="text-[12.5px] font-medium text-gray-700 tracking-tight">
                Phone number
              </label>
              <div className="relative">
                <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <Input
                  id="number"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.number}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                  required
                  className="pl-9 h-11 text-[14px] text-gray-900 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-[12.5px] font-medium text-gray-700 tracking-tight">
                  Password
                </label>
                <a href="#" className="text-[12px] text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  className="pl-9 h-11 text-[14px] text-gray-900 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full inline-flex items-center justify-center gap-2 bg-gray-950 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[14px] font-medium tracking-tight h-11 rounded-xl transition-all duration-200 hover:shadow-[0_4px_16px_rgba(37,99,235,0.3)] group"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white/70" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[12px] text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Sign up link */}
            <p className="text-center text-[13px] text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Create one free
              </Link>
            </p>

          </form>

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