import { UserPlus, CreditCard, Send, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Sign Up",
    description: "Create your free account in just 2 minutes with basic identity verification.",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Add Payment Method",
    description: "Securely link your bank account, debit card, or digital wallet.",
  },
  {
    icon: Send,
    step: "03",
    title: "Send Money",
    description: "Enter recipient details and amount, then hit send. Done.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Money Delivered",
    description: "Your recipient receives funds instantly — anywhere in the world.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
      {/* Subtle grid background — consistent with hero */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(#e8e8f0 1px, transparent 1px), linear-gradient(90deg, #e8e8f0 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-600/[0.04] blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1180px] mx-auto px-6">

        {/* Header */}
        <div className="max-w-xl mb-20">
          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-blue-600 mb-4">
            How it works
          </p>
          <h2
            className="font-normal text-gray-950 mb-5 leading-[1.06] tracking-tight"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: "clamp(36px, 4.5vw, 58px)",
            }}
          >
            Four steps to send <em className="italic text-blue-600">anywhere.</em>
          </h2>
          <p className="text-[16px] text-gray-400 font-light leading-relaxed">
            International transfers used to be complicated. We made them as simple as sending a text.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden mb-8">
          {steps.map(({ icon: Icon, step, title, description }, index) => (
            <div
              key={index}
              className="relative bg-white p-8 group hover:bg-gray-50/80 transition-colors duration-200 flex flex-col gap-6"
            >
              {/* Step number — top right */}
              <span
                className="absolute top-6 right-7 text-[11px] font-semibold tracking-[0.06em] text-gray-300"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {step}
              </span>

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                <Icon size={20} className="text-blue-600" />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="text-[15px] font-medium text-gray-900 tracking-tight">{title}</h3>
                <p className="text-[13.5px] text-gray-400 leading-relaxed font-light">{description}</p>
              </div>

              {/* Arrow connector — desktop only, not on last */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-8 -right-3 z-10 w-6 h-6 rounded-full bg-white border border-gray-200 items-center justify-center shadow-sm">
                  <ArrowRight size={11} className="text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer badge */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.2)]" />
            <span className="text-[13px] font-medium text-gray-500">
              Average transfer time: <span className="text-gray-900">30 seconds</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}