import Link from "next/link";

export default function StatementIntro() {
  return (
    <section className="border-t border-edge">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Statement */}
        <div className="lg:col-span-7">
          <div className="tick font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase mb-8">
            What this is
          </div>
          <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-snug">
            The Open Tab is a{" "}
            <span className="italic text-signal">long-form</span> interview
            podcast hosted by an{" "}
            <span className="italic text-signal">eighteen-year-old</span> in
            Forbes, NSW — unearthing the{" "}
            <span className="italic text-signal">uncommon</span> stories of
            people worth listening to. Recorded{" "}
            <span className="italic text-signal">raw</span>, edited honest.
          </p>
          <Link
            href="/about"
            className="mt-12 inline-flex items-center gap-3 font-mono text-[0.8rem] tracking-[0.22em] uppercase text-bone hover:text-signal transition-colors group"
          >
            <span className="w-8 h-px bg-current transition-all group-hover:w-12" />
            About Max
            <span className="text-signal">→</span>
          </Link>
        </div>

        {/* Portrait */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] bg-whisper border border-edge overflow-hidden scanlines">
            <div className="absolute inset-0 flex items-center justify-center font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase">
              Portrait pending
            </div>
            <div className="absolute top-5 left-5 font-mono text-[0.72rem] tracking-[0.22em] text-bone/60 uppercase">
              ● Max Reid
            </div>
            <div className="absolute bottom-5 right-5 font-mono text-[0.72rem] tracking-[0.22em] text-bone/60 uppercase">
              Host
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
