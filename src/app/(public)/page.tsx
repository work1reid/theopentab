import Link from "next/link";
import PlatformButtons from "@/components/PlatformButtons";
import EpisodeCard from "@/components/EpisodeCard";
import OnAirIndicator from "@/components/OnAirIndicator";
import { episodes, latest, formatDate } from "@/lib/episodes";

export default function Home() {
  const grid = episodes;

  return (
    <>
      {/* HERO */}
      <section className="relative scanlines vignette overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-edge" />

        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-10 md:pt-14 pb-12 md:pb-16 relative">
          {/* Metadata strip */}
          <div className="flex items-center justify-between text-[0.62rem] font-mono tracking-[0.22em] text-ghost uppercase reveal">
            <div className="flex items-center gap-6">
              <span>Transmission · 01</span>
              <span className="hidden sm:inline">Forbes · NSW · −33.385°</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <span>FRQ 89.7</span>
              <span>Stereo</span>
            </div>
          </div>

          {/* Headline */}
          <div className="mt-6 md:mt-10 reveal reveal-2">
            <div className="tick font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-4 md:mb-6">
              A podcast hosted by Max Reid
            </div>
            <h1 className="font-display font-black tracking-tightest leading-[0.86] text-display-lg">
              <span className="block">The</span>
              <span className="block">
                Open <span className="italic text-signal font-normal">Tab.</span>
              </span>
            </h1>
          </div>

          {/* Tagline + buttons */}
          <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7 reveal reveal-3">
              <p className="font-display text-2xl md:text-3xl leading-snug tracking-snug text-bone/85">
                <span className="text-ghost">/ </span>Unearthing the{" "}
                <span className="italic text-signal">uncommon.</span>
              </p>
              <p className="mt-5 font-mono text-xs text-ghost max-w-xl leading-relaxed">
                Long-form conversations with people worth listening to —
                recorded in a small room in Forbes, NSW. New episodes monthly.
              </p>
            </div>

            <div className="md:col-span-5 md:flex md:justify-end reveal reveal-4">
              <div>
                <div className="font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-4">
                  Listen Now
                </div>
                <PlatformButtons />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rail */}
        <div className="border-t border-edge">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-4 flex items-center justify-between font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase">
            <span>● Recording</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
      </section>

      {/* FEATURED EPISODE */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 mt-20 md:mt-28">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <div className="tick font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-3">
              Now Streaming
            </div>
            <h2 className="font-display text-3xl md:text-4xl leading-none tracking-snug">
              Latest <span className="italic text-signal">episode.</span>
            </h2>
          </div>
          <Link
            href="/episodes"
            className="hidden md:inline font-mono text-[0.7rem] tracking-[0.22em] uppercase text-ghost hover:text-signal transition-colors"
          >
            All Episodes →
          </Link>
        </div>

        <article className="relative border border-edge overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual block */}
            <div className="lg:col-span-4 relative bg-gradient-to-br from-ink via-ink to-[#181818] aspect-[4/3] lg:aspect-auto lg:min-h-[24rem] scanlines border-b lg:border-b-0 lg:border-r border-edge">
              <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                <div className="flex items-center justify-between font-mono text-[0.6rem] tracking-[0.22em] text-ghost uppercase">
                  <span>● Recording</span>
                  <span>{formatDate(latest.date)}</span>
                </div>
                <div className="flex items-end justify-between">
                  <OnAirIndicator variant="hero" />
                  <div className="font-display text-[7rem] md:text-[8rem] leading-[0.8] text-signal/20 tracking-tighter select-none -mb-4 md:-mb-6 -mr-2">
                    {latest.number}
                  </div>
                </div>
              </div>
            </div>

            {/* Content block */}
            <div className="lg:col-span-8 p-7 md:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-6 font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase">
                  <span>Ep · {latest.number}</span>
                  <span>{latest.duration}</span>
                  <span className="hidden sm:inline">{latest.city}</span>
                </div>

                <div className="mt-7 font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-3">
                  Guest
                </div>
                <h3 className="font-display text-3xl md:text-4xl leading-[0.95] tracking-snug">
                  {latest.guest}
                </h3>

                <p className="mt-6 font-display text-lg md:text-xl leading-snug text-bone/85 tracking-snug max-w-2xl">
                  {latest.title}
                </p>

                <p className="mt-5 font-mono text-xs text-ghost leading-relaxed max-w-2xl">
                  {latest.description}
                </p>

                {latest.highlights.length > 0 && (
                  <ul className="mt-8 space-y-2">
                    {latest.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 font-mono text-xs text-bone/70"
                      >
                        <span className="text-signal mt-1.5">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-10 pt-8 border-t border-edge flex flex-wrap items-center gap-3">
                <a className="btn-platform" href={latest.spotify}>
                  <span className="dot-corner" />
                  Spotify
                </a>
                <a className="btn-platform" href={latest.apple}>
                  <span className="dot-corner" />
                  Apple
                </a>
                <a className="btn-platform" href={latest.youtube}>
                  <span className="dot-corner" />
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* EPISODE GRID */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 mt-24 md:mt-32">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="tick font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-3">
              Catalogue
            </div>
            <h2 className="font-display text-3xl md:text-4xl leading-none tracking-snug">
              The <span className="italic text-signal">archive.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-edge border border-edge">
          {grid.map((ep) => (
            <div key={ep.slug} className="bg-ink">
              <EpisodeCard episode={ep} />
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 mt-24 md:mt-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-3">
            <div className="tick font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-3">
              The Host
            </div>
            <div className="aspect-[3/4] bg-whisper border border-edge relative overflow-hidden scanlines">
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase">
                Portrait pending
              </div>
            </div>
          </div>

          <div className="md:col-span-8 md:col-start-5">
            <h2 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-snug">
              Max Reid is{" "}
              <span className="italic text-signal">eighteen.</span>
            </h2>
            <p className="mt-8 font-display text-xl md:text-2xl leading-snug text-bone/85 max-w-2xl tracking-snug">
              He runs an exterior-cleaning business by day and interviews
              the people he wants to know better by night.
            </p>
            <p className="mt-6 font-mono text-xs md:text-sm text-ghost max-w-2xl leading-relaxed">
              The Open Tab started as a tab he kept open on his laptop for
              three years. A list of people in Forbes, NSW he wanted to put
              in front of a microphone. He turned 18, bought the gear, and
              sat down with the first one.
            </p>
            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.22em] uppercase text-bone hover:text-signal transition-colors"
            >
              <span className="w-8 h-px bg-current" />
              Read the full story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
