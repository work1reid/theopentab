const milestones = [
  {
    year: "2023",
    place: "Forbes, NSW",
    title: "The tab opens",
    body: "Max — then 15 — starts a list of people he wants to interview before anyone else does. He texts Cameron Sharp's mum asking her to keep a set of questions secret. She does, for three years.",
  },
  {
    year: "2026",
    place: "Forbes, NSW",
    title: "Turns eighteen, buys the gear",
    body: "Old enough, finally. Max buys a mic, a camera, and a roll of acoustic foam. He sets up a spare room and books the first guest off the list.",
  },
  {
    year: "May 2026",
    place: "Studio One",
    title: "Episode 01 — Cameron Sharp",
    body: "Two hours with a musician who went viral singing to his 96-year-old grandparents. The first tab, finally closed — and the show begins.",
  },
];

export default function Timeline() {
  return (
    <section className="border-t border-edge">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-20 md:py-28">
        <div className="tick font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-4">
          The story so far
        </div>
        <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-snug mb-16 md:mb-24">
          From an <span className="italic text-signal">open tab.</span>
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-edge md:-translate-x-1/2" />

          <div className="space-y-20 md:space-y-32">
            {milestones.map((m, i) => {
              const flip = i % 2 === 1;
              return (
                <div
                  key={m.year}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
                >
                  {/* Year marker */}
                  <div
                    className={`pl-8 md:pl-0 ${
                      flip ? "md:order-2 md:pl-16" : "md:text-right md:pr-16"
                    }`}
                  >
                    <div className="font-display font-black text-signal text-6xl md:text-8xl leading-none tracking-tightest">
                      {m.year}
                    </div>
                    <div className="mt-2 font-mono text-[0.6rem] tracking-[0.22em] text-ghost uppercase">
                      ● {m.place}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`pl-8 md:pl-0 ${
                      flip ? "md:order-1 md:text-right md:pr-16" : "md:pl-16"
                    }`}
                  >
                    <h3 className="font-display text-2xl md:text-3xl leading-tight tracking-snug mb-4">
                      {m.title}
                    </h3>
                    <p
                      className={`font-mono text-xs md:text-sm text-ghost leading-relaxed max-w-md ${
                        flip ? "md:ml-auto" : ""
                      }`}
                    >
                      {m.body}
                    </p>
                  </div>

                  {/* Node dot */}
                  <div className="absolute left-0 md:left-1/2 top-3 md:top-1/2 w-2.5 h-2.5 rounded-full bg-signal -translate-x-[5px] md:-translate-x-1/2 md:-translate-y-1/2 dot-ring" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
