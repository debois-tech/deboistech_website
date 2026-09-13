import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { FALLBACK_PROJECTS } from "@/lib/content";
import type { Project } from "@/lib/types";

// Products are a primary marketing surface — an empty grid reads as
// broken, so these fall back to the two seed rows in lib/content.ts
// whenever Supabase is unavailable or returns nothing.

export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) return FALLBACK_PROJECTS;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data?.length ? (data as Project[]) : FALLBACK_PROJECTS;
  } catch (cause) {
    console.error("[queries/projects] getProjects failed:", cause);
    return FALLBACK_PROJECTS;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) {
    return FALLBACK_PROJECTS.filter((project) => project.featured);
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data?.length
      ? (data as Project[])
      : FALLBACK_PROJECTS.filter((project) => project.featured);
  } catch (cause) {
    console.error("[queries/projects] getFeaturedProjects failed:", cause);
    return FALLBACK_PROJECTS.filter((project) => project.featured);
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const fallback = FALLBACK_PROJECTS.find((project) => project.slug === slug) ?? null;
  if (!isSupabaseConfigured()) return fallback;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return (data as Project | null) ?? fallback;
  } catch (cause) {
    console.error(`[queries/projects] getProjectBySlug(${slug}) failed:`, cause);
    return fallback;
  }
}

export async function getAllProjectSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return FALLBACK_PROJECTS.map((project) => project.slug);
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("projects").select("slug");
    if (error) throw error;
    return data?.length
      ? data.map((project) => project.slug as string)
      : FALLBACK_PROJECTS.map((project) => project.slug);
  } catch (cause) {
    console.error("[queries/projects] getAllProjectSlugs failed:", cause);
    return FALLBACK_PROJECTS.map((project) => project.slug);
  }
}
