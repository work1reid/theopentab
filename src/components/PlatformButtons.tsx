const platforms = [
  { label: "Spotify", code: "SPF", href: "#" },
  { label: "Apple Podcasts", code: "APL", href: "#" },
  { label: "YouTube", code: "YT", href: "#" },
];

export default function PlatformButtons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {platforms.map((p) => (
        <a key={p.label} href={p.href} className="btn-platform">
          <span className="dot-corner" aria-hidden />
          <span>{p.label}</span>
          <span className="text-ghost ml-2 text-[0.6rem]">{p.code}</span>
        </a>
      ))}
    </div>
  );
}
