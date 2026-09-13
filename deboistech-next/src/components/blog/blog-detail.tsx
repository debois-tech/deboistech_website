"use client";

import { useEffect, useState } from "react";
import type { BlogBlock, BlogPost, BlogStats as Stats } from "@/lib/types";
import { BlogStats } from "@/components/blog/blog-stats";
import { domainLabel, formatDate, isoDate } from "@/lib/format";

function useReadProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      setProgress(Math.min(100, Math.max(0, ratio * 100)));
    };

    // Coalesce scroll events into one update per animation frame.
    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return block.level === 3 ? (
        <h3>{block.content}</h3>
      ) : (
        <h2>{block.content}</h2>
      );

    case "image":
      return block.src ? (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt ?? ""} loading="lazy" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      ) : null;

    case "list":
      return (
        <ul>
          {block.items?.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      );

    case "quote":
      return (
        <blockquote>
          {block.content}
          {block.attribution && (
            <cite className="mt-3 block text-base not-italic text-gray-500">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );

    case "code":
      return (
        <pre>
          <code className={block.language ? `language-${block.language}` : undefined}>
            {block.content}
          </code>
        </pre>
      );

    default:
      return <p>{block.content}</p>;
  }
}

export function BlogDetail({
  post,
  stats = null,
}: {
  post: BlogPost;
  stats?: Stats | null;
}) {
  const progress = useReadProgress();

  return (
    <>
      <div
        role="progressbar"
        aria-label="Reading progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="fixed left-0 top-0 z-60 h-1 bg-primary-600 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />

      <article className="mx-auto max-w-3xl px-4 py-32 sm:px-6">
        <span className="eyebrow">{domainLabel(post.domain)}</span>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-5 text-xl leading-8 text-gray-500">{post.description}</p>
        )}

        <p className="mt-5 text-sm text-gray-500">
          By {post.author_name}
          {post.published_date && (
            <>
              {" · "}
              <time dateTime={isoDate(post.published_date)}>
                {formatDate(post.published_date)}
              </time>
            </>
          )}
        </p>

        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="article-prose mt-12">
          {post.body.map((block, index) => (
            <Block key={block.id || index} block={block} />
          ))}
        </div>

        <div className="mt-16">
          <BlogStats postId={post.id} stats={stats} />
        </div>
      </article>
    </>
  );
}
