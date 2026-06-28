"use client";

import { useEffect, useRef, useState } from "react";

/** Subtle 3D tilt toward the cursor. CSS-3D only, no dependencies. */
export default function Tilt({
  children,
  className = "",
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Evaluate the reduced-motion check once, not per mousemove.
  useEffect(() => {
    setEnabled(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${px * max}deg) rotateX(${
      -py * max
    }deg) scale(1.02)`;
  }
  function reset() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div
      ref={ref}
      onMouseMove={enabled ? onMove : undefined}
      onMouseLeave={enabled ? reset : undefined}
      className={className}
      style={{ transition: "transform 0.25s ease", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
