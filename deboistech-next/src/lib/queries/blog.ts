import { createClient } from "@/lib/supabase/server";
import type { BlogPost, BlogStats } from "@/lib/types";

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const { data } = await (await createClient()).from("blog_posts").select("*").eq("status", "published").order("published_date", { ascending: false });
  return (data ?? []) as BlogPost[];
}
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data } = await (await createClient()).from("blog_posts").select("*").eq("slug", slug).eq("status", "published").single();
  return data as BlogPost | null;
}
export async function getPostStats(postId: string): Promise<BlogStats | null> {
  const { data } = await (await createClient()).from("blog_stats").select("*").eq("post_id", postId).single();
  return data as BlogStats | null;
}
export async function getAllSlugs(): Promise<string[]> {
  const { data } = await (await createClient()).from("blog_posts").select("slug").eq("status", "published");
  return data?.map((post) => post.slug) ?? [];
}
