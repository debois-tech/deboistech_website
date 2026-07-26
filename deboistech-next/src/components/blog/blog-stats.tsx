"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { BlogStats as Stats } from "@/lib/types";

export function BlogStats({ postId, stats }: { postId: string; stats: Stats | null }) {
  const [values, setValues] = useState(stats ?? { post_id: postId, likes: 0, views: 0, reads: 0, shares: 0, updated_at: "" });
  async function increment(field: "likes" | "shares" | "reads") { await createClient().rpc("increment_blog_stat", { p_post_id: postId, p_field: field }); setValues((v) => ({ ...v, [field]: v[field] + 1 })); }
  return <div className="flex flex-wrap gap-3 border-y border-gray-100 py-4 text-sm text-gray-500"><span>{values.views} views</span><span>{values.reads} reads</span><button onClick={() => increment("likes")} className="hover:text-primary-700">♥ {values.likes}</button><button onClick={() => increment("shares")} className="hover:text-primary-700">↗ {values.shares}</button></div>;
}
