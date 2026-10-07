import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

// UI only: sign-in is not wired up yet, so every control here is inert.
export default function LoginPage() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="card mx-auto max-w-sm">
        <h1 className="text-2xl font-bold text-gray-900">Team login</h1>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Sign-in for the deboistech team is coming soon.
        </p>

        <fieldset disabled className="mt-6 space-y-4 opacity-60">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Email</span>
            <input
              type="email"
              placeholder="you@deboistech.in"
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Password</span>
            <input type="password" className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </label>
          <button type="button" className="btn-primary w-full">
            Sign in
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="btn-secondary">Google</button>
            <button type="button" className="btn-secondary">GitHub</button>
          </div>
        </fieldset>

        <p className="mt-6 text-center text-sm">
          <Link href="/" className="font-semibold text-primary-700 hover:text-primary-800">
            &larr; Back to the site
          </Link>
        </p>
      </div>
    </section>
  );
}
