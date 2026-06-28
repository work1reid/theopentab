"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { latest } from "@/lib/episodes";

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
      {/* Single <video>: the browser evaluates the <source> media queries and
          fetches ONLY the matching one, so a device never downloads both files. */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-[center_60%] brightness-[0.55]"
        poster="/hero/intro-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/hero/intro-mobile.mp4" media="(max-width: 767px)" />
        <source src="/hero/intro.mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/55" />

      {/* Centered giant wordmark — parallaxes up + fades on scroll */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center will-change-transform"
      >
        <h1 className="hero-giant text-bone reveal drop-shadow-[0_4px_40px_rgba(0,0,0,0.55)]">
          <span className="block">The Open</span>
          <span className="block text-signal">Tab</span>
        </h1>

        <div className="mt-10 reveal reveal-2">
          <Link href={`/episodes/${latest.slug}`} className="btn-pill">
            Listen to the latest
            <span aria-hidden>→</span>
          </Link>
        </div>
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
