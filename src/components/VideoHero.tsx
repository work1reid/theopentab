export default function VideoHero() {
  return (
    <section className="relative h-[calc(100svh-4rem)] min-h-[520px] w-full overflow-hidden scanlines">
      {/* Video layer — the episode intro montage */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero/intro.mp4"
        poster="/hero/intro-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Tints for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/45" />
      <div className="absolute inset-0 bg-ink/25" />

      {/* Bottom-anchored wordmark + status line */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pb-12 md:pb-14">
          <div className="flex items-center gap-4 font-mono text-[0.6rem] tracking-[0.22em] text-bone/70 uppercase mb-3">
            <span className="tick">A podcast hosted by Max Reid</span>
            <span className="hidden md:inline text-bone/40">·</span>
            <span className="hidden md:inline text-bone/40">Forbes, NSW</span>
            <span className="hidden lg:inline text-bone/40">·</span>
            <span className="hidden lg:inline text-bone/40">FRQ 89.7</span>
          </div>
          <h1 className="font-display font-black tracking-tightest leading-[0.82] text-bone drop-shadow-[0_2px_30px_rgba(0,0,0,0.6)]">
            <span className="block text-[clamp(2.75rem,7.5vw,7rem)]">The Open</span>
            <span className="block text-[clamp(2.75rem,7.5vw,7rem)] italic text-signal font-normal">
              Tab.
            </span>
          </h1>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-5 right-6 md:right-10 z-10 flex items-center gap-2">
        <span className="font-mono text-[0.55rem] tracking-[0.3em] text-bone/60 uppercase">
          Scroll
        </span>
        <span className="text-signal animate-bounce text-sm">↓</span>
      </div>
    </section>
  );
}
