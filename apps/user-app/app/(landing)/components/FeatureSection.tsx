import { Globe, Clock, Users, CreditCard, Smartphone, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Global Reach",
    description: "Send money to 190+ countries with competitive, real-time exchange rates.",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Clock,
    title: "24/7 Service",
    description: "Transfer money anytime, anywhere. Our infrastructure never sleeps.",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Users,
    title: "Trusted by Millions",
    description: "Over 50 million customers move their money with us every month.",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: CreditCard,
    title: "Multiple Payment Options",
    description: "Bank transfer, debit card, credit card, or digital wallet — your choice.",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Our app makes sending money as effortless as sending a message.",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Support",
    description: "Award-winning support team available whenever you need help.",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative bg-gray-950 py-24 lg:py-32 overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1180px] mx-auto px-6">

        {/* Header */}
        <div className="max-w-xl mb-20">
          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-blue-400 mb-4">
            Why choose us
          </p>
          <h2
            className="font-normal text-white mb-5 leading-[1.06] tracking-tight"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: "clamp(36px, 4.5vw, 58px)",
            }}
          >
            Built for speed,{" "}
            <em className="italic text-blue-400">trust,</em>{" "}
            and scale.
          </h2>
          <p className="text-[16px] text-gray-400 font-light leading-relaxed">
            Every feature is designed to make international money movement faster,
            safer, and more transparent.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden">
          {features.map(({ icon: Icon, title, description, iconBg, iconColor }, index) => (
            <div
              key={index}
              className="relative bg-gray-950 p-8 group hover:bg-white/[0.03] transition-colors duration-200 flex flex-col gap-5"
            >
              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center`}>
                <Icon size={19} className={iconColor} />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="text-[15px] font-medium text-white tracking-tight">{title}</h3>
                <p className="text-[13.5px] text-gray-500 leading-relaxed font-light">{description}</p>
              </div>

              {/* Subtle hover border accent */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-blue-500/0 group-hover:bg-blue-500/20 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom stat strip */}
        <div className="mt-px grid grid-cols-3 border border-white/[0.08] border-t-0 rounded-b-2xl overflow-hidden divide-x divide-white/[0.06] bg-white/[0.02]">
          {[
            { value: "190+", label: "Countries supported" },
            { value: "50M+", label: "Customers worldwide" },
            { value: "99.9%", label: "Uptime guaranteed" },
          ].map(({ value, label }) => (
            <div key={label} className="px-8 py-6 flex flex-col gap-1">
              <span
                className="text-[28px] font-normal text-white tracking-tight leading-none"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {value}
              </span>
              <span className="text-[12.5px] text-gray-500">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}