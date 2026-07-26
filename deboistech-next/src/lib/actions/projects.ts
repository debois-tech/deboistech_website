"use server";

import { createClient as createServiceClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export async function upsertProject(formData: FormData) {
  const supabase = createServiceClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const id = String(formData.get("id") || "");
  const project = {
    title: String(formData.get("title") || ""), slug: String(formData.get("slug") || ""),
    description: String(formData.get("description") || ""), full_description: String(formData.get("full_description") || ""),
    icon_svg: String(formData.get("icon_svg") || ""), image_url: String(formData.get("image_url") || ""),
    tech_stack: JSON.parse(String(formData.get("tech_stack") || "[]")), featured: formData.get("featured") === "true",
  };
  const result = id ? await supabase.from("projects").update(project).eq("id", id) : await supabase.from("projects").insert(project);
  if (result.error) throw new Error(result.error.message);
  revalidatePath("/products"); revalidatePath("/");
}
