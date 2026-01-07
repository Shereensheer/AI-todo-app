"use client";

import { JSX } from "react";

const gradientMap = {
  emerald: "from-emerald-400 to-emerald-600",
  teal: "from-teal-400 to-teal-600",
  cyan: "from-cyan-400 to-cyan-600",
} as const;

type GradientKey = keyof typeof gradientMap;

export default function Features() {
  const features: {
    title: string;
    description: string;
    gradient: GradientKey;
    icon: JSX.Element;
  }[] = [
    {
      title: "Task Management",
      description:
        "Create, edit, and organize tasks efficiently with powerful controls.",
      gradient: "emerald",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
        />
      ),
    },
    {
      title: "Secure Login",
      description:
        "Industry-standard authentication keeps your data protected.",
      gradient: "teal",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 11c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"
        />
      ),
    },
    {
      title: "Progress Tracking",
      description:
        "Visual completion states help you stay productive.",
      gradient: "cyan",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      ),
    },
    {
      title: "Responsive Design",
      description:
        "Seamless experience across desktop, tablet, and mobile.",
      gradient: "emerald",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7h18M3 12h18M3 17h18"
        />
      ),
    },
    {
      title: "Modern UI",
      description:
        "Minimal, fast, and intuitive interface.",
      gradient: "teal",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      ),
    },
    {
      title: "Data Privacy",
      description:
        "Your tasks stay private and securely isolated.",
      gradient: "cyan",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 1a10 10 0 00-7 17l7 7 7-7a10 10 0 00-7-17z"
        />
      ),
    },
  ];

  return (
    <section className="relative py-28 bg-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/20 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-widest text-cyan-400">
            Features
          </p>
          <h2 className="mt-3 text-4xl font-extrabold text-white">
            Everything you need to stay focused
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/60">
            Powerful tools designed for productivity, clarity, and speed.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Glow line */}
              <span
                className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${
                  gradientMap[f.gradient]
                } opacity-0 group-hover:opacity-100 transition`}
              />

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${
                  gradientMap[f.gradient]
                } mb-6 shadow-lg`}
              >
                <svg
                  className="w-7 h-7 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {f.icon}
                </svg>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
