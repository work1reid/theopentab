import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGuestGroups, getGuestGroup } from "@/lib/blog";
import { getEpisode } from "@/lib/episodes";

const SITE = "https://theopentab.vercel.app";

export function generateStaticParams() {
  return getGuestGroups().map((g) => ({ guestSlug: g.guestSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ guestSlug: string }>;
}): Promise<Metadata> {
  const { guestSlug } = await params;
  const group = getGuestGroup(guestSlug);
  if (!group) return {};
  return {
    title: `${group.guest} — Writing`,
    description: `Every article from The Open Tab's conversation with ${group.guest}: the full deep-dive plus the standout moments, broken down.`,
    alternates: { canonical: `/blog/guest/${guestSlug}` },
  };
}

export default async function GuestHub({
  params,
}: {
  params: Promise<{ guestSlug: string }>;
}) {
  const { guestSlug } = await params;
  const group = getGuestGroup(guestSlug);
  if (!group) notFound();

  const ep = group.episodeSlug ? getEpisode(group.episodeSlug) : null;

  return (
    <>
      <section className="scanlines border-b border-edge">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-12 md:pt-20 pb-12 md:pb-16">
          <nav className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-ghost mb-8">
            <Link href="/blog" className="hover:text-signal transition-colors">
              ← Writing
            </Link>
          </nav>
          <div className="tick font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase">
            Guest · {group.all.length}{" "}
            {group.all.length === 1 ? "article" : "articles"}
          </div>
          <h1 className="mt-6 md:mt-8 font-condensed text-6xl md:text-8xl lg:text-9xl leading-[0.86] text-bone">
            {group.guest}
          </h1>
          {ep && ep.released && (
            <Link
              href={`/episodes/${ep.slug}`}
              className="mt-8 inline-flex items-center gap-2 font-condensed text-base tracking-wider text-signal hover:text-bone transition-colors"
            >
              Listen to the full episode <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 md:px-10 py-12 md:py-20">
        {/* Pillar */}
        {group.pillar && (
          <Link
            href={`/blog/${group.pillar.slug}`}
            className="group block border border-edge p-8 md:p-10 hover:border-signal transition-colors"
          >
            <div className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-signal">
              Start here · The full story
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-5xl leading-[1.02] tracking-snug text-bone group-hover:text-signal transition-colors">
              {group.pillar.title}
            </h2>
            <p className="mt-4 max-w-3xl font-mono text-[0.92rem] leading-relaxed text-ghost">
              {group.pillar.description}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 font-condensed text-base tracking-wider text-signal">
              Read the deep-dive <span aria-hidden>→</span>
            </span>
          </Link>
        )}

        {/* Clusters */}
        {group.clusters.length > 0 && (
          <>
            <div className="mt-16 mb-2 font-mono text-[0.74rem] tracking-[0.22em] uppercase text-ghost">
              Broken down by topic
            </div>
            <div className="divide-y divide-edge">
              {group.clusters.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-10 py-7"
                >
                  <div className="md:col-span-3 font-mono text-[0.72rem] tracking-[0.22em] uppercase text-ghost">
                    {p.topic && <span className="text-signal">{p.topic}</span>}
                    <div className="mt-2">{p.readingMinutes} min</div>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="font-display text-2xl md:text-3xl leading-tight text-bone group-hover:text-signal transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-2xl font-mono text-[0.88rem] leading-relaxed text-ghost">
                      {p.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
