import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d0d0d",
        bone: "#f0f0f0",
        signal: "#ff4d4d",
        ghost: "rgba(255,255,255,0.3)",
        whisper: "rgba(255,255,255,0.06)",
        edge: "rgba(255,255,255,0.12)",
      },
      fontFamily: {
        display: ['"Playfair Display"', "ui-serif", "Georgia", "serif"],
        mono: ['"Space Mono"', "ui-monospace", "Menlo", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        snug: "-0.02em",
      },
      fontSize: {
        "display-xs": ["clamp(2rem, 5vw, 3.75rem)", { lineHeight: "0.95" }],
        "display-sm": ["clamp(2.5rem, 6.5vw, 5rem)", { lineHeight: "0.92" }],
        "display-md": ["clamp(3rem, 8vw, 6.5rem)", { lineHeight: "0.9" }],
        "display-lg": ["clamp(3.25rem, 10vw, 9rem)", { lineHeight: "0.86" }],
      },
      animation: {
        flicker: "flicker 2.4s infinite",
        "fade-up": "fadeUp 1.1s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        "fade-in": "fadeIn 1.4s ease-out both",
        marquee: "marquee 60s linear infinite",
        "scan-drift": "scanDrift 8s linear infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "8%": { opacity: "0.45" },
          "12%": { opacity: "1" },
          "20%": { opacity: "0.7" },
          "23%": { opacity: "1" },
          "60%": { opacity: "0.85" },
          "64%": { opacity: "1" },
          "82%": { opacity: "0.6" },
          "86%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scanDrift: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(4px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
