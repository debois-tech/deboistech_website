import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { BlogPost, BlogStats } from "@/lib/types";

// Blog content lives entirely in Supabase — there is no static
// fallback, so before the project is provisioned these resolve
// empty and the blog surfaces render their empty state.

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_date", { ascending: false });
    if (error) throw error;
    return (data ?? []) as BlogPost[];
  } catch (cause) {
    console.error("[queries/blog] getPublishedPosts failed:", cause);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw error;
    return (data ?? null) as BlogPost | null;
  } catch (cause) {
    console.error(`[queries/blog] getPostBySlug(${slug}) failed:`, cause);
    return null;
  }
}

export async function getPostStats(postId: string): Promise<BlogStats | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_stats")
      .select("*")
      .eq("post_id", postId)
      .maybeSingle();
    if (error) throw error;
    return (data ?? null) as BlogStats | null;
  } catch (cause) {
    console.error(`[queries/blog] getPostStats(${postId}) failed:`, cause);
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("status", "published");
    if (error) throw error;
    return data?.map((post) => post.slug as string) ?? [];
  } catch (cause) {
    console.error("[queries/blog] getAllSlugs failed:", cause);
    return [];
  }
}
