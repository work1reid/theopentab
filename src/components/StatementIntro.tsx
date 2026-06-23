import Link from "next/link";
import PortraitWaveform from "@/components/PortraitWaveform";

export default function StatementIntro() {
  return (
    <section className="border-t border-edge">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Statement — condensed caps with signal keywords + one Playfair-italic phrase */}
        <div data-reveal className="lg:col-span-7">
          <div className="tick font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase mb-8">
            What this is
          </div>
          <h2 className="font-condensed text-[2rem] sm:text-[2.75rem] lg:text-[3.4rem] leading-[0.98] text-bone/55">
            The Open Tab is a <span className="kw">long-form</span> interview
            podcast hosted by <span className="kw">Max Reid</span>, unearthing
            the <span className="kw">uncommon</span> stories of people{" "}
            <span className="font-display italic lowercase tracking-normal text-signal normal-case">
              worth listening to
            </span>
            . Recorded <span className="kw">raw</span>, edited honest — in
            Forbes, NSW.
          </h2>
          <Link href="/about" className="btn-pill mt-12">
            About Max
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Portrait + waveform */}
        <div data-reveal data-reveal-delay="130" className="lg:col-span-5">
          <div className="relative">
            <div className="relative aspect-[4/5] bg-whisper border border-edge overflow-hidden scanlines">
              <img
                src="/portrait-max.jpg"
                alt="Max Reid, host of The Open Tab, in Forbes, NSW"
                className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/10" />
              <div className="absolute top-5 left-5 font-mono text-[0.72rem] tracking-[0.22em] text-bone/85 uppercase">
                ● Max Reid
              </div>
              <div className="absolute bottom-5 right-5 font-mono text-[0.72rem] tracking-[0.22em] text-bone/85 uppercase">
                Host
              </div>
            </div>
            {/* Waveform — fills with scroll progress as the portrait passes by */}
            <PortraitWaveform />
          </div>
        </div>
      </div>
    </section>
  );
}
