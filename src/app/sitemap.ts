import type { MetadataRoute } from "next";
import { episodes } from "@/lib/episodes";
import { getAllPosts, getGuestGroups } from "@/lib/blog";

const SITE_URL = "https://theopentab.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/episodes",
    "/blog",
    "/about",
    "/members",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const episodeRoutes: MetadataRoute.Sitemap = episodes.map((e) => ({
    url: `${SITE_URL}/episodes/${e.slug}`,
    lastModified: e.date ? new Date(e.date) : new Date(),
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
  }));

  const guestRoutes: MetadataRoute.Sitemap = getGuestGroups().map((g) => ({
    url: `${SITE_URL}/blog/guest/${g.guestSlug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...episodeRoutes, ...blogRoutes, ...guestRoutes];
}
