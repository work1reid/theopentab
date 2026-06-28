import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "content/blog");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  guest?: string;
  episodeSlug?: string;
  keywords?: string[];
  ogImage?: string;
  draft?: boolean;
  content: string;
  readingMinutes: number;
};

function parseFile(file: string): BlogPost {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).length;
  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title ?? "Untitled",
    description: data.description ?? "",
    date: data.date ?? "",
    guest: data.guest,
    episodeSlug: data.episodeSlug,
    keywords: data.keywords ?? [],
    ogImage: data.ogImage,
    draft: data.draft ?? false,
    content,
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

// Drafts are hidden in production; visible in local dev for previewing.
const showDrafts = process.env.NODE_ENV !== "production";

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parseFile)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): BlogPost | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}
