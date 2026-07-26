"use client";

import { useEffect, useState } from "react";
import type { BlogBlock, BlogPost } from "@/lib/types";
import { BlogStats } from "@/components/blog/blog-stats";

export function BlogDetail({ post, stats = null }: { post: BlogPost; stats?: import("@/lib/types").BlogStats | null }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => { const update = () => setProgress(Math.min(100, (window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100)); window.addEventListener("scroll", update); return () => window.removeEventListener("scroll", update); }, []);
  return <><div className="fixed left-0 top-0 z-[60] h-1 bg-primary-600" style={{ width: `${progress}%` }} /><article className="mx-auto max-w-3xl px-4 py-32"><span className="eyebrow">{post.domain}</span><h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{post.title}</h1><p className="mt-5 text-xl leading-8 text-gray-500">{post.description}</p><p className="mt-5 text-sm text-gray-500">By {post.author_name} · {post.published_date ? new Date(post.published_date).toLocaleDateString() : ""}</p><div className="article-prose mt-12">{post.body.map((block) => <Block key={block.id} block={block} />)}</div><BlogStats postId={post.id} stats={stats} /></article></>;
}
function Block({ block }: { block: BlogBlock }) { if (block.type === "heading") { const Tag = block.level === 3 ? "h3" : "h2"; return <Tag>{block.content}</Tag>; } if (block.type === "image" && block.src) return <figure><img src={block.src} alt={block.alt || ""} /><figcaption>{block.caption}</figcaption></figure>; if (block.type === "list") return <ul>{block.items?.map((item) => <li key={item}>{item}</li>)}</ul>; if (block.type === "quote") return <blockquote>{block.content}<cite>{block.attribution}</cite></blockquote>; if (block.type === "code") return <pre><code>{block.content}</code></pre>; return <p>{block.content}</p>; }
