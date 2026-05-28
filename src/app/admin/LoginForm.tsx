"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return;
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErr(data.error || "Login failed");
        setBusy(false);
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setErr("Network error");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block">
        <span className="font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-3 block">
          Passphrase
        </span>
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent border border-edge focus:border-signal px-4 py-4 font-mono text-sm text-bone placeholder:text-ghost focus:outline-none transition-colors"
          placeholder="•••••••••••"
          disabled={busy}
        />
      </label>

      {err && (
        <div className="border border-signal/40 bg-signal/10 px-4 py-3 font-mono text-xs text-signal">
          {err}
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full bg-signal text-ink py-4 font-mono text-[0.65rem] tracking-[0.22em] uppercase hover:bg-bone transition-colors disabled:opacity-50"
      >
        {busy ? "Authorising…" : "Enter the Studio →"}
      </button>
    </form>
  );
}
