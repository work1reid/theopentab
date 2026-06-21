"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function MemberAuth() {
  const supabase = createClient();
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/members`,
        },
      });
      if (error) setMsg(error.message);
      else if (!data.session) {
        // Email confirmation is required — no session yet.
        setMsg(
          "✓ Account created. Check your email and click the confirmation link, then come back and log in."
        );
        setMode("login");
      } else {
        // Confirmation is off — session is live now.
        router.refresh();
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setMsg(error.message);
      else router.refresh();
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md">
      <div className="flex gap-6 font-mono text-[0.74rem] tracking-[0.22em] uppercase mb-6">
        <button
          onClick={() => setMode("signup")}
          className={mode === "signup" ? "text-signal" : "text-ghost"}
        >
          Create account
        </button>
        <button
          onClick={() => setMode("login")}
          className={mode === "login" ? "text-signal" : "text-ghost"}
        >
          Log in
        </button>
      </div>

      <form onSubmit={submit} className="space-y-4">
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
          placeholder="password (6+ characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent border border-edge focus:border-signal transition-colors px-4 py-4 font-mono text-sm text-bone placeholder:text-ghost focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-signal text-ink px-5 py-4 font-mono text-[0.74rem] tracking-[0.22em] uppercase hover:bg-bone transition-colors disabled:opacity-50"
        >
          {loading
            ? "…"
            : mode === "signup"
            ? "Create account →"
            : "Log in →"}
        </button>
      </form>

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
