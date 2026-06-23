"use client";

import { useEffect, useRef } from "react";

// Speech-amplitude pattern for the full-width scrubber
const BARS = [
  20, 38, 28, 52, 34, 64, 44, 76, 56, 40, 68, 86, 60, 32, 48, 80, 56, 42, 90,
  66, 50, 74, 52, 84, 68, 44, 58, 88, 62, 46, 36, 76, 90, 54, 40, 70, 84, 50,
  44, 72, 60, 34, 52, 78, 64, 38, 56, 74, 48, 30, 62, 82, 58, 42, 68, 88, 52,
  38, 66, 80, 46, 34, 60, 72, 54, 44, 76, 62, 36, 50, 70, 58,
];

export default function ScrollProgress() {
  const brightRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const pct = Math.round(p * 100);
      if (brightRef.current)
        brightRef.current.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      if (headRef.current) headRef.current.style.left = `${pct}%`;
      if (pctRef.current) pctRef.current.textContent = `${pct}%`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const bars = BARS.map((h, i) => (
    <span key={i} style={{ height: `${h}%` }} className="flex-1 rounded-[1px]" />
  ));

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-edge bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-11 max-w-[1600px] items-center gap-4 px-4 md:px-10">
        <span className="hidden shrink-0 font-condensed text-xs tracking-wider text-signal sm:block">
          ▶ Now playing
        </span>
        <div className="relative h-6 flex-1">
          {/* dim track */}
          <div className="absolute inset-0 flex items-center gap-[2px] [&>span]:bg-signal/20">
            {bars}
          </div>
          {/* bright, clipped to scroll progress */}
          <div
            ref={brightRef}
            className="absolute inset-0 flex items-center gap-[2px] [&>span]:bg-signal"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            {bars}
          </div>
          {/* playhead */}
          <div
            ref={headRef}
            className="absolute bottom-0 top-0 w-px bg-signal shadow-[0_0_8px_rgba(108,182,255,0.8)]"
            style={{ left: "0%" }}
          />
        </div>
        <span
          ref={pctRef}
          className="w-9 shrink-0 text-right font-mono text-[0.7rem] tracking-widest text-ghost"
        >
          0%
        </span>
      </div>
    </div>
  );
}
