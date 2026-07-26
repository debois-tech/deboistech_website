import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data } = await (await createClient()).from("profiles").select("*").eq("id", userId).single();
  return data as Profile | null;
}
export async function upsertProfile(profile: Partial<Profile> & { id: string }): Promise<Profile | null> {
  const { data } = await (await createClient()).from("profiles").upsert(profile).select().single();
  return data as Profile | null;
}
