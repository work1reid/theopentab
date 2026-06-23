import { latest } from "@/lib/episodes";

const platforms = [
  { label: "Spotify", href: latest.spotify },
  { label: "Apple Podcasts", href: latest.apple },
  { label: "YouTube", href: latest.youtube },
].filter((p) => p.href && p.href !== "#");

export default function SubscribeBand() {
  return (
    <section className="bg-signal text-ink">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-16 md:py-24">
        <div className="font-mono text-[0.74rem] tracking-[0.24em] uppercase text-ink/60 mb-4">
          Never miss a conversation
        </div>
        <h2
          data-reveal
          className="font-condensed text-4xl sm:text-5xl md:text-7xl leading-[0.9] max-w-4xl"
        >
          Listen everywhere you already are.
        </h2>

        <div
          data-reveal
          data-reveal-delay="120"
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-ink/15 border border-ink/15"
        >
          {platforms.map((p) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 bg-signal px-6 py-7 transition-colors hover:bg-ink hover:text-signal"
            >
              <span className="font-condensed text-xl md:text-2xl tracking-wide">
                {p.label}
              </span>
              <span className="font-condensed text-2xl transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
