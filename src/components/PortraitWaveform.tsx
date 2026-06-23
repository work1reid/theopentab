"use client";

import { useEffect, useRef } from "react";

// Naturalistic speech-amplitude pattern (percent heights)
const WAVE = [
  16, 30, 22, 44, 28, 58, 38, 70, 50, 34, 62, 82, 54, 26, 40, 74, 50, 36, 88,
  60, 44, 68, 46, 78, 62, 38, 52, 86, 56, 40, 30, 70, 84, 48, 34, 64, 80, 44,
  38, 66, 54, 28, 46, 72, 58, 32, 50, 68,
];

export default function PortraitWaveform() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bars = Array.from(el.querySelectorAll<HTMLElement>("span"));
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 as it enters the bottom of the viewport, 1 as it exits the top
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      const played = Math.round(p * bars.length);
      bars.forEach((b, i) => b.classList.toggle("q", i >= played));
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

  return (
    <div ref={ref} className="waveform absolute -bottom-5 left-6 right-6">
      {WAVE.map((h, i) => (
        <span key={i} className="q" style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}
