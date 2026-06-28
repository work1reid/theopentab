import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  episodes,
  getEpisode,
  formatDate,
  youtubeId,
  spotifyEmbed,
} from "@/lib/episodes";

const SITE = "https://theopentab.vercel.app";

// "1h 33m" / "27m" / "2h 35m" -> ISO-8601 duration ("PT1H33M")
function isoDuration(duration: string): string | null {
  if (!duration) return null;
  const h = duration.match(/(\d+)\s*h/i);
  const m = duration.match(/(\d+)\s*m/i);
  if (!h && !m) return null;
  return `PT${h ? `${h[1]}H` : ""}${m ? `${m[1]}M` : ""}`;
}

export function generateStaticParams() {
  return episodes.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ep = getEpisode(slug);
  if (!ep) return { title: "Episode — The Open Tab" };
  const canonical = `/episodes/${slug}`;
  return {
    title: `${ep.title} · The Open Tab`,
    description: ep.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: ep.title,
      description: ep.description,
      images: [{ url: ep.image, alt: `${ep.guest} — The Open Tab` }],
    },
    twitter: {
      card: "summary_large_image",
      title: ep.title,
      description: ep.description,
      images: [ep.image],
    },
  };
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ep = getEpisode(slug);
  if (!ep) notFound();

  const ytId = youtubeId(ep.youtube);
  const spotify = spotifyEmbed(ep.spotify);

  const canonicalUrl = `${SITE}/episodes/${slug}`;
  const mediaUrl =
    ep.spotify && ep.spotify !== "#"
      ? ep.spotify
      : ep.youtube && ep.youtube !== "#"
      ? ep.youtube
      : null;
  const iso = isoDuration(ep.duration);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: ep.title,
    description: ep.description,
    datePublished: ep.date,
    url: canonicalUrl,
    image: ep.image,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "The Open Tab",
      url: SITE,
    },
    ...(iso ? { timeRequired: iso } : {}),
    ...(mediaUrl
      ? { associatedMedia: { "@type": "MediaObject", url: mediaUrl } }
      : {}),
  };

  return (
    <article className="mx-auto max-w-[1100px] px-6 md:px-10 pt-10 md:pt-14 pb-24">
      {ep.released && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {/* Back */}
      <Link
        href="/episodes"
        className="inline-flex items-center gap-3 font-mono text-[0.74rem] tracking-[0.22em] uppercase text-ghost hover:text-signal transition-colors mb-12"
      >
        <span className="w-6 h-px bg-current" />
        All episodes
      </Link>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase">
        <span>Episode {ep.number}</span>
        {ep.released ? (
          <>
            <span>·</span>
            <span>{ep.duration}</span>
            <span>·</span>
            <span>{formatDate(ep.date)}</span>
            <span>·</span>
            <span>{ep.city}</span>
          </>
        ) : (
          <>
            <span>·</span>
            <span className="text-signal">Coming soon</span>
          </>
        )}
      </div>

      {/* Guest kicker + title */}
      <div className="mt-6 font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase">
        {ep.guest}
      </div>
      <h1 className="mt-2 font-display text-4xl md:text-6xl leading-[0.95] tracking-snug text-signal max-w-4xl">
        {ep.title}
      </h1>

      {ep.released ? (
        <>
          {/* Watch — YouTube embed */}
          {ytId && (
            <div className="mt-12 relative aspect-video w-full border border-edge overflow-hidden">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${ytId}`}
                title={`${ep.guest} — The Open Tab`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )}

          {/* Platform buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {ep.spotify !== "#" && (
              <a className="btn-platform" href={ep.spotify} target="_blank" rel="noreferrer">
                <span className="dot-corner" />
                Spotify
              </a>
            )}
            {ep.apple !== "#" && (
              <a className="btn-platform" href={ep.apple} target="_blank" rel="noreferrer">
                <span className="dot-corner" />
                Apple
              </a>
            )}
            {ep.youtube !== "#" && (
              <a className="btn-platform" href={ep.youtube} target="_blank" rel="noreferrer">
                <span className="dot-corner" />
                YouTube
              </a>
            )}
          </div>

          {/* Listen — Spotify embed */}
          {spotify && (
            <div className="mt-8">
              <iframe
                className="w-full rounded-xl border border-edge"
                src={spotify}
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify player"
              />
            </div>
          )}

          {/* Description */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-10 border-t border-edge pt-12">
            <div className="md:col-span-4">
              <div className="tick font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase">
                About this episode
              </div>
            </div>
            <div className="md:col-span-8">
              <p className="font-mono text-base md:text-lg text-bone/80 leading-relaxed max-w-2xl">
                {ep.description}
              </p>

              {ep.highlights.length > 0 && (
                <div className="mt-12">
                  <div className="font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase mb-5">
                    Highlights
                  </div>
                  <ul className="space-y-3 max-w-2xl">
                    {ep.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 font-mono text-base text-bone/80 border-l border-edge pl-5 py-1"
                      >
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Coming soon state */
        <div className="mt-16 border-t border-edge pt-12">
          {ep.image && (
            <div className="relative aspect-video w-full border border-edge overflow-hidden mb-10">
              <Image src={ep.image} alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
            </div>
          )}
          <p className="font-mono text-base md:text-lg text-bone/80 leading-relaxed max-w-2xl">
            {ep.description}
          </p>
          <a
            href="https://instagram.com/_theopentab"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-3 font-mono text-[0.74rem] tracking-[0.22em] uppercase text-bone hover:text-signal transition-colors"
          >
            <span className="w-8 h-px bg-current" />
            Follow to get notified
            <span className="text-signal">→</span>
          </a>
        </div>
      )}
    </article>
  );
}
