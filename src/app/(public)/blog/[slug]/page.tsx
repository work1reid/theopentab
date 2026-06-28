import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { marked } from "marked";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { getEpisode } from "@/lib/episodes";

const SITE = "https://theopentab.vercel.app";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const image = post.ogImage ?? "/ep1-cameron.jpg";
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `${SITE}/blog/${slug}`,
      images: [{ url: image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

function fmt(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = await marked.parse(post.content);
  const image = post.ogImage ?? "/ep1-cameron.jpg";
  const ep = post.episodeSlug ? getEpisode(post.episodeSlug) : null;
  const related = getRelatedPosts(post);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: `${SITE}${image}`,
    keywords: (post.keywords ?? []).join(", "),
    author: { "@type": "Person", name: "Max Reid" },
    publisher: {
      "@type": "Organization",
      name: "The Open Tab",
      logo: { "@type": "ImageObject", url: `${SITE}/icon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/${slug}` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Writing", item: `${SITE}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE}/blog/${slug}`,
      },
    ],
  };

  return (
    <article className="scanlines">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Header */}
      <header className="border-b border-edge">
        <div className="mx-auto max-w-3xl px-6 md:px-10 pt-12 md:pt-20 pb-10 md:pb-14">
          <nav className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-ghost">
            <Link href="/blog" className="hover:text-signal transition-colors">
              ← Writing
            </Link>
          </nav>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.72rem] tracking-[0.22em] uppercase text-ghost">
            <span>{fmt(post.date)}</span>
            <span>·</span>
            <span>{post.readingMinutes} min read</span>
            {post.guest && (
              <>
                <span>·</span>
                <span className="text-signal">{post.guest}</span>
              </>
            )}
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-6xl leading-[1.02] tracking-snug text-bone">
            {post.title}
          </h1>
          <p className="mt-6 font-mono text-base leading-relaxed text-ghost">
            {post.description}
          </p>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-6 md:px-10 py-12 md:py-16">
        <div className="article" dangerouslySetInnerHTML={{ __html: html }} />

        {/* Listen CTA back to the episode */}
        {ep && ep.released && (
          <div className="mt-16 border-t border-edge pt-10">
            <div className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-ghost">
              The full conversation
            </div>
            <Link
              href={`/episodes/${ep.slug}`}
              className="group mt-4 flex items-baseline justify-between gap-6 border-b border-edge pb-6 hover:border-signal transition-colors"
            >
              <span className="font-display text-2xl md:text-3xl leading-tight text-bone group-hover:text-signal transition-colors">
                {ep.guest} — {ep.title}
              </span>
              <span className="font-condensed text-base tracking-wider text-signal whitespace-nowrap">
                Listen →
              </span>
            </Link>
          </div>
        )}

        {/* More from this guest */}
        {related.length > 0 && post.guestSlug && (
          <div className="mt-16 border-t border-edge pt-10">
            <div className="flex items-baseline justify-between gap-6">
              <div className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-ghost">
                More from {post.guest}
              </div>
              <Link
                href={`/blog/guest/${post.guestSlug}`}
                className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-signal hover:text-bone transition-colors whitespace-nowrap"
              >
                All →
              </Link>
            </div>
            <div className="mt-5 divide-y divide-edge">
              {related.slice(0, 5).map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex items-baseline justify-between gap-6 py-4"
                >
                  <span className="font-display text-lg md:text-xl leading-snug text-bone group-hover:text-signal transition-colors">
                    {p.title}
                  </span>
                  {p.topic && (
                    <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-ghost whitespace-nowrap">
                      {p.topic}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
