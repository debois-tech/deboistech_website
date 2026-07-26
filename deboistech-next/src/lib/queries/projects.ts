import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";

export async function getProjects(): Promise<Project[]> {
  const { data } = await (await createClient()).from("projects").select("*").order("sort_order", { ascending: true });
  return (data ?? []) as Project[];
}
export async function getFeaturedProjects(): Promise<Project[]> {
  const { data } = await (await createClient()).from("projects").select("*").eq("featured", true).order("sort_order", { ascending: true });
  return (data ?? []) as Project[];
}
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data } = await (await createClient()).from("projects").select("*").eq("slug", slug).single();
  return data as Project | null;
}
export async function getAllProjectSlugs(): Promise<string[]> {
  const { data } = await (await createClient()).from("projects").select("slug");
  return data?.map((project) => project.slug) ?? [];
}
