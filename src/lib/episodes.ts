import data from "@/data/episodes.json";

export type Episode = {
  number: string;
  slug: string;
  guest: string;
  title: string;
  tagline: string;
  description: string;
  date: string;
  duration: string;
  city: string;
  released: boolean;
  image: string;
  spotify: string;
  apple: string;
  youtube: string;
  highlights: string[];
};

export const episodes: Episode[] = data as Episode[];

// Newest released episode (highest number), not just the first in the list.
export const latest =
  [...episodes]
    .filter((e) => e.released)
    .sort((a, b) => Number(b.number) - Number(a.number))[0] ?? episodes[0];

export function getEpisode(slug: string): Episode | undefined {
  return episodes.find((e) => e.slug === slug);
}

export function youtubeId(url: string): string | null {
  if (!url || url === "#") return null;
  const m =
    url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/) ||
    [];
  return m[1] ?? null;
}

export function spotifyEmbed(url: string): string | null {
  if (!url || url === "#") return null;
  const m = url.match(/open\.spotify\.com\/(episode|show)\/([A-Za-z0-9]+)/);
  if (!m) return null;
  return `https://open.spotify.com/embed/${m[1]}/${m[2]}`;
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d
    .toLocaleDateString("en-AU", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
    .toUpperCase();
}
