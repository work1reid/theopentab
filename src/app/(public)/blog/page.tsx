import Link from "next/link";
import SubscribeBand from "@/components/SubscribeBand";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Writing",
  description:
    "Deep-dives, guest stories and highlights from The Open Tab — long-form interviews recorded raw in Forbes, NSW by Max Reid.",
  alternates: { canonical: "/blog" },
};

function fmt(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <section className="scanlines border-b border-edge">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-12 md:pt-20 pb-12 md:pb-16">
          <div className="tick font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase reveal">
            Writing · {posts.length} {posts.length === 1 ? "piece" : "pieces"}
          </div>
          <h1 className="mt-6 md:mt-8 font-condensed text-6xl md:text-8xl lg:text-9xl leading-[0.86] text-bone reveal reveal-2">
            The{" "}
            <span className="font-display italic lowercase tracking-normal normal-case text-signal">
              long read.
            </span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 md:px-10 py-12 md:py-20">
        {posts.length === 0 ? (
          <p className="font-mono text-sm text-ghost">Nothing published yet.</p>
        ) : (
          <div className="divide-y divide-edge">
            {posts.map((p, i) => (
              <article key={p.slug} data-reveal data-reveal-delay={`${i * 60}`}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-8 md:py-12"
                >
                  <div className="md:col-span-3 font-mono text-[0.72rem] tracking-[0.22em] uppercase text-ghost">
                    <div>{fmt(p.date)}</div>
                    <div className="mt-2">{p.readingMinutes} min read</div>
                    {p.guest && <div className="mt-2 text-signal">{p.guest}</div>}
                    {p.draft && (
                      <div className="mt-2 text-signal border border-signal/40 inline-block px-2 py-0.5">
                        Draft
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-9">
                    <h2 className="font-display text-3xl md:text-5xl leading-[1.02] tracking-snug text-bone transition-colors group-hover:text-signal">
                      {p.title}
                    </h2>
                    <p className="mt-4 max-w-3xl font-mono text-[0.92rem] leading-relaxed text-ghost">
                      {p.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 font-condensed text-base tracking-wider text-signal">
                      Read <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <SubscribeBand />
    </>
  );
}
