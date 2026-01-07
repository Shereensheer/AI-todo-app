"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/src/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch (err) {
      // Error is handled by the store
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950 flex items-center justify-center relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Frosted glass login card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-10">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-center mb-6">
          Sign in to TaskFlow
        </h2>

        {error && (
          <div className="bg-red-600/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full px-5 py-3 rounded-xl bg-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-white/20 transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full px-5 py-3 rounded-xl bg-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-white/20 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 font-semibold text-white hover:scale-105 transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/70">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-cyan-400 hover:text-emerald-400 transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
