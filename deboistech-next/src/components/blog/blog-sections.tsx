import { getPublishedPosts } from "@/lib/queries/blog";
import { BlogCard } from "@/components/blog/blog-card";

export async function BlogSections() {
  const posts = await getPublishedPosts();
  const domains = ["ml", "devops", "web", "general"];
  return <div className="space-y-20">{domains.map((domain) => { const items = posts.filter((post) => post.domain === domain); return items.length ? <section key={domain}><h2 className="section-heading capitalize">{domain === "ml" ? "Machine Learning" : domain}</h2><div className="mt-8 grid gap-8 md:grid-cols-3">{items.map((post) => <BlogCard key={post.id} post={post} />)}</div></section> : null; })}</div>;
}
