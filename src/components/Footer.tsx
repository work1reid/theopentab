import Link from "next/link";
import { latest } from "@/lib/episodes";

const follow = [
  { label: "Instagram", href: "https://instagram.com/_theopentab" },
  { label: "TikTok", href: "https://tiktok.com/@_theopentab" },
];

const listen = [
  { label: "Spotify", href: "https://open.spotify.com/show/033nHRXHfv7gCGhAjSMCog" },
  { label: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/the-open-tab/id1896832387" },
  { label: "YouTube", href: "https://www.youtube.com/@the_opentab" },
];

const explore = [
  { label: "Episodes", href: "/episodes" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Members", href: "/members" },
];

function Col({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <div className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-bone mb-5">
        {title}
      </div>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li key={i.label}>
            <a
              href={i.href}
              target={i.href.startsWith("http") ? "_blank" : undefined}
              rel={i.href.startsWith("http") ? "noreferrer" : undefined}
              className="link-sweep inline-block font-condensed text-xl tracking-wide text-bone transition-colors hover:text-signal"
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative">
      {/* Blue divider between the page and the footer */}
      <div className="h-2.5 w-full bg-signal" />
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-20 md:py-28">
        <div className="tick font-mono text-[0.74rem] tracking-[0.22em] uppercase text-ghost mb-7">
          The Open Tab
        </div>

        {/* Sign-off + CTA, two columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-condensed text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.88] text-bone">
              Unearthing the{" "}
              <span className="font-display italic lowercase tracking-normal normal-case text-signal">
                uncommon.
              </span>
            </h2>
            <p className="mt-8 max-w-xl font-mono text-sm md:text-base text-bone/65 leading-relaxed">
              Long conversations with people worth listening to. Hosted by Max
              Reid, recorded raw in Forbes, NSW.
            </p>
          </div>

          {/* CTA block */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href={`/episodes/${latest.slug}`} className="btn-pill">
              Listen to the latest
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/members"
              className="font-mono text-[0.74rem] tracking-[0.22em] uppercase text-ghost hover:text-signal transition-colors"
            >
              Join the waitlist →
            </Link>
          </div>
        </div>

        {/* Link columns */}
        <div className="mt-16 grid grid-cols-2 gap-10 border-t border-edge pt-12 md:grid-cols-3">
          <Col title="Listen" items={listen} />
          <Col title="Follow" items={follow} />
          <Col title="Explore" items={explore} />
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-3 border-t border-edge pt-8 font-mono text-[0.72rem] tracking-[0.22em] uppercase text-bone md:flex-row md:items-center md:justify-between">
          <span>© 2026 The Open Tab</span>
          <a
            href="https://instagram.com/_theopentab"
            target="_blank"
            rel="noreferrer"
            className="text-ghost hover:text-signal transition-colors"
          >
            Get in touch — @the_opentab
          </a>
          <span>Forbes, NSW · Hosted by Max Reid</span>
        </div>
      </div>

      {/* Condensed marquee strip — blue band, black text */}
      <div className="overflow-hidden bg-signal py-4">
        <div className="marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-10 pr-10 font-condensed text-2xl md:text-3xl text-ink"
            >
              <span>The Open Tab</span>
              <span className="text-ink/40">●</span>
              <span>Unearthing the uncommon</span>
              <span className="text-ink/40">●</span>
              <span>Forbes, NSW</span>
              <span className="text-ink/40">●</span>
              <span>New episodes fortnightly</span>
              <span className="text-ink/40">●</span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
