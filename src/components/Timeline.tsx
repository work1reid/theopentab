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
        <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-snug mb-16 md:mb-20">
          From an <span className="italic text-signal">open tab.</span>
        </h2>

        <div className="border-t border-edge">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 border-b border-edge py-10 md:py-12"
            >
              {/* Year + place */}
              <div className="md:col-span-4">
                <div className="font-display font-black text-signal text-5xl md:text-7xl leading-none tracking-tightest">
                  {m.year}
                </div>
                <div className="mt-3 font-mono text-[0.72rem] tracking-[0.22em] text-ghost uppercase">
                  ● {m.place}
                </div>
              </div>

              {/* Title + body */}
              <div className="md:col-span-8 md:max-w-2xl">
                <h3 className="font-display text-2xl md:text-3xl leading-tight tracking-snug mb-4">
                  {m.title}
                </h3>
                <p className="font-mono text-sm md:text-base text-ghost leading-relaxed">
                  {m.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
