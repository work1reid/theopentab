import Link from "next/link";
import { Episode, formatDate } from "@/lib/episodes";

export default function EpisodeTiles({ episodes }: { episodes: Episode[] }) {
  return (
    <section className="border-t border-edge">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-16 md:pt-20 pb-10">
        <div className="flex items-end justify-between">
          <div>
            <div className="tick font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase mb-3">
              The catalogue
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-none tracking-snug">
              Every <span className="italic text-signal">conversation.</span>
            </h2>
          </div>
          <Link
            href="/episodes"
            className="hidden md:inline font-mono text-[0.8rem] tracking-[0.22em] uppercase text-ghost hover:text-signal transition-colors"
          >
            All episodes →
          </Link>
        </div>
      </div>

      {/* Tile grid — short, clear, one row */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-edge">
        {episodes.map((ep, i) => {
          const upcoming = ep.guest === "TBA";
          return (
            <Link
              key={ep.slug}
              href={upcoming ? "/episodes" : `/episodes#${ep.slug}`}
              className="group relative min-h-[280px] flex flex-col justify-between p-7 md:p-8 border-b border-edge md:border-b-0 md:border-r md:last:border-r-0 hover:bg-whisper transition-colors overflow-hidden"
            >
              {/* Number watermark */}
              <span className="watermark absolute -bottom-8 -right-2 text-[10rem] leading-none group-hover:text-signal/15 transition-colors duration-500">
                {ep.number}
              </span>

              {/* Top: ep + date */}
              <div className="relative z-10 flex items-center justify-between font-mono text-[0.72rem] tracking-[0.22em] uppercase text-ghost">
                <span>Episode {ep.number}</span>
                <span>{formatDate(ep.date)}</span>
              </div>

              {/* Bottom: guest + action */}
              <div className="relative z-10">
                <div className="font-mono text-[0.72rem] tracking-[0.22em] text-ghost uppercase mb-2">
                  {upcoming ? "Coming soon" : "Guest"}
                </div>
                <div className="font-display text-3xl md:text-4xl leading-[0.95] tracking-snug mb-5">
                  {upcoming ? (
                    <span className="italic text-ghost">To be announced</span>
                  ) : (
                    ep.guest
                  )}
                </div>
                <div className="flex items-center gap-2 font-mono text-[0.74rem] tracking-[0.22em] uppercase text-bone group-hover:text-signal transition-colors">
                  <span className="w-6 h-px bg-current transition-all group-hover:w-10" />
                  {upcoming ? "Notify me" : "Listen"}
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
