import Link from "next/link";
import { Episode, formatDate } from "@/lib/episodes";
import Tilt from "@/components/Tilt";

function platforms(ep: Episode) {
  return [
    { label: "Spotify", href: ep.spotify },
    { label: "Apple", href: ep.apple },
    { label: "YouTube", href: ep.youtube },
  ].filter((p) => p.href && p.href !== "#");
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-[1px]" aria-hidden>
      <path d="M8 5v14l11-7z" fill="currentColor" />
    </svg>
  );
}

export default function EpisodeList({
  episodes,
  showHeading = true,
}: {
  episodes: Episode[];
  showHeading?: boolean;
}) {
  const released = episodes
    .filter((e) => e.released)
    .sort((a, b) => Number(b.number) - Number(a.number));
  const upcoming = episodes
    .filter((e) => !e.released)
    .sort((a, b) => Number(a.number) - Number(b.number));

  return (
    <section className="border-t border-edge">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-16 md:py-24">
        {showHeading && (
          <>
            <div className="tick font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase mb-4">
              The catalogue
            </div>
            <h2 className="font-condensed text-5xl md:text-7xl lg:text-8xl text-bone mb-10 md:mb-14">
              Episodes
            </h2>
          </>
        )}

        <div className="flex flex-col">
          {released.map((ep, i) => (
            <article
              key={ep.slug}
              data-reveal
              data-reveal-delay={`${i * 60}`}
              className="group grid grid-cols-1 md:grid-cols-12 items-center gap-6 md:gap-10 border-t border-edge py-8 md:py-12"
            >
              {/* Thumbnail with play button — 3D tilt toward cursor */}
              <Tilt className="md:col-span-5">
                <Link
                  href={`/episodes/${ep.slug}`}
                  className="relative block aspect-video overflow-hidden border border-edge bg-whisper"
                  aria-label={`Watch ${ep.guest}`}
                >
                  <img
                    src={ep.image}
                    alt={ep.guest}
                    className="absolute inset-0 h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-signal text-ink transition duration-300 group-hover:scale-110">
                      <PlayIcon />
                    </span>
                  </span>
                </Link>
              </Tilt>

              {/* Content */}
              <div className="md:col-span-7">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.72rem] tracking-[0.22em] uppercase text-ghost mb-4">
                  <span>Ep {ep.number}</span>
                  <span>·</span>
                  <span>{formatDate(ep.date)}</span>
                  <span>·</span>
                  <span>{ep.duration}</span>
                  {i === 0 && (
                    <span className="text-signal border border-signal/40 px-2 py-0.5">
                      Latest
                    </span>
                  )}
                </div>

                <h3 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-snug text-signal transition-opacity duration-300 group-hover:opacity-80">
                  {ep.guest}
                </h3>
                <p className="mt-4 max-w-2xl font-display italic text-lg md:text-2xl leading-snug text-bone/55">
                  “{ep.title}”
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
                  <Link
                    href={`/episodes/${ep.slug}`}
                    className="inline-flex items-center gap-2 font-condensed text-base tracking-wider text-signal transition-colors hover:text-bone"
                  >
                    Watch episode <span aria-hidden>→</span>
                  </Link>
                  {platforms(ep).map((p) => (
                    <a
                      key={p.label}
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[0.72rem] tracking-[0.18em] uppercase text-ghost transition-colors hover:text-signal"
                    >
                      {p.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}

          {/* Coming soon */}
          {upcoming.map((ep) => (
            <article
              key={ep.slug}
              className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 md:gap-10 border-t border-edge py-8 md:py-12 opacity-70"
            >
              <div className="relative block aspect-video overflow-hidden border border-edge bg-whisper md:col-span-5">
                <img
                  src={ep.image}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover grayscale blur-[2px] opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink to-ink/40" />
                <span className="absolute inset-0 flex items-center justify-center font-condensed text-2xl tracking-wider text-bone/60">
                  Coming soon
                </span>
              </div>
              <div className="md:col-span-7">
                <div className="flex items-center gap-4 font-mono text-[0.72rem] tracking-[0.22em] uppercase text-ghost mb-4">
                  <span>Ep {ep.number}</span>
                  <span>·</span>
                  <span className="text-signal">Next up</span>
                </div>
                <h3 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-snug text-bone/50">
                  {ep.guest}
                </h3>
                <p className="mt-4 max-w-2xl font-display italic text-lg md:text-2xl leading-snug text-bone/40">
                  “{ep.title}”
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
