"use client"; // Error boundaries must be Client Components.

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  // Next.js 16 renamed the recovery callback from `reset` to `unstable_retry`.
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[error boundary]", error);
  }, [error]);

  return (
    <section className="px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-primary-600">
          Something went wrong
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          We hit an unexpected error
        </h1>
        <p className="mt-5 text-lg leading-8 text-gray-500">
          This one is on us. Try again — if it keeps happening, let us know and
          we&apos;ll look into it.
        </p>
        {error.digest && (
          <p className="mt-3 text-xs text-gray-400">
            Reference: <code className="font-mono">{error.digest}</code>
          </p>
        )}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="btn-primary"
          >
            Try again
          </button>
          <Link href="/" className="btn-secondary">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
