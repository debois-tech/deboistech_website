import { publishedPosts, site as SITE, SITE_URL } from "@/lib/content";

export const dynamic = "force-static";

/** Wrap in CDATA, guarding against a literal "]]>" inside the content. */
function cdata(value: string): string {
  return `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const posts = publishedPosts;

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blogs/${post.slug}`;
      const published = new Date(post.publishedDate);
      const pubDate = Number.isNaN(published.getTime())
        ? new Date().toUTCString()
        : published.toUTCString();

      return [
        "    <item>",
        `      <title>${cdata(post.title)}</title>`,
        `      <description>${cdata(post.description)}</description>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <author>${cdata(post.authorName)}</author>`,
        ...post.tags.map((tag) => `      <category>${cdata(tag)}</category>`),
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${cdata(`${SITE.name} Blog`)}</title>
    <link>${SITE_URL}/blogs</link>
    <description>${cdata("AI, DevOps, web and general tech insights from deboistech.")}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
