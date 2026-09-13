import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/queries/blog";
import { SITE_URL } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // `satisfies` keeps the changeFrequency literals from widening to
  // `string` when the array is mapped over.
  const staticPages: MetadataRoute.Sitemap = (
    [
      { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
      { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${SITE_URL}/products`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${SITE_URL}/blogs`, changeFrequency: "weekly", priority: 0.9 },
      { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
      { url: `${SITE_URL}/faq`, changeFrequency: "monthly", priority: 0.7 },
      { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.6 },
      { url: `${SITE_URL}/careers`, changeFrequency: "monthly", priority: 0.5 },
      {
        url: `${SITE_URL}/privacy-policy`,
        changeFrequency: "yearly",
        priority: 0.2,
      },
    ] satisfies MetadataRoute.Sitemap
  ).map((page) => ({ ...page, lastModified: now }));

  // Products have no per-slug route yet, so only blog posts are expanded.
  const blogSlugs = await getAllSlugs();
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blogs/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
