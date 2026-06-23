"use client";

import { useEffect, useRef } from "react";

export default function VideoHero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const el = contentRef.current;
        if (el) {
          el.style.transform = `translateY(${y * -0.22}px)`;
          el.style.opacity = String(Math.max(0, 1 - y / 520));
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative h-[calc(100svh-4rem)] min-h-[560px] w-full overflow-hidden scanlines">
      <video
        className="absolute inset-0 hidden h-full w-full object-cover object-[center_60%] brightness-[0.55] md:block"
        src="/hero/intro.mp4"
        poster="/hero/intro-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <video
        className="absolute inset-0 block h-full w-full object-cover brightness-[0.55] md:hidden"
        src="/hero/intro-mobile.mp4"
        poster="/hero/intro-mobile-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/55" />

      {/* Centered giant wordmark — parallaxes up + fades on scroll */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center will-change-transform"
      >
        <div className="flex items-center gap-3 font-mono text-[0.7rem] sm:text-[0.74rem] tracking-[0.24em] text-bone/85 uppercase mb-6 reveal">
          <span className="dot-ring inline-block h-1.5 w-1.5 rounded-full bg-signal" />
          On air — hosted by Max Reid
        </div>

        <h1 className="hero-giant text-bone reveal reveal-2 drop-shadow-[0_4px_40px_rgba(0,0,0,0.55)]">
          <span className="block">The Open</span>
          <span className="block text-signal">Tab</span>
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2">
        <span className="font-condensed text-[0.8rem] tracking-[0.2em] text-bone/70">
          Scroll
        </span>
        <span className="text-signal animate-bounce text-sm">↓</span>
      </div>
    </section>
  );
}
