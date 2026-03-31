"use client";

import { Shield, Users, Star, Lock, Fingerprint, ActivitySquare, BadgeCheck } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    route: "USA → India",
    rating: 5,
    text: "I've been sending money to my family in India for 2 years. Always fast, always reliable — I don't even think twice anymore.",
    initials: "SJ",
  },
  {
    name: "Carlos Rodriguez",
    route: "Spain → Mexico",
    rating: 5,
    text: "Best exchange rates I've found anywhere. Transfers are instant and the support team actually picks up the phone.",
    initials: "CR",
  },
  {
    name: "Maria Chen",
    route: "Canada → Philippines",
    rating: 5,
    text: "So easy to use. My grandmother receives the money within minutes every single time. That peace of mind is worth everything.",
    initials: "MC",
  },
];

const stats = [
  { icon: Users, value: "50M+", label: "Happy customers" },
  { icon: Shield, value: "99.9%", label: "Success rate" },
  { icon: Star, value: "4.9/5", label: "User rating" },
];

const securityFeatures = [
  { icon: Lock, label: "256-bit SSL encryption" },
  { icon: Fingerprint, label: "Two-factor authentication" },
  { icon: ActivitySquare, label: "Real-time fraud monitoring" },
  { icon: BadgeCheck, label: "Fully licensed & regulated" },
];

export default function TrustSection() {
  const [active, setActive] = useState(0);
  const t = testimonials[active]!;

  return (
    <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(#e8e8f0 1px, transparent 1px), linear-gradient(90deg, #e8e8f0 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/[0.04] blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1180px] mx-auto px-6">

        {/* Header */}
        <div className="max-w-xl mb-20">
          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-blue-600 mb-4">
            Trust & security
          </p>
          <h2
            className="font-normal text-gray-950 mb-5 leading-[1.06] tracking-tight"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: "clamp(36px, 4.5vw, 58px)",
            }}
          >
            Trusted by millions,{" "}
            <em className="italic text-blue-600">built to last.</em>
          </h2>
          <p className="text-[16px] text-gray-400 font-light leading-relaxed">
            Our commitment to security and reliability has made us the world's
            most trusted money transfer platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-4">

            {/* Stat strip */}
            <div className="grid grid-cols-3 border border-gray-200 rounded-2xl overflow-hidden divide-x divide-gray-200">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="bg-white px-6 py-7 flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Icon size={17} className="text-blue-600" />
                  </div>
                  <div>
                    <div
                      className="text-[28px] font-normal text-gray-950 leading-none tracking-tight mb-1"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {value}
                    </div>
                    <div className="text-[12.5px] text-gray-400">{label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Security features card */}
            <div className="border border-gray-200 rounded-2xl bg-white p-8">
              <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray-400 mb-6">
                Security features
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {securityFeatures.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <Icon size={13} className="text-emerald-600" />
                    </div>
                    <span className="text-[13px] font-medium text-gray-700 tracking-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── Right column: Testimonials ── */}
          <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">

            {/* Active testimonial */}
            <div className="p-8 border-b border-gray-100">
              <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray-400 mb-6">
                Customer stories
              </p>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="text-[17px] text-gray-800 leading-relaxed font-light mb-8"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                "{t.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-[12px] font-semibold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="text-[13.5px] font-medium text-gray-900">{t.name}</div>
                  <div className="text-[12px] text-gray-400">{t.route}</div>
                </div>
              </div>
            </div>

            {/* Testimonial tabs */}
            <div className="divide-y divide-gray-100">
              {testimonials.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`w-full flex items-center gap-4 px-8 py-4 text-left transition-colors duration-150 ${
                    index === active ? "bg-gray-50" : "bg-white hover:bg-gray-50/60"
                  }`}
                >
                  {/* Active indicator */}
                  <div
                    className={`w-0.5 h-8 rounded-full flex-shrink-0 transition-colors duration-200 ${
                      index === active ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                  <div className="min-w-0">
                    <div className={`text-[13px] font-medium tracking-tight ${index === active ? "text-gray-900" : "text-gray-400"}`}>
                      {item.name}
                    </div>
                    <div className="text-[12px] text-gray-400">{item.route}</div>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}