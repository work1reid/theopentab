import EpisodeList from "@/components/EpisodeList";
import { episodes } from "@/lib/episodes";

export default function EpisodesPage() {
  return (
    <>
      {/* Header */}
      <section className="scanlines border-b border-edge">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-12 md:pt-20 pb-12 md:pb-16">
          <div className="tick font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase reveal">
            Directory · {episodes.length} entries
          </div>
          <h1 className="mt-6 md:mt-8 font-condensed text-6xl md:text-8xl lg:text-9xl leading-[0.86] text-bone reveal reveal-2">
            Every{" "}
            <span className="font-display italic lowercase tracking-normal normal-case text-signal">
              conversation.
            </span>
          </h1>
        </div>
      </section>

      {/* Editorial list (released + coming soon) */}
      <EpisodeList episodes={episodes} showHeading={false} />
    </>
  );
}
