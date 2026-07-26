"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitContact(formData: FormData) {
  const { error } = await (await createClient()).from("contact_messages").insert({
    name: String(formData.get("name") || ""), email: String(formData.get("email") || ""),
    subject: String(formData.get("subject") || ""), message: String(formData.get("message") || ""),
  });
  if (error) throw new Error("Failed to submit message");
  return { success: true };
}
