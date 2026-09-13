export default function BlogPostLoading() {
  return (
    <article
      className="mx-auto max-w-3xl px-4 py-32 sm:px-6"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading article…</span>

      <div className="h-3 w-24 animate-pulse rounded-full bg-gray-200" />
      <div className="mt-6 h-11 w-full animate-pulse rounded-lg bg-gray-200" />
      <div className="mt-3 h-11 w-3/4 animate-pulse rounded-lg bg-gray-200" />
      <div className="mt-6 h-6 w-full animate-pulse rounded bg-gray-100" />
      <div className="mt-5 h-4 w-56 animate-pulse rounded bg-gray-100" />

      <div className="mt-12 space-y-4">
        {[
          "w-full",
          "w-full",
          "w-11/12",
          "w-full",
          "w-4/5",
          "w-full",
          "w-full",
          "w-2/3",
        ].map((width, index) => (
          <div
            key={index}
            className={`h-5 animate-pulse rounded bg-gray-100 ${width}`}
          />
        ))}
      </div>

      <div className="mt-16 flex gap-5 border-y border-gray-100 py-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="h-4 w-20 animate-pulse rounded bg-gray-100"
          />
        ))}
      </div>
    </article>
  );
}
