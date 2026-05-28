import EpisodeCard from "@/components/EpisodeCard";
import { episodes, formatDate } from "@/lib/episodes";

export default function EpisodesPage() {
  const live = episodes.filter((e) => e.guest !== "TBA");
  const upcoming = episodes.filter((e) => e.guest === "TBA");

  return (
    <>
      {/* Header */}
      <section className="relative scanlines">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-10 md:pt-14 pb-10 md:pb-14">
          <div className="flex items-center justify-between font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase reveal">
            <span>Directory · {episodes.length} entries</span>
            <span>The Open Tab · Index</span>
          </div>

          <h1 className="mt-8 md:mt-12 font-display font-black tracking-tightest leading-[0.86] text-display-md reveal reveal-2">
            <span className="block">Every</span>
            <span className="block italic text-signal font-normal">conversation.</span>
          </h1>

          <p className="mt-8 font-display text-xl md:text-2xl text-bone/85 max-w-2xl leading-snug reveal reveal-3">
            <span className="text-ghost">/ </span>The full record.
            Long-form, unedited spirit, edited for time.
          </p>
        </div>
        <div className="border-t border-edge" />
      </section>

      {/* List */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mt-8">
          {live.length > 0 && (
            <div className="grid grid-cols-12 gap-6 items-baseline mb-2 font-mono text-[0.6rem] tracking-[0.22em] text-ghost uppercase border-b border-edge pb-3">
              <div className="col-span-2">Ep</div>
              <div className="col-span-7">Title · Guest</div>
              <div className="col-span-3 hidden md:block text-right">
                Duration · Listen
              </div>
            </div>
          )}

          {live.map((ep) => (
            <div id={ep.slug} key={ep.slug}>
              <EpisodeCard episode={ep} variant="list" />
            </div>
          ))}
        </div>

        {/* Episode Detail Anchors (expandable spec sheets) */}
        <div className="mt-32 space-y-32">
          {live.map((ep) => (
            <article
              key={`detail-${ep.slug}`}
              id={`${ep.slug}-detail`}
              className="border-t border-edge pt-16"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-3">
                  <div className="font-display text-7xl md:text-8xl leading-none text-signal italic">
                    {ep.number}
                  </div>
                  <div className="mt-6 space-y-3 font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase">
                    <div>
                      <span className="text-ghost/60">Aired</span>
                      <div className="text-bone mt-1">
                        {formatDate(ep.date)}
                      </div>
                    </div>
                    <div>
                      <span className="text-ghost/60">Duration</span>
                      <div className="text-bone mt-1">{ep.duration}</div>
                    </div>
                    <div>
                      <span className="text-ghost/60">Recorded</span>
                      <div className="text-bone mt-1">{ep.city}</div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-9">
                  <div className="font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-3">
                    Guest
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl leading-[0.95] tracking-snug">
                    {ep.guest}
                  </h3>
                  <p className="mt-5 font-display text-xl md:text-2xl leading-snug text-bone/85 tracking-snug max-w-3xl">
                    {ep.title}
                  </p>
                  <p className="mt-8 font-mono text-sm text-ghost max-w-2xl leading-relaxed">
                    {ep.description}
                  </p>

                  {ep.highlights.length > 0 && (
                    <div className="mt-12">
                      <div className="font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-4">
                        Highlights
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                        {ep.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 font-mono text-xs text-bone/80 border-l border-edge pl-4 py-1"
                          >
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-12 flex flex-wrap items-center gap-3">
                    <a className="btn-platform" href={ep.spotify}>
                      <span className="dot-corner" />
                      Spotify
                    </a>
                    <a className="btn-platform" href={ep.apple}>
                      <span className="dot-corner" />
                      Apple
                    </a>
                    <a className="btn-platform" href={ep.youtube}>
                      <span className="dot-corner" />
                      YouTube
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section className="mt-40">
            <div className="border-t border-edge pt-16">
              <div className="tick font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-6">
                Upcoming
              </div>
              <h2 className="font-display text-3xl md:text-4xl leading-none tracking-snug mb-10">
                In the <span className="italic text-signal">chair.</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-edge border border-edge">
                {upcoming.map((ep) => (
                  <div key={ep.slug} className="bg-ink">
                    <EpisodeCard episode={ep} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </section>
    </>
  );
}
