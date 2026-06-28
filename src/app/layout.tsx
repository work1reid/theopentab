import type { Metadata } from "next";
import "./globals.css";
import FilmGrain from "@/components/FilmGrain";

const SITE_URL = "https://theopentab.vercel.app";
const SITE_DESC =
  "Long-form interview podcast hosted by Max Reid in Forbes, NSW. Conversations with people worth listening to.";

// Show social/platform links (sourced from Footer.tsx + SubscribeBand.tsx)
const SAME_AS = [
  "https://open.spotify.com/show/033nHRXHfv7gCGhAjSMCog",
  "https://podcasts.apple.com/us/podcast/the-open-tab/id1896832387",
  "https://www.youtube.com/@the_opentab",
  "https://instagram.com/_theopentab",
  "https://tiktok.com/@_theopentab",
];

// PodcastSeries structured data for the whole show
const PODCAST_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  name: "The Open Tab",
  description: SITE_DESC,
  url: SITE_URL,
  image: `${SITE_URL}/ep1-cameron.jpg`,
  author: {
    "@type": "Person",
    name: "Max Reid",
  },
  // host/author are the same person for this show
  // (Person used per schema.org PodcastSeries.author)
  sameAs: SAME_AS,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Open Tab — Unearthing the uncommon",
    template: "%s · The Open Tab",
  },
  description: SITE_DESC,
  openGraph: {
    type: "website",
    siteName: "The Open Tab",
    url: SITE_URL,
    title: "The Open Tab — Unearthing the uncommon",
    description: SITE_DESC,
    images: [
      { url: "/ep1-cameron.jpg", alt: "The Open Tab", width: 1200, height: 630 },
    ],
  },
  twitter: {
    // No X/Twitter account yet — card still renders when others share links.
    // Add `site`/`creator` @handles here once an account exists.
    card: "summary_large_image",
    title: "The Open Tab — Unearthing the uncommon",
    description: SITE_DESC,
    images: ["/ep1-cameron.jpg"],
  },
  verification: {
    google: "uR9UmdSoH7JNlTA-XJr6vTPyZjf7ceDkbVogFKSg3AY",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <body className="bg-ink text-bone min-h-screen relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PODCAST_JSON_LD) }}
        />
        <FilmGrain />
        {children}
      </body>
    </html>
  );
}
