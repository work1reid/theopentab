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

          <article className="relative border border-edge p-8 md:p-12 lg:p-16 overflow-hidden">
            {/* Big episode number watermark */}
            <div className="watermark absolute -top-10 -right-4 text-[16rem] md:text-[22rem] leading-none select-none">
              {latest.number}
            </div>

            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-5 font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase">
                <span>Episode {latest.number}</span>
                <span>·</span>
                <span>{latest.duration}</span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline">{formatDate(latest.date)}</span>
              </div>

              <h3 className="mt-8 font-display text-5xl md:text-7xl leading-[0.92] tracking-snug">
                {latest.guest}
              </h3>

              <p className="mt-6 font-display text-xl md:text-2xl leading-snug text-bone/80 tracking-snug">
                {latest.title}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  className="btn-platform"
                  href={latest.spotify}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="dot-corner" />
                  Spotify
                </a>
                <a
                  className="btn-platform"
                  href={latest.apple}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="dot-corner" />
                  Apple
                </a>
                <a
                  className="btn-platform"
                  href={latest.youtube}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="dot-corner" />
                  YouTube
                </a>
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
