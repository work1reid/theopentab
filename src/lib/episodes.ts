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
  spotify: string;
  apple: string;
  youtube: string;
  highlights: string[];
};

export const episodes: Episode[] = data as Episode[];

export const latest = episodes[0];

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
