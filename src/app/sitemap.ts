import type { MetadataRoute } from "next";
import { episodes } from "@/lib/episodes";

const SITE_URL = "https://theopentab.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/episodes",
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

  return [...staticRoutes, ...episodeRoutes];
}
