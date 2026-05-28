import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FilmGrain from "@/components/FilmGrain";

export const metadata: Metadata = {
  title: "The Open Tab — Unearthing the uncommon",
  description:
    "Long-form interview podcast hosted by Max Reid in Forbes, NSW. Conversations with people worth listening to.",
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
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
