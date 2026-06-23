"use client";

import { useEffect, useRef } from "react";

/** Trailing ring cursor that grows over interactive elements. Desktop only. */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const dot = ref.current;
    if (!dot) return;
    document.documentElement.classList.add("has-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest("a, button, [data-cursor]");
    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) dot.classList.add("is-grow");
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) dot.classList.remove("is-grow");
    };

    const loop = () => {
      cx += (mx - cx) * 0.2;
      cy += (my - cy) * 0.2;
      dot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return <div ref={ref} className="cursor-ring" aria-hidden />;
}
