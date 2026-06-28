import Link from "next/link";
import SubscribeBand from "@/components/SubscribeBand";
import { getGuestGroups } from "@/lib/blog";

export const metadata = {
  title: "Writing",
  description:
    "Deep-dives, guest stories and standout moments from The Open Tab — long-form interviews recorded raw in Forbes, NSW by Max Reid.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const groups = getGuestGroups();
  const total = groups.reduce((n, g) => n + g.all.length, 0);

  return (
    <>
      <section className="scanlines border-b border-edge">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-12 md:pt-20 pb-12 md:pb-16">
          <div className="tick font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase reveal">
            Writing · {total} {total === 1 ? "piece" : "pieces"} ·{" "}
            {groups.length} {groups.length === 1 ? "guest" : "guests"}
          </div>
          <h1 className="mt-6 md:mt-8 font-condensed text-6xl md:text-8xl lg:text-9xl leading-[0.86] text-bone reveal reveal-2">
            The{" "}
            <span className="font-display italic lowercase tracking-normal normal-case text-signal">
              long read.
            </span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 md:px-10 py-12 md:py-20 space-y-16">
        {groups.length === 0 ? (
          <p className="font-mono text-sm text-ghost">Nothing published yet.</p>
        ) : (
          groups.map((g) => (
            <div key={g.guestSlug} data-reveal>
              {/* Guest category header */}
              <div className="flex items-baseline justify-between gap-6 border-b border-edge pb-4">
                <Link
                  href={`/blog/guest/${g.guestSlug}`}
                  className="group font-condensed text-3xl md:text-5xl leading-none text-bone hover:text-signal transition-colors"
                >
                  {g.guest}
                </Link>
                <Link
                  href={`/blog/guest/${g.guestSlug}`}
                  className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-ghost hover:text-signal transition-colors whitespace-nowrap"
                >
                  All {g.all.length} →
                </Link>
              </div>

              {/* Pillar */}
              {g.pillar && (
                <Link
                  href={`/blog/${g.pillar.slug}`}
                  className="group mt-6 block"
                >
                  <div className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-signal mb-2">
                    The full story
                  </div>
                  <h2 className="font-display text-2xl md:text-4xl leading-[1.05] tracking-snug text-bone group-hover:text-signal transition-colors max-w-4xl">
                    {g.pillar.title}
                  </h2>
                </Link>
              )}

              {/* Cluster topics */}
              {g.clusters.length > 0 && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-edge border border-edge">
                  {g.clusters.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group bg-ink p-5 hover:bg-whisper transition-colors"
                    >
                      {p.topic && (
                        <div className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-signal mb-2">
                          {p.topic}
                        </div>
                      )}
                      <div className="font-display text-lg leading-snug text-bone group-hover:text-signal transition-colors">
                        {p.title}
                      </div>
                      <div className="mt-3 font-mono text-[0.68rem] tracking-[0.18em] uppercase text-ghost">
                        {p.readingMinutes} min read
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </section>

      <SubscribeBand />
    </>
  );
}
