export default function BlogsLoading() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl" aria-busy="true" aria-live="polite">
        <span className="sr-only">Loading blog posts…</span>

        <div className="flex flex-col items-center gap-4">
          <div className="h-3 w-20 animate-pulse rounded-full bg-gray-200" />
          <div className="h-9 w-full max-w-md animate-pulse rounded-lg bg-gray-200" />
          <div className="h-5 w-full max-w-xl animate-pulse rounded-lg bg-gray-100" />
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="card flex flex-col">
              <div className="aspect-video w-full animate-pulse rounded-lg bg-gray-200" />
              <div className="mt-4 h-6 w-24 animate-pulse rounded-full bg-gray-100" />
              <div className="mt-3 h-6 w-4/5 animate-pulse rounded bg-gray-200" />
              <div className="mt-3 h-4 w-full animate-pulse rounded bg-gray-100" />
              <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-gray-100" />
              <div className="mt-6 h-3 w-32 animate-pulse rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
