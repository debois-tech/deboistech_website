import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publishedPosts } from "@/lib/content";
import { BlogDetail } from "@/components/blog/blog-detail";

// Static export: every slug must be known at build time.
export const dynamicParams = false;

// params is a Promise in Next.js 16 — synchronous access was removed.
interface Props {
  params: Promise<{ slug: string }>;
}

// Static export rejects an empty list, so fall back to a placeholder slug
// that renders the 404 until the first post is published.
export function generateStaticParams() {
  return publishedPosts.length > 0
    ? publishedPosts.map((post) => ({ slug: post.slug }))
    : [{ slug: "_" }];
}

const findPost = (slug: string) => publishedPosts.find((post) => post.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return { title: "Post not found", robots: { index: false, follow: false } };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blogs/${post.slug}`,
      publishedTime: post.publishedDate,
      authors: [post.authorName],
      tags: post.tags,
      images: post.thumbnail ? [{ url: post.thumbnail }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.thumbnail ? [post.thumbnail] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();
  return <BlogDetail post={post} />;
}
