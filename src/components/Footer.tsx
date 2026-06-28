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
      <div className="font-mono text-[0.66rem] tracking-[0.24em] uppercase text-ghost mb-4">
        {title}
      </div>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li key={i.label}>
            <a
              href={i.href}
              target={i.href.startsWith("http") ? "_blank" : undefined}
              rel={i.href.startsWith("http") ? "noreferrer" : undefined}
              className="font-mono text-[0.82rem] text-bone/80 transition-colors hover:text-signal"
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
    <footer className="relative bg-black">
      {/* Defined signal divider — clear "page ends here" marker */}
      <div className="h-0.5 w-full bg-signal" />

      {/* Elevated lip: a subtle highlight at the top edge separates the footer
          surface from the page above it */}
      <div className="bg-gradient-to-b from-white/[0.04] to-transparent">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand + CTA */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="font-condensed text-xl tracking-wide text-bone">
              The Open Tab
            </div>
            <p className="mt-3 max-w-xs font-mono text-[0.8rem] leading-relaxed text-ghost">
              Long conversations with people worth listening to — recorded raw in
              Forbes, NSW.
            </p>
            <Link
              href={`/episodes/${latest.slug}`}
              className="mt-6 inline-flex items-center gap-2 font-mono text-[0.74rem] tracking-[0.18em] uppercase text-signal transition-colors hover:text-bone"
            >
              Listen to the latest <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Columns */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-3 gap-8">
            <Col title="Listen" items={listen} />
            <Col title="Follow" items={follow} />
            <Col title="Explore" items={explore} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-2 border-t border-edge pt-6 font-mono text-[0.68rem] tracking-[0.16em] uppercase text-ghost md:flex-row md:items-center md:justify-between">
          <span>© 2026 The Open Tab · Forbes, NSW</span>
          <a
            href="https://instagram.com/_theopentab"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-signal"
          >
            @the_opentab
          </a>
          <span>Hosted by Max Reid</span>
        </div>

          {/* Back-to-top end cap */}
          <div className="mt-10 flex justify-center">
            <a
              href="#"
              className="font-mono text-[0.66rem] tracking-[0.24em] uppercase text-ghost transition-colors hover:text-signal"
            >
              ↑ Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
