export default function AboutPage() {
  return (
    <>
      <section className="relative scanlines">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-10 md:pt-14 pb-10">
          <div className="flex items-center justify-between font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase reveal">
            <span>About · 001</span>
            <span>The Host · Max Reid</span>
          </div>

          <h1 className="mt-8 md:mt-12 font-display font-black tracking-tightest leading-[0.86] text-display-md reveal reveal-2">
            <span className="block">Hi, I'm</span>
            <span className="block italic text-signal font-normal">Max.</span>
          </h1>
        </div>
        <div className="border-t border-edge" />
      </section>

      <section className="mx-auto max-w-[1600px] px-6 md:px-10 pt-12 md:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* Portrait */}
          <div className="md:col-span-4">
            <div className="aspect-[3/4] bg-whisper border border-edge relative overflow-hidden scanlines">
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase">
                Portrait pending
              </div>
              <div className="absolute top-4 left-4 font-mono text-[0.6rem] tracking-[0.22em] text-ghost uppercase">
                ID · Max Reid
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[0.6rem] tracking-[0.22em] text-ghost uppercase">
                Forbes, NSW
              </div>
            </div>

            <dl className="mt-10 space-y-4 font-mono text-xs">
              <div className="flex items-baseline justify-between gap-4 border-b border-edge pb-3">
                <dt className="text-ghost uppercase text-[0.6rem] tracking-[0.22em]">
                  Age
                </dt>
                <dd className="text-bone">18</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-edge pb-3">
                <dt className="text-ghost uppercase text-[0.6rem] tracking-[0.22em]">
                  Based
                </dt>
                <dd className="text-bone">Forbes, NSW</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-edge pb-3">
                <dt className="text-ghost uppercase text-[0.6rem] tracking-[0.22em]">
                  Day job
                </dt>
                <dd className="text-bone">Reid Exterior</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-edge pb-3">
                <dt className="text-ghost uppercase text-[0.6rem] tracking-[0.22em]">
                  Show
                </dt>
                <dd className="text-bone">The Open Tab</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-ghost uppercase text-[0.6rem] tracking-[0.22em]">
                  Since
                </dt>
                <dd className="text-bone">2026</dd>
              </div>
            </dl>
          </div>

          {/* Long-form */}
          <div className="md:col-span-8">
            <div className="space-y-12 max-w-2xl">
              <div>
                <div className="tick font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-4">
                  Who I am
                </div>
                <p className="font-display text-xl md:text-2xl leading-snug tracking-snug text-bone/90">
                  I'm Max. I'm eighteen and I live in Forbes, a small town in
                  rural NSW. I run a window-cleaning and exterior-services
                  business in the day. At night I sit people down and ask them
                  real questions.
                </p>
              </div>

              <div>
                <div className="tick font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-4">
                  What this is
                </div>
                <p className="font-mono text-sm md:text-base text-bone/80 leading-relaxed">
                  The Open Tab is what I named the list I kept in my head
                  (and a real tab on my laptop) for three years — people I
                  wanted to put in front of a microphone before anyone else
                  did. People who have something real to say but don't
                  usually get asked.
                </p>
                <p className="mt-6 font-mono text-sm md:text-base text-bone/80 leading-relaxed">
                  The format is long. Two-plus hours, edited honestly. The
                  guest sits down. We talk. Nothing is scripted. I do a lot
                  of research beforehand so when we sit down I can ask
                  things they don't expect.
                </p>
              </div>

              <div>
                <div className="tick font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-4">
                  Why I'm doing this
                </div>
                <p className="font-mono text-sm md:text-base text-bone/80 leading-relaxed">
                  Forbes has 8,000 people in it. Some of them have lived
                  extraordinary lives nobody outside their families knows
                  about. I want their stories on tape. That's it. That's the
                  whole thing.
                </p>
              </div>

              <div>
                <div className="tick font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-4">
                  How to reach me
                </div>
                <p className="font-mono text-sm md:text-base text-bone/80 leading-relaxed">
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

        {/* Big pull quote */}
        <div className="mt-32 border-t border-edge pt-20">
          <div className="max-w-4xl">
            <div className="font-display text-signal text-7xl md:text-9xl leading-none">
              "
            </div>
            <blockquote className="font-display text-2xl md:text-4xl leading-tight tracking-snug -mt-8 md:-mt-12">
              I just want to record the conversation that{" "}
              <span className="italic text-signal">
                doesn't usually happen.
              </span>
            </blockquote>
            <div className="mt-10 font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase">
              — Max, on starting the show
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
