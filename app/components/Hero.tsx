"use client";

import Link from "next/link";
import { useAuth } from "@/src/lib/auth";

export default function Hero() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-emerald-500/25 blur-3xl rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] bg-cyan-500/25 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-8">
          🚀 Productivity re-imagined
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight text-white">
          Organize your work.
          <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Achieve more daily.
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-white/60">
          TaskFlow helps you manage tasks with clarity, speed, and focus — all in one
          beautifully simple workspace.
        </p>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center">
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-12 py-4 rounded-2xl text-lg font-semibold text-black bg-gradient-to-r from-emerald-400 to-cyan-400 hover:scale-105 transition shadow-xl"
            >
              Open Dashboard →
            </Link>
          ) : (
            <>
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center px-12 py-4 rounded-2xl text-lg font-semibold text-black bg-gradient-to-r from-emerald-400 to-cyan-400 hover:scale-105 transition shadow-xl"
              >
                Get Started Free →
              </Link>

              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center px-12 py-4 rounded-2xl text-lg font-medium border border-white/15 text-white/80 hover:bg-white/10 transition"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Trust line */}
        <p className="mt-10 text-sm text-white/40">
          No credit card required • Fast • Secure • Minimal
        </p>
      </div>
    </section>
  );
}
