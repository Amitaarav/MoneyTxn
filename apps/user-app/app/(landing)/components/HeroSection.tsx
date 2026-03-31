"use client";

import { ArrowRight, Shield, Zap, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const children = el.querySelectorAll("[data-animate]");
    children.forEach((child, i) => {
      setTimeout(() => {
        (child as HTMLElement).style.opacity = "1";
        (child as HTMLElement).style.transform = "translateY(0) scale(1)";
      }, i * 100);
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center bg-white overflow-hidden py-20 lg:py-28"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(#e8e8f0 1px, transparent 1px), linear-gradient(90deg, #e8e8f0 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full bg-blue-600/[0.07] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-32 w-[400px] h-[400px] rounded-full bg-blue-400/[0.05] blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1180px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Left: Copy ── */}
          <div className="flex flex-col">

            {/* Trust badge */}
            <div
              data-animate
              style={{ opacity: 0, transform: "translateY(12px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
              className="inline-flex items-center gap-2 self-start bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 mb-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.2)]" />
              <span className="text-[13px] font-medium text-gray-500 tracking-tight">
                Trusted by 2M+ users worldwide
              </span>
              <span className="bg-blue-600 text-white text-[11px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5">
                Licensed
              </span>
            </div>

            {/* Heading — Georgia for editorial serif feel */}
            <h1
              data-animate
              style={{
                opacity: 0,
                transform: "translateY(16px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "clamp(44px, 6.5vw, 84px)",
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
              }}
              className="font-normal text-gray-950 mb-7"
            >
              Send money{" "}
              <em className="text-blue-600">instantly,</em>
              <br />
              anywhere.
            </h1>

            {/* Subtext */}
            <p
              data-animate
              style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
              className="text-[17px] leading-relaxed text-gray-400 font-light max-w-[520px] mb-11"
            >
              Fast, secure transfers to 190+ countries. No hidden fees, no
              delays — your money moves the moment you send it.
            </p>

            {/* CTAs */}
            <div
              data-animate
              style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
              className="flex flex-col sm:flex-row gap-3 mb-16"
            >
              <button
                onClick={() => router.push("/signup")}
                className="inline-flex items-center justify-center gap-2.5 bg-gray-950 hover:bg-blue-600 text-white text-[15px] font-medium tracking-tight px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(37,99,235,0.25)] group"
              >
                Send Money Now
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 text-[15px] font-normal tracking-tight px-7 py-3.5 rounded-full border border-gray-200 hover:border-gray-400 transition-all duration-200 hover:-translate-y-0.5">
                Track a Transfer
              </button>
            </div>

            {/* Feature stat cells */}
            <div
              data-animate
              style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
              className="grid grid-cols-3 border border-gray-200 rounded-2xl overflow-hidden divide-x divide-gray-200"
            >
              <div className="bg-white p-5 flex flex-col gap-1">
                <div className="w-9 h-9 rounded-[10px] bg-emerald-50 flex items-center justify-center mb-2">
                  <Zap size={17} className="text-emerald-500" />
                </div>
                <div className="text-[13px] font-medium text-gray-900 tracking-tight">Instant</div>
                <div className="text-[12px] text-gray-400 leading-snug">Arrives in seconds</div>
              </div>
              <div className="bg-white p-5 flex flex-col gap-1">
                <div className="w-9 h-9 rounded-[10px] bg-blue-50 flex items-center justify-center mb-2">
                  <Shield size={17} className="text-blue-600" />
                </div>
                <div className="text-[13px] font-medium text-gray-900 tracking-tight">Secure</div>
                <div className="text-[12px] text-gray-400 leading-snug">256-bit encryption</div>
              </div>
              <div className="bg-white p-5 flex flex-col gap-1">
                <div className="w-9 h-9 rounded-[10px] bg-amber-50 flex items-center justify-center mb-2">
                  <DollarSign size={17} className="text-amber-500" />
                </div>
                <div className="text-[13px] font-medium text-gray-900 tracking-tight">Low Fees</div>
                <div className="text-[12px] text-gray-400 leading-snug">From just $2.99</div>
              </div>
            </div>
          </div>

          {/* ── Right: Transfer preview card ── */}
          <div
            data-animate
            style={{ opacity: 0, transform: "translateY(20px) scale(0.98)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
          >
            <div className="bg-white border border-gray-200 rounded-[20px] p-7 shadow-[0_2px_40px_rgba(10,10,15,0.06),0_0_0_0.5px_rgba(10,10,15,0.04)]">

              <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray-400 mb-5">
                Quick Transfer
              </p>

              {/* Amount display */}
              <div
                className="text-[52px] font-normal leading-none text-gray-950 mb-1"
                style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.04em" }}
              >
                $1,250.00
              </div>
              <p className="text-[13px] text-gray-400 mb-6">≈ ₹1,04,025.00 INR</p>

              {/* Route row */}
              <div className="flex items-center gap-2.5 mb-6">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3.5 py-2 text-[13px] font-medium text-gray-900 flex-1 min-w-0">
                  🇺🇸 <span className="truncate">United States</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <ArrowRight size={13} className="text-gray-400" />
                </div>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3.5 py-2 text-[13px] font-medium text-gray-900 flex-1 min-w-0">
                  🇮🇳 <span className="truncate">India</span>
                </div>
              </div>

              {/* Rate rows */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                  <span className="text-[13px] text-gray-400">Exchange rate</span>
                  <span className="text-[13px] font-medium text-gray-900">1 USD = 83.22 INR</span>
                </div>
                <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                  <span className="text-[13px] text-gray-400">Transfer fee</span>
                  <span className="text-[13px] font-medium text-emerald-500">$2.99</span>
                </div>
                <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                  <span className="text-[13px] text-gray-400">Estimated arrival</span>
                  <span className="text-[13px] font-medium text-gray-900">~30 seconds</span>
                </div>
              </div>

              {/* Send CTA */}
              <button
                onClick={() => router.push("/signup")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-medium tracking-tight py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)]"
              >
                Send $1,250.00
                <ArrowRight size={15} />
              </button>

              {/* Security note */}
              <p className="text-center text-[12px] text-gray-400 mt-4 flex items-center justify-center gap-1.5">
                <Shield size={11} className="text-gray-300" />
                Secured with 256-bit encryption
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}