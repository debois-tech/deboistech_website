"use client";

import { useState } from "react";
import type { BlogBlock, BlogPost } from "@/lib/types";
import { upsertPost } from "@/lib/actions/blog";

export function BlogStudio({ post }: { post?: BlogPost }) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [body, setBody] = useState<BlogBlock[]>(post?.body ?? []);
  async function save(status: "draft" | "published") { const data = new FormData(); if (post?.id) data.set("id", post.id); data.set("title", title); data.set("slug", post?.slug ?? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")); data.set("description", post?.description ?? ""); data.set("domain", post?.domain ?? "general"); data.set("tags", JSON.stringify(post?.tags ?? [])); data.set("body", JSON.stringify(body)); data.set("status", status); await upsertPost(data); }
  return <div className="mx-auto max-w-4xl px-4 py-32"><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" className="blog-title-input w-full border-0 outline-none" /><textarea value={body.map((block) => block.content ?? "").join("\n\n")} onChange={(e) => setBody([{ id: "body", type: "paragraph", content: e.target.value }])} placeholder="Write your post..." className="mt-8 min-h-[520px] w-full rounded-xl border border-gray-200 p-6 text-lg outline-none focus:border-primary-600" /><div className="mt-6 flex gap-3"><button onClick={() => save("draft")} className="btn-secondary">Save draft</button><button onClick={() => save("published")} className="btn-primary">Publish</button></div></div>;
}
