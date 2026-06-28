import Link from "next/link";
import Image from "next/image";
import SubscribeBand from "@/components/SubscribeBand";
import { getGuestGroups, getFeaturedPosts } from "@/lib/blog";

export const metadata = {
  title: "Writing",
  description:
    "Deep-dives, guest stories and standout moments from The Open Tab — long-form interviews recorded raw in Forbes, NSW by Max Reid.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const groups = getGuestGroups();
  const featured = getFeaturedPosts(6);
  const total = groups.reduce((n, g) => n + g.all.length, 0);

  return (
    <>
      {/* Header */}
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

      {/* Popular */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-6 md:px-10 pt-12 md:pt-16">
          <div className="font-mono text-[0.74rem] tracking-[0.22em] uppercase text-signal mb-6">
            ● Most read
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-edge border border-edge">
            {featured.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group bg-ink p-6 hover:bg-whisper transition-colors flex flex-col"
                data-reveal
              >
                <div className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-ghost mb-3">
                  {p.guest}
                  {p.topic && <span className="text-signal"> · {p.topic}</span>}
                </div>
                <h2 className="font-display text-xl md:text-2xl leading-snug text-bone group-hover:text-signal transition-colors">
                  {p.title}
                </h2>
                <div className="mt-auto pt-5 font-mono text-[0.68rem] tracking-[0.18em] uppercase text-ghost">
                  {p.readingMinutes} min read
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Browse by guest (folders) */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 py-16 md:py-24">
        <div className="font-mono text-[0.74rem] tracking-[0.22em] uppercase text-ghost mb-6">
          Browse by guest
        </div>
        {groups.length === 0 ? (
          <p className="font-mono text-sm text-ghost">Nothing published yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {groups.map((g) => (
              <Link
                key={g.guestSlug}
                href={`/blog/guest/${g.guestSlug}`}
                className="group relative block aspect-[4/5] overflow-hidden border border-edge"
                data-reveal
              >
                {g.ogImage && (
                  <Image
                    src={g.ogImage}
                    alt={g.guest}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-signal mb-2">
                    {g.all.length} {g.all.length === 1 ? "article" : "articles"}
                  </div>
                  <div className="font-condensed text-3xl md:text-4xl leading-none text-bone">
                    {g.guest}
                  </div>
                  <span className="mt-3 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.2em] uppercase text-bone/80 group-hover:text-signal transition-colors">
                    Open <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <SubscribeBand />
    </>
  );
}
