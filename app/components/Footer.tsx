"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-black to-cyan-950 text-white">
      {/* Soft glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-120px] w-80 h-80 bg-black rounded-full blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              TaskFlow
            </h2>
            <p className="mt-4 text-white/70 max-w-sm text-sm leading-relaxed">
              A modern task management platform built to help you focus, stay
              organized, and achieve more every day.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">
              Product
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/features" className="text-white/60 hover:text-white transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-white/60 hover:text-white transition">
                  Get Started
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-white/60 hover:text-white transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-white/60 hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} TodoApp. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
