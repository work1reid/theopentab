"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Magnetic from "@/components/Magnetic";

const links = [
  { href: "/", label: "Index" },
  { href: "/episodes", label: "Episodes" },
  { href: "/about", label: "About" },
  { href: "/members", label: "Members" },
];

// Show-level Spotify URL (matches Footer / SubscribeBand)
const SPOTIFY_SHOW = "https://open.spotify.com/show/033nHRXHfv7gCGhAjSMCog";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Accessibility: Escape to close, focus management, and a Tab focus trap.
  useEffect(() => {
    if (!open) {
      // Restore focus to the toggle only when transitioning open -> closed.
      if (wasOpen.current) {
        toggleRef.current?.focus();
        wasOpen.current = false;
      }
      return;
    }
    wasOpen.current = true;

    const overlay = overlayRef.current;
    const getFocusable = () =>
      overlay
        ? Array.from(
            overlay.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled])'
            )
          )
        : [];

    // Move focus into the menu (first link).
    getFocusable()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const items = getFocusable();
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-edge bg-ink/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:px-10">
          <Link
            href="/"
            className="font-condensed text-lg tracking-wide text-bone"
            onClick={() => setOpen(false)}
          >
            The Open Tab
          </Link>

          <div className="flex items-center gap-4">
            <a
              href={SPOTIFY_SHOW}
              target="_blank"
              rel="noreferrer"
              className="btn-platform relative z-[60] hidden sm:inline-flex"
            >
              <span className="dot-corner" aria-hidden />
              Listen
              <span aria-hidden>→</span>
            </a>

            <Magnetic strength={0.5} className="relative z-[60]">
              <button
                ref={toggleRef}
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 flex-col items-center justify-center gap-[6px]"
              >
              <span
                className={`block h-[2px] w-7 bg-bone transition-transform duration-300 ${
                  open ? "translate-y-[8px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-7 bg-bone transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-7 bg-bone transition-transform duration-300 ${
                  open ? "-translate-y-[8px] -rotate-45" : ""
                }`}
              />
              </button>
            </Magnetic>
          </div>
        </div>
      </header>

      {/* Full-screen overlay menu — top-level (NOT inside the backdrop-blurred
          header, which would trap the fixed positioning) */}
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-ink transition-opacity duration-300 ${
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <nav className="mx-auto flex h-full max-w-[1600px] flex-col justify-center gap-2 px-6 md:px-10">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`link-sweep w-fit font-condensed text-5xl leading-[1.05] transition-colors md:text-8xl ${
                  active ? "text-signal" : "text-bone hover:text-signal"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <div className="mt-10 font-mono text-[0.72rem] tracking-[0.22em] uppercase text-ghost">
            ● On air — hosted by Max Reid · Forbes, NSW
          </div>
        </nav>
      </div>
    </>
  );
}
