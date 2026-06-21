import type { Metadata } from "next";
import "./globals.css";
import FilmGrain from "@/components/FilmGrain";

const SITE_URL = "https://theopentab.vercel.app";
const SITE_DESC =
  "Long-form interview podcast hosted by Max Reid in Forbes, NSW. Conversations with people worth listening to.";

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
    images: [{ url: "/ep1-cameron.jpg", alt: "The Open Tab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Open Tab — Unearthing the uncommon",
    description: SITE_DESC,
    images: ["/ep1-cameron.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-ink text-bone min-h-screen relative">
        <FilmGrain />
        {children}
      </body>
    </html>
  );
}
