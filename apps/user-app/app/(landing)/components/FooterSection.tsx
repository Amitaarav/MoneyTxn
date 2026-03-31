"use client";

import { Smartphone, Mail, MapPin } from "lucide-react";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

const services = [
  "Send Money",
  "Receive Money",
  "Track Transfer",
  "Exchange Rates",
  "Business Transfers",
];

const support = [
  "Help Center",
  "Contact Us",
  "Security",
  "Privacy Policy",
  "Terms of Service",
];

const socials = [
  { Icon: FiFacebook, href: "https://www.facebook.com/", hover: "hover:text-blue-400" },
  { Icon: FiTwitter, href: "https://x.com/AmitAarav1205", hover: "hover:text-sky-400" },
  { Icon: FiInstagram, href: "http://instagram.com/amitaarav_8/", hover: "hover:text-pink-400" },
  { Icon: FiLinkedin, href: "https://www.linkedin.com/in/amitkrgupta8", hover: "hover:text-blue-400" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 border-t border-white/[0.06] overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-600/[0.06] blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1180px] mx-auto px-6">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-white/[0.06]">

          {/* Brand */}
          <div className="flex flex-col gap-6">
            <div>
              <span
                className="text-[22px] font-normal text-white tracking-tight"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                MoneyTXN
              </span>
              <p className="text-[13.5px] text-gray-500 mt-3 leading-relaxed font-light">
                The world's most trusted platform for international money transfers.
                Fast, secure, and affordable.
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, hover }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-gray-500 ${hover} transition-colors duration-200`}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-600 mb-5">
              Services
            </p>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[13.5px] text-gray-500 hover:text-white transition-colors duration-150 font-light"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-600 mb-5">
              Support
            </p>
            <ul className="space-y-3">
              {support.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[13.5px] text-gray-500 hover:text-white transition-colors duration-150 font-light"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-600 mb-5">
              Get in touch
            </p>
            <div className="space-y-3">
              {[
                { icon: Smartphone, label: "+1 (555) 123-4567" },
                { icon: Mail, label: "support@moneytxn.com" },
                { icon: MapPin, label: "Uttar Pradesh, India" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center flex-shrink-0">
                    <Icon size={13} className="text-gray-500" />
                  </div>
                  <span className="text-[13px] text-gray-500 font-light">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="text-[12.5px] text-gray-600">
            © 2026 MoneyTXN. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <span className="text-[12.5px] text-gray-600">Licensed & regulated by FinCEN</span>
            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.07] rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]" />
              <span className="text-[12px] text-gray-500">All systems operational</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}