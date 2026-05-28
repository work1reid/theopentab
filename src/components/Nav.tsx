"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import OnAirIndicator from "./OnAirIndicator";

const links = [
  { href: "/", label: "Index" },
  { href: "/episodes", label: "Episodes" },
  { href: "/about", label: "About" },
  { href: "/members", label: "Members" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-ink/70 border-b border-edge">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <OnAirIndicator />
          <span className="hidden sm:inline-block h-3 w-px bg-edge" />
          <Link href="/" className="brand-anchor flex items-baseline gap-2 min-w-0">
            <span className="hidden sm:inline font-display text-base sm:text-lg leading-none whitespace-nowrap">
              The Open Tab
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-0 sm:gap-1 md:gap-2 shrink overflow-x-auto no-scrollbar">
          {links.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`group relative px-1.5 sm:px-2.5 md:px-3 py-2 font-mono text-[0.66rem] sm:text-[0.78rem] md:text-[0.72rem] tracking-[0.14em] sm:tracking-[0.2em] uppercase transition-colors ${
                  active ? "text-bone" : "text-ghost hover:text-bone"
                }`}
              >
                {l.label}
                <span
                  className={`absolute left-1.5 right-1.5 sm:left-2.5 sm:right-2.5 md:left-3 md:right-3 bottom-1 h-px bg-signal transition-transform origin-left ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
