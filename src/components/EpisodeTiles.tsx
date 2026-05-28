import Link from "next/link";
import { Episode, formatDate } from "@/lib/episodes";

export default function EpisodeTiles({ episodes }: { episodes: Episode[] }) {
  return (
    <section className="border-t border-edge">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-16 md:pt-20 pb-10">
        <div className="flex items-end justify-between">
          <div>
            <div className="tick font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-3">
              The catalogue
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-none tracking-snug">
              Every <span className="italic text-signal">conversation.</span>
            </h2>
          </div>
          <Link
            href="/episodes"
            className="hidden md:inline font-mono text-[0.7rem] tracking-[0.22em] uppercase text-ghost hover:text-signal transition-colors"
          >
            All episodes →
          </Link>
        </div>
      </div>

      {/* Edge-to-edge tile grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {episodes.map((ep, i) => {
          const upcoming = ep.guest === "TBA";
          return (
            <Link
              key={ep.slug}
              href={upcoming ? "/episodes" : `/episodes#${ep.slug}`}
              className="group relative aspect-[4/5] sm:aspect-square overflow-hidden border-t border-edge sm:[&:nth-child(-n+2)]:border-t-0 lg:[&:nth-child(-n+3)]:border-t-0 sm:[&:nth-child(odd)]:border-l-0 sm:border-l lg:border-l lg:[&:nth-child(3n+1)]:border-l-0"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#141414] via-ink to-[#1c1c1c] scanlines" />
              <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/0 transition-colors duration-500" />

              {/* Giant number watermark */}
              <div className="watermark absolute -bottom-10 -right-4 text-[14rem] leading-none group-hover:text-signal/15 transition-colors duration-500">
                {ep.number}
              </div>

              {/* Top meta */}
              <div className="absolute top-0 inset-x-0 p-6 flex items-center justify-between font-mono text-[0.6rem] tracking-[0.22em] uppercase text-bone/60">
                <span>EP · {ep.number}</span>
                <span>{formatDate(ep.date)}</span>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-0 inset-x-0 p-6">
                <div className="font-mono text-[0.6rem] tracking-[0.22em] text-ghost uppercase mb-2">
                  {upcoming ? "Coming soon" : "Guest"}
                </div>
                <div className="font-display text-2xl md:text-3xl leading-[0.95] tracking-snug mb-3">
                  {upcoming ? (
                    <span className="italic text-ghost">{ep.guest}</span>
                  ) : (
                    ep.guest
                  )}
                </div>
                <div className="flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.22em] uppercase text-bone group-hover:text-signal transition-colors">
                  <span className="w-6 h-px bg-current transition-all group-hover:w-10" />
                  {upcoming ? "Notify" : "Listen"}
                  <span className="text-signal opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
