"use client";

import Link from "next/link";
import { useAuth } from "@/src/lib/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50">
      <nav className="relative bg-black/40 backdrop-blur-xl border-b border-white/10">
        {/* Glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-teal-500/10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-white tracking-wide">
                TaskFlow
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink href="/">Home</NavLink>

              {isAuthenticated ? (
                <>
                  <NavLink href="/dashboard">Dashboard</NavLink>
                  <span className="text-sm text-white/50">
                    {user?.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-red-400 hover:text-red-300 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink href="/auth/login">Login</NavLink>
                  <Link
                    href="/auth/signup"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold hover:scale-105 transition"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-6 mb-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 p-4 space-y-3">
            <MobileLink href="/" onClick={() => setMobileOpen(false)}>
              Home
            </MobileLink>

            {isAuthenticated ? (
              <>
                <MobileLink
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </MobileLink>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="w-full text-left text-red-400 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <MobileLink
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </MobileLink>
                <MobileLink
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign Up
                </MobileLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

/* ---------- Helpers ---------- */

function NavLink({ href, children }: any) {
  return (
    <Link
      href={href}
      className="relative text-sm font-medium text-white/80 hover:text-white transition after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-emerald-400 after:to-cyan-400 hover:after:w-full after:transition-all"
    >
      {children}
    </Link>
  );
}

function MobileLink({ href, children, onClick }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block text-white/90 font-medium py-2"
    >
      {children}
    </Link>
  );
}
