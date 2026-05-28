"use client";

import { useState } from "react";

export default function MembersPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="relative scanlines vignette min-h-[80vh]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-10 md:pt-14 pb-24">
        <div className="flex items-center justify-between font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase reveal">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-signal rounded-full animate-flicker" />
              Members
            </span>
            <span>Locked · 2026</span>
          </div>
          <span>Access pending</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-12 md:mt-16">
          {/* Locked badge */}
          <div className="md:col-span-4">
            <div className="aspect-square border border-edge p-8 flex flex-col justify-between relative overflow-hidden scanlines">
              <div className="flex items-center justify-between font-mono text-[0.72rem] tracking-[0.22em] text-ghost uppercase">
                <span>● Sealed</span>
                <span>VLT</span>
              </div>

              <div className="flex items-center justify-center my-12">
                {/* Lock glyph */}
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-signal"
                >
                  <rect
                    x="14"
                    y="34"
                    width="52"
                    height="38"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M24 34V22a16 16 0 0132 0v12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="52"
                    r="3"
                    fill="currentColor"
                  />
                  <line
                    x1="40"
                    y1="55"
                    x2="40"
                    y2="62"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <div className="text-center">
                <div className="font-display italic text-2xl text-bone">
                  vault.
                </div>
                <div className="mt-2 font-mono text-[0.72rem] tracking-[0.22em] text-ghost uppercase">
                  Coming Q3 2026
                </div>
              </div>
            </div>
          </div>

          {/* Copy + waitlist */}
          <div className="md:col-span-8">
            <h1 className="font-display font-black tracking-tightest leading-[0.86] text-display-sm reveal">
              <span className="block">The other</span>
              <span className="block italic text-signal font-normal">conversation.</span>
            </h1>

            <p className="mt-8 font-display text-xl md:text-2xl leading-snug text-bone/85 tracking-snug max-w-2xl reveal reveal-2">
              A second tape. Always longer. Often heavier. Not for everyone.
            </p>

            <p className="mt-6 font-mono text-sm md:text-base text-ghost leading-relaxed max-w-xl reveal reveal-3">
              Members get the unreleased cuts, raw interview tapes, the
              questions I didn't ask on air, and early access to every
              episode before it drops publicly. Limited spots. Launching
              with the second season.
            </p>

            <div className="mt-12 max-w-md reveal reveal-4">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <label className="block">
                    <span className="font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase mb-3 block">
                      Join the waitlist
                    </span>
                    <div className="relative flex items-center gap-0 border border-edge focus-within:border-signal transition-colors">
                      <input
                        type="email"
                        required
                        placeholder="you@something.real"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 bg-transparent px-4 py-4 font-mono text-sm text-bone placeholder:text-ghost focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="bg-signal text-ink px-5 py-4 font-mono text-[0.74rem] tracking-[0.22em] uppercase hover:bg-bone transition-colors"
                      >
                        Request →
                      </button>
                    </div>
                  </label>
                  <p className="font-mono text-[0.78rem] text-ghost leading-relaxed">
                    No spam. One email when the vault opens. That's it.
                  </p>
                </form>
              ) : (
                <div className="border border-signal p-6">
                  <div className="font-mono text-[0.74rem] tracking-[0.22em] text-signal uppercase mb-3">
                    ● Request received
                  </div>
                  <p className="font-display text-2xl leading-snug">
                    You're on the list, <span className="italic">{email}</span>.
                  </p>
                  <p className="mt-4 font-mono text-sm text-ghost leading-relaxed">
                    I'll write to you when the vault opens. Until then —
                    listen to the show.
                  </p>
                </div>
              )}
            </div>

            {/* What you get */}
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  k: "01",
                  h: "Raw tapes",
                  d: "Full unedited interviews. Every pause, every tangent.",
                },
                {
                  k: "02",
                  h: "Pre-release",
                  d: "Every episode 48 hours before public drop.",
                },
                {
                  k: "03",
                  h: "B-sides",
                  d: "The questions I didn't ask, written up after.",
                },
              ].map((b) => (
                <div
                  key={b.k}
                  className="border border-edge p-5 hover:border-signal transition-colors"
                >
                  <div className="font-display italic text-4xl text-signal/40 leading-none">
                    {b.k}
                  </div>
                  <div className="mt-6 font-display text-xl leading-tight">
                    {b.h}
                  </div>
                  <p className="mt-3 font-mono text-[0.8rem] text-ghost leading-relaxed">
                    {b.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
