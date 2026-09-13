"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Icon } from "@/components/ui/icon";
import type { BlogStats as Stats } from "@/lib/types";

const HEART =
  "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z";
const SHARE =
  "M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.769-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z";
const EYE =
  "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z";
const BOOK =
  "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25";

type Counter = "likes" | "shares";

export function BlogStats({
  postId,
  stats,
}: {
  postId: string;
  stats: Stats | null;
}) {
  const [values, setValues] = useState<Stats>(
    stats ?? {
      post_id: postId,
      views: 0,
      reads: 0,
      likes: 0,
      shares: 0,
      updated_at: "",
    },
  );
  const [pending, setPending] = useState<Counter | null>(null);

  async function increment(field: Counter) {
    if (pending) return;

    // Optimistic bump — reverted below if the RPC rejects.
    setValues((current) => ({ ...current, [field]: current[field] + 1 }));

    if (!isSupabaseConfigured()) return;

    setPending(field);
    try {
      const { error } = await createClient().rpc("increment_blog_stat", {
        p_post_id: postId,
        p_field: field,
      });
      if (error) throw error;
    } catch (cause) {
      console.error(`[blog-stats] increment(${field}) failed:`, cause);
      setValues((current) => ({
        ...current,
        [field]: Math.max(0, current[field] - 1),
      }));
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-5 border-y border-gray-100 py-4 text-sm text-gray-500">
      <span className="inline-flex items-center gap-1.5">
        <Icon d={EYE} className="h-4 w-4" />
        {values.views} views
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Icon d={BOOK} className="h-4 w-4" />
        {values.reads} reads
      </span>
      <button
        type="button"
        onClick={() => increment("likes")}
        disabled={pending === "likes"}
        className="inline-flex items-center gap-1.5 transition-colors hover:text-primary-700 disabled:opacity-60"
        aria-label="Like this post"
      >
        <Icon d={HEART} className="h-4 w-4" />
        {values.likes}
      </button>
      <button
        type="button"
        onClick={() => increment("shares")}
        disabled={pending === "shares"}
        className="inline-flex items-center gap-1.5 transition-colors hover:text-primary-700 disabled:opacity-60"
        aria-label="Share this post"
      >
        <Icon d={SHARE} className="h-4 w-4" />
        {values.shares}
      </button>
    </div>
  );
}
