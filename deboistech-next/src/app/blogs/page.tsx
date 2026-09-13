import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/queries/blog";
import { BlogSections } from "@/components/blog/blog-sections";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "AI, DevOps, web and general engineering insights from the deboistech team.",
  alternates: {
    canonical: "/blogs",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    title: "Blog — deboistech",
    description:
      "AI, DevOps, web and general engineering insights from the deboistech team.",
    url: "/blogs",
  },
};

export default async function BlogsPage() {
  const posts = await getPublishedPosts();

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="eyebrow">Insights</span>
          <h1 className="section-heading">
            From the <span className="text-primary-600">deboistech</span> blog
          </h1>
          <p className="section-subheading mx-auto">
            What we&apos;re learning about AI, DevOps, cloud infrastructure, and
            modern web engineering.
          </p>
        </div>

        <div className="mt-16">
          <BlogSections posts={posts} />
        </div>
      </div>
    </section>
  );
}
