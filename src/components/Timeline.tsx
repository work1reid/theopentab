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
        <div className="tick font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase mb-4">
          The story so far
        </div>
        <h2 className="font-condensed text-5xl md:text-7xl lg:text-8xl text-bone mb-16 md:mb-24">
          From an{" "}
          <span className="font-display italic lowercase tracking-normal text-signal normal-case">
            open tab.
          </span>
        </h2>

        {/* Vertical rail */}
        <div className="relative ml-2 border-l border-edge pl-8 md:pl-14">
          {milestones.map((m, i) => (
            <div
              key={m.year + m.title}
              data-reveal
              data-reveal-delay={`${i * 90}`}
              className="relative pb-16 last:pb-0 md:pb-24"
            >
              {/* Node on the rail */}
              <span className="absolute -left-[33px] top-3 h-2.5 w-2.5 rounded-full bg-signal md:-left-[57px]" />

              <div className="font-condensed text-signal text-6xl md:text-8xl leading-none">
                {m.year}
              </div>
              <div className="mt-4 font-mono text-[0.72rem] tracking-[0.22em] text-ghost uppercase">
                ● {m.place}
              </div>
              <h3 className="mt-5 font-display text-2xl md:text-4xl leading-tight tracking-snug text-bone">
                {m.title}
              </h3>
              <p className="mt-4 max-w-2xl font-mono text-sm md:text-base text-ghost leading-relaxed">
                {m.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
