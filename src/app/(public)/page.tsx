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
      <EpisodeList episodes={episodes} />
      <SubscribeBand />
      <Timeline />
    </>
  );
}
