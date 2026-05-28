"use client";

import { useEffect, useRef, useState } from "react";
import OnAirIndicator from "./OnAirIndicator";

const clips = ["/hero/hero-1.mp4", "/hero/hero-2.mp4"];

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onEnded = () => setIdx((i) => (i + 1) % clips.length);
    v.addEventListener("ended", onEnded);
    return () => v.removeEventListener("ended", onEnded);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  }, [idx]);

  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden scanlines">
      {/* Video layer */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={clips[idx]}
        poster="/hero/hero-poster.jpg"
        autoPlay
        muted
        playsInline
        preload="auto"
      />

      {/* Tints for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
      <div className="absolute inset-0 bg-ink/30" />

      {/* Top meta row */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-20 md:pt-24 flex items-center justify-between font-mono text-[0.6rem] md:text-[0.62rem] tracking-[0.22em] text-bone/70 uppercase">
          <div className="flex items-center gap-4 md:gap-6">
            <OnAirIndicator variant="hero" />
            <span className="hidden sm:inline">Forbes · NSW</span>
          </div>
          <span className="hidden md:inline">FRQ 89.7 · Stereo</span>
        </div>
      </div>

      {/* Giant bottom-anchored wordmark */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pb-16 md:pb-20">
          <div className="font-mono text-[0.62rem] tracking-[0.22em] text-bone/70 uppercase mb-4 tick">
            A podcast hosted by Max Reid
          </div>
          <h1 className="font-display font-black tracking-tightest leading-[0.82] text-bone drop-shadow-[0_2px_30px_rgba(0,0,0,0.6)]">
            <span className="block text-[clamp(3rem,11vw,11rem)]">The Open</span>
            <span className="block text-[clamp(3rem,11vw,11rem)] italic text-signal font-normal -mt-1">
              Tab.
            </span>
          </h1>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-mono text-[0.55rem] tracking-[0.3em] text-bone/60 uppercase">
          Scroll
        </span>
        <span className="text-signal animate-bounce text-sm">↓</span>
      </div>
    </section>
  );
}
