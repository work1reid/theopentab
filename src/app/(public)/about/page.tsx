export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="scanlines border-b border-edge">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-12 md:pt-20 pb-12 md:pb-16">
          <div className="tick font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase reveal">
            The host · Max Reid
          </div>
          <h1 className="mt-6 md:mt-8 font-condensed text-6xl md:text-8xl lg:text-9xl leading-[0.86] text-bone reveal reveal-2">
            Hi, I&apos;m{" "}
            <span className="font-display italic lowercase tracking-normal normal-case text-signal">
              Max.
            </span>
          </h1>
        </div>
      </section>

      {/* Lead statement */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 pt-14 md:pt-20">
        <h2 className="font-condensed text-[1.9rem] sm:text-4xl lg:text-5xl leading-[1.0] max-w-5xl text-bone/55">
          I&apos;m <span className="kw">eighteen</span> and I live in{" "}
          <span className="kw">Forbes</span>, a small town in rural NSW. I run a
          window-cleaning business by day. At night I sit people down and ask
          them{" "}
          <span className="font-display italic lowercase tracking-normal normal-case text-signal">
            real questions
          </span>
          .
        </h2>
      </section>

      {/* Body — portrait + readable prose */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 pt-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* Portrait + stats */}
          <div className="md:col-span-4">
            <div className="aspect-[3/4] bg-whisper border border-edge relative overflow-hidden scanlines">
              <img
                src="/about-max.jpg"
                alt="Max Reid on the beach in Forbes, NSW"
                className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/10" />
              <div className="absolute top-4 left-4 font-mono text-[0.72rem] tracking-[0.22em] text-bone/80 uppercase">
                ● Max Reid
              </div>
            </div>

            <dl className="mt-10 font-mono">
              {[
                ["Age", "18"],
                ["Based", "Forbes, NSW"],
                ["Day job", "Reid Exterior"],
                ["Since", "2026"],
              ].map(([k, v], i, arr) => (
                <div
                  key={k}
                  className={`flex items-baseline justify-between gap-4 py-4 ${
                    i < arr.length - 1 ? "border-b border-edge" : ""
                  }`}
                >
                  <dt className="text-ghost uppercase text-[0.72rem] tracking-[0.22em]">
                    {k}
                  </dt>
                  <dd className="text-bone text-base">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Prose */}
          <div className="md:col-span-8">
            <div className="space-y-14 max-w-2xl">
              <div>
                <div className="tick font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase mb-5">
                  What this is
                </div>
                <p className="font-mono text-base md:text-lg text-bone/80 leading-relaxed">
                  The Open Tab is what I named the list I kept in my head — and a
                  real tab on my laptop — for three years. People I wanted to put
                  in front of a microphone before anyone else did. People who
                  have something real to say but don&apos;t usually get asked.
                </p>
                <p className="mt-6 font-mono text-base md:text-lg text-bone/80 leading-relaxed">
                  The format is long. Two-plus hours, edited honest. The guest
                  sits down, we talk, nothing is scripted. I do a lot of research
                  beforehand so I can ask things they don&apos;t expect.
                </p>
              </div>

              <div>
                <div className="tick font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase mb-5">
                  Why I&apos;m doing this
                </div>
                <p className="font-mono text-base md:text-lg text-bone/80 leading-relaxed">
                  Forbes has 8,000 people in it. Some of them have lived
                  extraordinary lives nobody outside their families knows about.
                  I want their stories on tape. That&apos;s it. That&apos;s the
                  whole thing.
                </p>
              </div>

              <div>
                <div className="tick font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase mb-5">
                  Get in touch
                </div>
                <p className="font-mono text-base md:text-lg text-bone/80 leading-relaxed">
                  Guest pitches, feedback, hate mail, love mail — DM{" "}
                  <a
                    href="https://instagram.com/_theopentab"
                    className="text-signal hover:underline"
                  >
                    @_theopentab
                  </a>{" "}
                  on Instagram. I read everything.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pull quote */}
        <div className="mt-28 md:mt-40 border-t border-edge pt-16 md:pt-20">
          <blockquote className="font-condensed text-4xl md:text-6xl lg:text-7xl leading-[0.95] max-w-5xl text-bone">
            I just want to record the conversation that{" "}
            <span className="font-display italic lowercase tracking-normal normal-case text-signal">
              doesn&apos;t usually happen.
            </span>
          </blockquote>
          <div className="mt-10 font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase">
            — Max, on starting the show
          </div>
        </div>
      </section>
    </>
  );
}
