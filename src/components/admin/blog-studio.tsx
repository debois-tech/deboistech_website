"use client";

import { useState } from "react";
import { BlogDetail } from "@/components/blog/blog-detail";
import { INPUT, MINI_BTN, TOOL_BTN } from "@/components/admin/json-editor";
import { move, slugify } from "@/lib/json-edit";
import type { BlockType, BlogBlock, BlogDomain, BlogPost } from "@/lib/types";

const BLOCK_TYPES: BlockType[] = ["paragraph", "heading", "list", "quote", "code", "image"];
const DOMAINS: BlogDomain[] = ["ml", "devops", "web", "general"];

const newPost = (): BlogPost => ({
  slug: "",
  title: "",
  description: "",
  thumbnail: "",
  thumbnailAlt: "",
  domain: "general",
  tags: [],
  body: [{ type: "paragraph", content: "" }],
  status: "draft",
  authorName: "deboistech",
  authorRole: "Author",
  publishedDate: "",
});

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </span>
      {children}
    </label>
  );
}

function BlockFields({
  block,
  onChange,
}: {
  block: BlogBlock;
  onChange: (b: BlogBlock) => void;
}) {
  const set = (patch: Partial<BlogBlock>) => onChange({ ...block, ...patch });

  switch (block.type) {
    case "heading":
      return (
        <div className="grid gap-3 sm:grid-cols-[8rem_1fr]">
          <Labeled label="Level">
            <select
              className={INPUT}
              value={block.level ?? 2}
              onChange={(e) => set({ level: Number(e.target.value) as 2 | 3 })}
            >
              <option value={2}>H2</option>
              <option value={3}>H3</option>
            </select>
          </Labeled>
          <Labeled label="Text">
            <input
              className={INPUT}
              value={block.content ?? ""}
              onChange={(e) => set({ content: e.target.value })}
            />
          </Labeled>
        </div>
      );

    case "list":
      return (
        <Labeled label="Items (one per line)">
          <textarea
            className={INPUT}
            rows={4}
            value={(block.items ?? []).join("\n")}
            onChange={(e) => set({ items: e.target.value.split("\n") })}
          />
        </Labeled>
      );

    case "quote":
      return (
        <div className="space-y-3">
          <Labeled label="Quote">
            <textarea
              className={INPUT}
              rows={3}
              value={block.content ?? ""}
              onChange={(e) => set({ content: e.target.value })}
            />
          </Labeled>
          <Labeled label="Attribution">
            <input
              className={INPUT}
              value={block.attribution ?? ""}
              onChange={(e) => set({ attribution: e.target.value })}
            />
          </Labeled>
        </div>
      );

    case "code":
      return (
        <div className="space-y-3">
          <Labeled label="Language">
            <input
              className={INPUT}
              value={block.language ?? ""}
              onChange={(e) => set({ language: e.target.value })}
            />
          </Labeled>
          <Labeled label="Code">
            <textarea
              className={`${INPUT} font-mono text-xs`}
              rows={6}
              value={block.content ?? ""}
              onChange={(e) => set({ content: e.target.value })}
            />
          </Labeled>
        </div>
      );

    case "image":
      return (
        <div className="space-y-3">
          <Labeled label="Image path or URL (files live in public/images/blog/)">
            <input
              className={INPUT}
              value={block.src ?? ""}
              onChange={(e) => set({ src: e.target.value })}
            />
          </Labeled>
          <Labeled label="Alt text">
            <input
              className={INPUT}
              value={block.alt ?? ""}
              onChange={(e) => set({ alt: e.target.value })}
            />
          </Labeled>
          <Labeled label="Caption">
            <input
              className={INPUT}
              value={block.caption ?? ""}
              onChange={(e) => set({ caption: e.target.value })}
            />
          </Labeled>
        </div>
      );

    default:
      return (
        <Labeled label="Text">
          <textarea
            className={INPUT}
            rows={5}
            value={block.content ?? ""}
            onChange={(e) => set({ content: e.target.value })}
          />
        </Labeled>
      );
  }
}

function PostEditor({ post, onChange }: { post: BlogPost; onChange: (p: BlogPost) => void }) {
  const [preview, setPreview] = useState(false);
  const set = (patch: Partial<BlogPost>) => onChange({ ...post, ...patch });
  const setBlock = (i: number, b: BlogBlock) =>
    set({ body: post.body.map((x, j) => (j === i ? b : x)) });

  if (preview) {
    return (
      <div>
        <button type="button" className={TOOL_BTN} onClick={() => setPreview(false)}>
          ← Back to editing
        </button>
        <div className="mt-4 rounded-xl border border-gray-200">
          <BlogDetail post={post} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button type="button" className={TOOL_BTN} onClick={() => setPreview(true)}>
          Preview
        </button>
      </div>

      <Labeled label="Title">
        <input
          className={`${INPUT} text-lg font-semibold`}
          value={post.title}
          onChange={(e) => {
            // Keep the slug in step with the title until it has been edited by hand.
            const followsTitle = post.slug === "" || post.slug === slugify(post.title);
            set({
              title: e.target.value,
              ...(followsTitle ? { slug: slugify(e.target.value) } : {}),
            });
          }}
        />
      </Labeled>

      <div className="grid gap-4 sm:grid-cols-2">
        <Labeled label="Slug (URL)">
          <input
            className={INPUT}
            value={post.slug}
            onChange={(e) => set({ slug: slugify(e.target.value) })}
          />
        </Labeled>
        <Labeled label="Domain">
          <select
            className={INPUT}
            value={post.domain}
            onChange={(e) => set({ domain: e.target.value as BlogDomain })}
          >
            {DOMAINS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </Labeled>
      </div>

      <Labeled label="Description">
        <textarea
          className={INPUT}
          rows={2}
          value={post.description}
          onChange={(e) => set({ description: e.target.value })}
        />
      </Labeled>

      <Labeled label="Tags (comma separated)">
        <input
          className={INPUT}
          value={post.tags.join(", ")}
          onChange={(e) =>
            set({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })
          }
        />
      </Labeled>

      <div className="grid gap-4 sm:grid-cols-2">
        <Labeled label="Thumbnail path or URL">
          <input
            className={INPUT}
            value={post.thumbnail}
            onChange={(e) => set({ thumbnail: e.target.value })}
          />
        </Labeled>
        <Labeled label="Thumbnail alt text">
          <input
            className={INPUT}
            value={post.thumbnailAlt}
            onChange={(e) => set({ thumbnailAlt: e.target.value })}
          />
        </Labeled>
        <Labeled label="Author">
          <input
            className={INPUT}
            value={post.authorName}
            onChange={(e) => set({ authorName: e.target.value })}
          />
        </Labeled>
        <Labeled label="Author role">
          <input
            className={INPUT}
            value={post.authorRole}
            onChange={(e) => set({ authorRole: e.target.value })}
          />
        </Labeled>
        <Labeled label="Status">
          <select
            className={INPUT}
            value={post.status}
            onChange={(e) => {
              const status = e.target.value as BlogPost["status"];
              set({
                status,
                ...(status === "published" && !post.publishedDate
                  ? { publishedDate: new Date().toISOString() }
                  : {}),
              });
            }}
          >
            <option value="draft">Draft (hidden)</option>
            <option value="published">Published (public)</option>
          </select>
        </Labeled>
        <Labeled label="Published date">
          <input
            className={INPUT}
            type="date"
            value={post.publishedDate.slice(0, 10)}
            onChange={(e) =>
              set({ publishedDate: e.target.value ? new Date(e.target.value).toISOString() : "" })
            }
          />
        </Labeled>
      </div>

      <fieldset className="min-w-0 rounded-xl border border-gray-200 p-4">
        <legend className="px-2 text-sm font-bold text-gray-900">
          Content blocks ({post.body.length})
        </legend>
        <ul className="space-y-3">
          {post.body.map((block, i) => (
            <li key={i} className="rounded-lg border border-gray-100 bg-gray-50/60 p-3">
              <div className="mb-3 flex items-center justify-between gap-2">
                <select
                  aria-label="Block type"
                  className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-semibold uppercase text-gray-600"
                  value={block.type}
                  onChange={(e) => setBlock(i, { ...block, type: e.target.value as BlockType })}
                >
                  {BLOCK_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <span className="flex gap-1">
                  <button
                    type="button"
                    className={MINI_BTN}
                    aria-label="Move up"
                    disabled={i === 0}
                    onClick={() => set({ body: move(post.body, i, -1) })}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className={MINI_BTN}
                    aria-label="Move down"
                    disabled={i === post.body.length - 1}
                    onClick={() => set({ body: move(post.body, i, 1) })}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className={MINI_BTN}
                    aria-label="Remove block"
                    onClick={() => set({ body: post.body.filter((_, j) => j !== i) })}
                  >
                    ✕
                  </button>
                </span>
              </div>
              <BlockFields block={block} onChange={(b) => setBlock(i, b)} />
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={`${TOOL_BTN} mt-3`}
          onClick={() => set({ body: [...post.body, { type: "paragraph", content: "" }] })}
        >
          + Add block
        </button>
      </fieldset>
    </div>
  );
}

export function BlogStudio({
  posts,
  onChange,
}: {
  posts: BlogPost[];
  onChange: (p: BlogPost[]) => void;
}) {
  const [selected, setSelected] = useState<number | null>(posts.length ? 0 : null);
  const current = selected !== null ? posts[selected] : undefined;

  return (
    <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
      <aside className="min-w-0">
        <button
          type="button"
          className={`${TOOL_BTN} w-full`}
          onClick={() => {
            onChange([newPost(), ...posts]);
            setSelected(0);
          }}
        >
          + New post
        </button>
        {posts.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">No posts yet. Create the first one.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {posts.map((p, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setSelected(i)}
                  className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                    i === selected
                      ? "border-primary-600 bg-primary-50"
                      : "border-gray-200 bg-white hover:border-primary-300"
                  }`}
                >
                  <span className="block truncate font-semibold text-gray-900">
                    {p.title || "Untitled post"}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      p.status === "published" ? "text-primary-700" : "text-gray-500"
                    }`}
                  >
                    {p.status}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>

      <section className="min-w-0">
        {current ? (
          <>
            <PostEditor
              key={selected}
              post={current}
              onChange={(next) => onChange(posts.map((p, i) => (i === selected ? next : p)))}
            />
            <button
              type="button"
              className="mt-6 text-sm font-semibold text-red-600 hover:text-red-700"
              onClick={() => {
                onChange(posts.filter((_, i) => i !== selected));
                setSelected(null);
              }}
            >
              Delete this post
            </button>
          </>
        ) : (
          <p className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-sm text-gray-500">
            Pick a post on the left, or create a new one.
          </p>
        )}
      </section>
    </div>
  );
}
