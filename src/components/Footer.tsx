import Link from "next/link";

const socials = [
  { label: "Instagram", handle: "@_theopentab", href: "https://instagram.com/_theopentab" },
  { label: "TikTok", handle: "@_theopentab", href: "https://tiktok.com/@_theopentab" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-edge mt-32">
      <div className="hr-static" />
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="font-mono text-[0.78rem] tracking-[0.22em] text-ghost uppercase mb-4 tick">
              The Open Tab
            </div>
            <p className="font-display text-3xl md:text-4xl leading-[1.05] tracking-snug">
              Unearthing the<br />
              <span className="italic text-signal">uncommon.</span>
            </p>
            <p className="mt-6 font-mono text-base text-bone/70 max-w-sm leading-relaxed">
              Long conversations with people worth listening to.
              Hosted by Max Reid. Recorded in Forbes, NSW.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <div className="font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase mb-4">
              Follow
            </div>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-baseline gap-3 font-mono text-sm text-bone hover:text-signal transition-colors"
                  >
                    <span className="font-display italic text-base">
                      {s.label}
                    </span>
                    <span className="text-ghost group-hover:text-signal transition-colors">
                      {s.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase mb-4">
              Listen
            </div>
            <ul className="space-y-2 font-mono text-sm">
              <li>
                <a
                  className="text-bone hover:text-signal transition-colors"
                  href="https://open.spotify.com/show/033nHRXHfv7gCGhAjSMCog"
                  target="_blank"
                  rel="noreferrer"
                >
                  Spotify
                </a>
              </li>
              <li>
                <a
                  className="text-bone hover:text-signal transition-colors"
                  href="https://podcasts.apple.com/us/podcast/the-open-tab/id1896832387"
                  target="_blank"
                  rel="noreferrer"
                >
                  Apple Podcasts
                </a>
              </li>
              <li>
                <a
                  className="text-bone hover:text-signal transition-colors"
                  href="https://www.youtube.com/@the_opentab"
                  target="_blank"
                  rel="noreferrer"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase">
            © 2026 The Open Tab · Forbes NSW
          </div>
          <div
            className="font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase"
            suppressHydrationWarning
          >
            Transmission · Studio One · {new Date().toLocaleDateString("en-AU")}
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-t border-edge py-3">
        <div className="marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-12 pr-12 font-display italic text-2xl text-bone/30"
            >
              <span>The Open Tab</span>
              <span className="text-signal">●</span>
              <span>Episode 01 · Cameron Sharp</span>
              <span className="text-signal">●</span>
              <span>Now Streaming</span>
              <span className="text-signal">●</span>
              <span>Forbes NSW</span>
              <span className="text-signal">●</span>
              <span>Unearthing the uncommon</span>
              <span className="text-signal">●</span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
