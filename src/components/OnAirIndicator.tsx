type Props = {
  variant?: "nav" | "hero";
};

export default function OnAirIndicator({ variant = "nav" }: Props) {
  const isHero = variant === "hero";
  return (
    <div
      className={`inline-flex items-center gap-2 ${
        isHero ? "px-3 py-1.5 border border-edge" : ""
      }`}
    >
      <span
        className="dot-ring inline-block w-2 h-2 rounded-full bg-signal animate-flicker"
        aria-hidden
      />
      <span
        className={`font-mono uppercase tracking-[0.22em] whitespace-nowrap ${
          isHero
            ? "text-[0.7rem]"
            : "hidden sm:inline text-[0.62rem]"
        } text-bone`}
      >
        On Air
      </span>
    </div>
  );
}
