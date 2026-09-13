import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The studio is the authenticated editor — nothing to index.
        disallow: ["/studio", "/auth"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
