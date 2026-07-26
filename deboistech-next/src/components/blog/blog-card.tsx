import Link from "next/link";
import type { BlogPost } from "@/lib/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return <article className="card flex h-full flex-col">{post.thumbnail ? <Link href={`/blogs/${post.slug}`} className="block aspect-video overflow-hidden rounded-lg"><img src={post.thumbnail} alt={post.thumbnail_alt || post.title} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" /></Link> : <Link href={`/blogs/${post.slug}`} className="placeholder-box block aspect-video rounded-lg"><span className="text-xs">Cover Placeholder</span></Link>}<span className="mt-4 self-start rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">{post.domain}</span><h3 className="mt-3 text-lg font-bold text-gray-900"><Link href={`/blogs/${post.slug}`} className="hover:text-primary-700">{post.title}</Link></h3><p className="mt-2 text-sm leading-6 text-gray-500">{post.description}</p><p className="mt-auto pt-4 text-xs text-gray-500">{post.author_name} · {post.published_date ? new Date(post.published_date).toLocaleDateString() : "Draft"}</p></article>;
}
