"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { BlogBlock, BlogDomain } from "@/lib/types";

export async function upsertPost(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const id = String(formData.get("id") || "");
  const status = (String(formData.get("status") || "draft")) as "draft" | "published";
  const post = {
    slug: String(formData.get("slug") || ""), title: String(formData.get("title") || ""),
    description: String(formData.get("description") || ""), thumbnail: String(formData.get("thumbnail") || ""),
    thumbnail_alt: String(formData.get("thumbnail_alt") || ""), domain: String(formData.get("domain") || "general") as BlogDomain,
    tags: JSON.parse(String(formData.get("tags") || "[]")) as string[],
    body: JSON.parse(String(formData.get("body") || "[]")) as BlogBlock[], status, author_id: user.id,
    published_date: status === "published" ? new Date().toISOString() : null,
  };
  const result = id ? await supabase.from("blog_posts").update(post).eq("id", id).eq("author_id", user.id) : await supabase.from("blog_posts").insert(post);
  if (result.error) throw new Error(result.error.message);
  revalidatePath("/blogs"); revalidatePath("/");
  if (status === "published") revalidatePath(`/blogs/${post.slug}`);
  redirect("/studio");
}

export async function deletePost(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase.from("blog_posts").delete().eq("id", String(formData.get("id"))).eq("author_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/blogs"); revalidatePath("/"); redirect("/studio");
}
