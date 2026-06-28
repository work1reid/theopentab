"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function MemberGate() {
  const supabase = createClient();
  const router = useRouter();
  const [view, setView] = useState<"waitlist" | "login">("waitlist");

  // shared
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // login-only
  const [password, setPassword] = useState("");
  const [joined, setJoined] = useState(false);

  async function joinWaitlist(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) setMsg(data.error || "Something went wrong — try again.");
      else setJoined(true);
    } catch {
      setMsg("Network error — try again.");
    }
    setLoading(false);
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setMsg(error.message);
    else router.refresh();
    setLoading(false);
  }

  // ── Joined the waitlist ───────────────────────────────────
  if (joined) {
    return (
      <div className="max-w-md border border-signal/60 bg-signal/[0.06] px-6 py-5">
        <p className="font-mono text-[0.72rem] tracking-[0.22em] text-signal uppercase">
          ● You&apos;re on the list
        </p>
        <p className="mt-3 font-display text-lg leading-snug text-bone/90">
          We&apos;ll email{" "}
          <span className="text-signal">{email}</span> the moment the vault
          opens. No spam, no charge until then.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md">
      {view === "waitlist" ? (
        <>
          <form onSubmit={joinWaitlist} className="space-y-4">
            <input
              type="email"
              required
              placeholder="you@something.real"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-edge focus:border-signal transition-colors px-4 py-4 font-mono text-sm text-bone placeholder:text-ghost focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-signal text-ink px-5 py-4 font-mono text-[0.74rem] tracking-[0.22em] uppercase hover:bg-bone transition-colors disabled:opacity-50"
            >
              {loading ? "…" : "Get on the list →"}
            </button>
          </form>
          <p className="mt-5 font-mono text-[0.74rem] tracking-[0.16em] text-ghost uppercase">
            Already a member?{" "}
            <button
              onClick={() => {
                setView("login");
                setMsg(null);
              }}
              className="text-signal hover:text-bone transition-colors"
            >
              Log in
            </button>
          </p>
        </>
      ) : (
        <>
          <form onSubmit={login} className="space-y-4">
            <input
              type="email"
              required
              placeholder="you@something.real"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-edge focus:border-signal transition-colors px-4 py-4 font-mono text-sm text-bone placeholder:text-ghost focus:outline-none"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-edge focus:border-signal transition-colors px-4 py-4 font-mono text-sm text-bone placeholder:text-ghost focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-signal text-ink px-5 py-4 font-mono text-[0.74rem] tracking-[0.22em] uppercase hover:bg-bone transition-colors disabled:opacity-50"
            >
              {loading ? "…" : "Log in →"}
            </button>
          </form>
          <p className="mt-5 font-mono text-[0.74rem] tracking-[0.16em] text-ghost uppercase">
            Not yet?{" "}
            <button
              onClick={() => {
                setView("waitlist");
                setMsg(null);
              }}
              className="text-signal hover:text-bone transition-colors"
            >
              Join the waitlist
            </button>
          </p>
        </>
      )}

      {msg && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 backdrop-blur-sm px-6"
          onClick={() => setMsg(null)}
        >
          <div
            className="relative w-full max-w-md border border-signal bg-ink p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMsg(null)}
              aria-label="Close"
              className="absolute top-3 right-4 font-mono text-lg text-ghost hover:text-signal transition-colors"
            >
              ×
            </button>
            <div className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-signal mb-4">
              ● The Open Tab
            </div>
            <p className="font-display text-xl leading-snug text-bone">{msg}</p>
            <button
              onClick={() => setMsg(null)}
              className="mt-6 bg-signal text-ink px-5 py-3 font-mono text-[0.72rem] tracking-[0.22em] uppercase hover:bg-bone transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
