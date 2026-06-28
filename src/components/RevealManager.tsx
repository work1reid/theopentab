"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global scroll-reveal. Any element with `data-reveal` starts visible (no-JS safe);
 * on mount we "arm" it (hide) then reveal it when it scrolls into view.
 * Optional `data-reveal-delay="120"` (ms) staggers siblings.
 */
export default function RevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    els.forEach((el) => el.classList.add("armed"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const delay = el.getAttribute("data-reveal-delay");
          if (delay) el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-in");
          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
