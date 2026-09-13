import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { domainLabel, formatDate, isoDate } from "@/lib/format";

export function BlogCard({ post }: { post: BlogPost }) {
  const href = `/blogs/${post.slug}`;

  return (
    <article className="card flex h-full flex-col">
      {post.thumbnail ? (
        <Link
          href={href}
          className="block aspect-video overflow-hidden rounded-lg"
          tabIndex={-1}
          aria-hidden="true"
        >
          {/*
            Thumbnails are arbitrary URLs stored in Supabase, so their host
            is unknown at build time and next/image cannot validate it
            against images.remotePatterns. Add the Storage host to
            next.config.ts and switch to <Image> once the bucket exists.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.thumbnail}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
      ) : (
        <div className="placeholder-box block aspect-video rounded-lg">
          <span className="text-xs">No cover image</span>
        </div>
      )}

      <span className="mt-4 self-start rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
        {domainLabel(post.domain)}
      </span>

      <h3 className="mt-3 text-lg font-bold text-gray-900">
        <Link href={href} className="transition-colors hover:text-primary-700">
          {post.title}
        </Link>
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">{post.description}</p>

      <p className="mt-auto pt-4 text-xs text-gray-500">
        {post.author_name}
        {post.published_date ? (
          <>
            {" · "}
            <time dateTime={isoDate(post.published_date)}>
              {formatDate(post.published_date)}
            </time>
          </>
        ) : (
          " · Draft"
        )}
      </p>
    </article>
  );
}
