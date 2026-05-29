import EpisodeCard from "@/components/EpisodeCard";
import { episodes, formatDate } from "@/lib/episodes";

export default function EpisodesPage() {
  const live = episodes.filter((e) => e.released);
  const upcoming = episodes.filter((e) => !e.released);

  return (
    <>
      {/* Header */}
      <section className="relative scanlines">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-10 md:pt-14 pb-10 md:pb-14">
          <div className="font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase reveal">
            Directory · {episodes.length} entries
          </div>

          <h1 className="mt-8 md:mt-12 font-display font-black tracking-tightest leading-[0.86] text-display-md reveal reveal-2">
            <span className="block">Every</span>
            <span className="block italic text-signal font-normal">conversation.</span>
          </h1>
        </div>
        <div className="border-t border-edge" />
      </section>

      {/* Episode list */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10">
        {live.map((ep) => (
          <div id={ep.slug} key={ep.slug}>
            <EpisodeCard episode={ep} variant="list" />
          </div>
        ))}
        <div className="border-t border-edge" />
      </section>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-6 md:px-10 mt-24 md:mt-32">
          <div className="tick font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase mb-8">
            Upcoming
          </div>
          <div className="space-y-px">
            {upcoming.map((ep) => (
              <div
                key={ep.slug}
                className="flex items-center justify-between gap-6 border-t border-edge py-8"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-display text-4xl md:text-5xl italic text-ghost leading-none">
                    {ep.number}
                  </span>
                  <div>
                    <div className="font-mono text-[0.72rem] tracking-[0.22em] text-ghost uppercase mb-1">
                      {formatDate(ep.date)}
                    </div>
                    <div className="font-display text-2xl md:text-3xl tracking-snug text-ghost">
                      {ep.guest === "TBA" ? "Guest to be announced" : ep.guest}
                    </div>
                  </div>
                </div>
                <span className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-bone hover:text-signal transition-colors shrink-0">
                  Notify me →
                </span>
              </div>
            ))}
            <div className="border-t border-edge" />
          </div>
        </section>
      )}
    </>
  );
}
