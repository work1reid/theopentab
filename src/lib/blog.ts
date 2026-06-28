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
  guestSlug?: string;
  episodeSlug?: string;
  pillar?: boolean;
  topic?: string;
  keywords?: string[];
  ogImage?: string;
  draft?: boolean;
  content: string;
  readingMinutes: number;
};

export type GuestGroup = {
  guest: string;
  guestSlug: string;
  ogImage?: string;
  episodeSlug?: string;
  pillar: BlogPost | null;
  clusters: BlogPost[];
  all: BlogPost[];
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
    guestSlug: data.guestSlug,
    episodeSlug: data.episodeSlug,
    pillar: data.pillar ?? false,
    topic: data.topic,
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

// The article that covers a given episode (its pillar), for cross-linking.
export function getPostByEpisode(episodeSlug: string): BlogPost | null {
  const posts = getAllPosts().filter((p) => p.episodeSlug === episodeSlug);
  return posts.find((p) => p.pillar) ?? posts[0] ?? null;
}

// Group posts by guest, separating the pillar from the topic clusters.
export function getGuestGroups(): GuestGroup[] {
  const byGuest = new Map<string, BlogPost[]>();
  for (const p of getAllPosts()) {
    const key = p.guestSlug ?? "other";
    if (!byGuest.has(key)) byGuest.set(key, []);
    byGuest.get(key)!.push(p);
  }
  const groups: GuestGroup[] = [];
  for (const [guestSlug, posts] of byGuest) {
    const pillar = posts.find((p) => p.pillar) ?? null;
    const clusters = posts.filter((p) => !p.pillar);
    groups.push({
      guest: posts[0].guest ?? guestSlug,
      guestSlug,
      ogImage: pillar?.ogImage ?? posts[0].ogImage,
      episodeSlug: pillar?.episodeSlug ?? posts[0].episodeSlug,
      pillar,
      clusters,
      all: posts,
    });
  }
  // Most recently active guests first
  return groups.sort((a, b) => {
    const ad = a.all[0]?.date ?? "";
    const bd = b.all[0]?.date ?? "";
    return ad < bd ? 1 : -1;
  });
}

export function getGuestGroup(guestSlug: string): GuestGroup | null {
  return getGuestGroups().find((g) => g.guestSlug === guestSlug) ?? null;
}

// Sibling cluster posts for the same guest (excluding the current one).
export function getRelatedPosts(post: BlogPost): BlogPost[] {
  if (!post.guestSlug) return [];
  return getAllPosts().filter(
    (p) => p.guestSlug === post.guestSlug && p.slug !== post.slug,
  );
}
