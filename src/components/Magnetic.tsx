"use client";

import { useEffect, useRef, useState } from "react";

/** Pulls its child toward the cursor on hover (magnetic CTA). No dependencies. */
export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Evaluate the reduced-motion / coarse-pointer check once, not per mousemove.
  useEffect(() => {
    setEnabled(
      !window.matchMedia("(pointer: coarse)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  function move(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }
  function reset() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <span
      ref={ref}
      onMouseMove={enabled ? move : undefined}
      onMouseLeave={enabled ? reset : undefined}
      className={`inline-block ${className}`}
      style={{ transition: "transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1)" }}
    >
      {children}
    </span>
  );
}
