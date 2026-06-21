import Link from "next/link";
import { Episode, formatDate } from "@/lib/episodes";

type Props = {
  episode: Episode;
  variant?: "grid" | "list";
};

export default function EpisodeCard({ episode, variant = "grid" }: Props) {
  const upcoming = !episode.released;

  if (variant === "list") {
    return (
      <div className="ep-card group relative border-t border-edge py-8 md:py-10 hover:bg-whisper transition-colors">
        {/* Stretched link covers the whole row without nesting other anchors */}
        <Link
          href={upcoming ? "/episodes" : `/episodes#${episode.slug}`}
          aria-label={`${episode.guest} — ${episode.title}`}
          className="absolute inset-0 z-0"
        />
        <div className="grid grid-cols-12 gap-6 items-baseline pointer-events-none">
          <div className="col-span-3 md:col-span-2">
            <div className="ep-num font-display text-5xl md:text-6xl leading-none transition-colors">
              {episode.number}
            </div>
            <div className="mt-2 font-mono text-[0.72rem] tracking-[0.22em] text-ghost uppercase">
              {formatDate(episode.date)}
            </div>
          </div>

          <div className="col-span-9 md:col-span-7">
            <div className="font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase mb-2">
              Guest · {episode.guest}
            </div>
            <h3 className="font-display text-xl md:text-2xl leading-snug tracking-snug text-bone group-hover:text-signal transition-colors">
              {episode.title}
            </h3>
            <p className="mt-3 font-mono text-sm text-ghost max-w-prose leading-relaxed">
              {episode.tagline}
            </p>
          </div>

          <div className="hidden md:flex md:col-span-3 flex-col items-end gap-3">
            <div className="font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase">
              {episode.duration}
            </div>
            {!upcoming && (
              <div className="flex items-center gap-2 font-mono text-[0.74rem] tracking-[0.22em] uppercase text-bone pointer-events-auto relative z-10">
                <a href={episode.spotify} target="_blank" rel="noopener noreferrer" className="hover:text-signal">SPF</a>
                <span className="text-ghost">·</span>
                <a href={episode.apple} target="_blank" rel="noopener noreferrer" className="hover:text-signal">APL</a>
                <span className="text-ghost">·</span>
                <a href={episode.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-signal">YT</a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={upcoming ? "/episodes" : `/episodes#${episode.slug}`}
      className="ep-card group block border border-edge p-6 md:p-7 relative overflow-hidden"
    >
      <div className="watermark absolute -top-6 -right-2 text-[12rem] leading-none select-none">
        {episode.number}
      </div>

      <div className="flex items-center justify-between font-mono text-[0.72rem] tracking-[0.22em] uppercase text-ghost relative z-10">
        <span>EP · {episode.number}</span>
        <span>{formatDate(episode.date)}</span>
      </div>

      <div className="mt-12 md:mt-16 relative z-10">
        <div className="font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase mb-2">
          Guest
        </div>
        <div className="font-display text-2xl md:text-3xl leading-tight tracking-snug">
          {upcoming ? (
            <span className="text-ghost italic">{episode.guest}</span>
          ) : (
            episode.guest
          )}
        </div>
        <p className="mt-4 font-mono text-sm text-ghost leading-relaxed line-clamp-3">
          {episode.tagline}
        </p>
      </div>

      <div className="mt-8 pt-4 border-t border-edge flex items-center justify-between font-mono text-[0.72rem] tracking-[0.22em] uppercase relative z-10">
        <span className="text-ghost">{episode.duration}</span>
        <span className="text-bone group-hover:text-signal transition-colors">
          {upcoming ? "Notify" : "Listen →"}
        </span>
      </div>
    </Link>
  );
}
