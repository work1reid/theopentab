import VideoHero from "@/components/VideoHero";
import StatementIntro from "@/components/StatementIntro";
import EpisodeList from "@/components/EpisodeList";
import SubscribeBand from "@/components/SubscribeBand";
import Timeline from "@/components/Timeline";
import { episodes } from "@/lib/episodes";

export default function Home() {
  return (
    <>
      <VideoHero />
      <StatementIntro />
      <section className="border-t border-edge">
        <div
          data-reveal
          className="mx-auto max-w-[1600px] px-6 md:px-10 py-8 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6"
        >
          <span className="tick font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase shrink-0">
            As heard
          </span>
          <p className="font-condensed text-lg sm:text-xl lg:text-2xl leading-snug text-bone/70">
            Guest 01 went viral to{" "}
            <span className="kw">2M+ views</span> — Lukas Graham and Crowded
            House took notice.
          </p>
        </div>
      </section>
      <EpisodeList episodes={episodes} />
      <SubscribeBand />
      <Timeline />
    </>
  );
}
