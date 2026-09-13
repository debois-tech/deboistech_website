import Link from "next/link";
import { BlogCard } from "@/components/blog/blog-card";
import { domainLabel } from "@/lib/format";
import type { BlogDomain, BlogPost } from "@/lib/types";

const DOMAINS: BlogDomain[] = ["ml", "devops", "web", "general"];

/**
 * Groups published posts by domain. Takes posts as a prop rather than
 * querying, so the page owns data fetching and this stays renderable
 * from anywhere (including the empty-state path).
 */
export function BlogSections({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-6 py-20 text-center">
        <h2 className="text-lg font-semibold text-gray-700">
          No posts published yet
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
          We&apos;re working on our first articles about AI, DevOps, and modern web
          engineering. Check back soon.
        </p>
        <Link href="/contact" className="btn-secondary mt-8">
          Talk to us instead &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-20">
      {DOMAINS.map((domain) => {
        const items = posts.filter((post) => post.domain === domain);
        if (items.length === 0) return null;

        return (
          <section key={domain} id={domain}>
            <h2 className="section-heading">{domainLabel(domain)}</h2>
            <div className="mobile-scroll mt-8 gap-8 md:grid-cols-3">
              {items.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
