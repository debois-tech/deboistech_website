import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getPostBySlug, getPostStats } from "@/lib/queries/blog";
import { BlogDetail } from "@/components/blog/blog-detail";

// params is a Promise in Next.js 16 — synchronous access was removed.
interface Props {
  params: Promise<{ slug: string }>;
}

// generateMetadata and the page both need the post. React's cache
// dedupes them into a single query per request.
const loadPost = cache(getPostBySlug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);

  if (!post) {
    return { title: "Post not found", robots: { index: false, follow: false } };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blogs/${post.slug}`,
      publishedTime: post.published_date ?? undefined,
      modifiedTime: post.updated_at ?? undefined,
      authors: [post.author_name],
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
  const post = await loadPost(slug);

  if (!post) notFound();

  const stats = await getPostStats(post.id);

  return <BlogDetail post={post} stats={stats} />;
}
