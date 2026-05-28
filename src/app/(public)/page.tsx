import OnAirIndicator from "@/components/OnAirIndicator";
import VideoHero from "@/components/VideoHero";
import StatementIntro from "@/components/StatementIntro";
import EpisodeTiles from "@/components/EpisodeTiles";
import Timeline from "@/components/Timeline";
import { episodes, latest, formatDate } from "@/lib/episodes";

export default function Home() {
  return (
    <>
      <VideoHero />

      <StatementIntro />

      {/* FEATURED EPISODE */}
      <section className="border-t border-edge">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-16 md:py-24">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <div>
              <div className="tick font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase mb-3">
                Now streaming
              </div>
              <h2 className="font-display text-3xl md:text-4xl leading-none tracking-snug">
                Latest <span className="italic text-signal">episode.</span>
              </h2>
            </div>
          </div>

          <article className="relative border border-edge overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-4 relative bg-gradient-to-br from-ink via-ink to-[#181818] aspect-[4/3] lg:aspect-auto lg:min-h-[24rem] scanlines border-b lg:border-b-0 lg:border-r border-edge">
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                  <div className="flex items-center justify-between font-mono text-[0.72rem] tracking-[0.22em] text-ghost uppercase">
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

              <div className="lg:col-span-8 p-7 md:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-6 font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase">
                    <span>Ep · {latest.number}</span>
                    <span>{latest.duration}</span>
                    <span className="hidden sm:inline">{latest.city}</span>
                  </div>

                  <div className="mt-7 font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase mb-3">
                    Guest
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl leading-[0.95] tracking-snug">
                    {latest.guest}
                  </h3>

                  <p className="mt-6 font-display text-lg md:text-xl leading-snug text-bone/85 tracking-snug max-w-2xl">
                    {latest.title}
                  </p>

                  <p className="mt-5 font-mono text-sm text-ghost leading-relaxed max-w-2xl">
                    {latest.description}
                  </p>

                  {latest.highlights.length > 0 && (
                    <ul className="mt-7 space-y-2">
                      {latest.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 font-mono text-sm text-bone/70"
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
        </div>
      </section>

      <EpisodeTiles episodes={episodes} />

      <Timeline />
    </>
  );
}
