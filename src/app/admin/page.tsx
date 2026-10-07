import type { Metadata } from "next";
import { Dashboard } from "@/components/admin/dashboard";

export const metadata: Metadata = {
  title: "Content admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">Admin</p>
        <h1 className="section-heading">Content dashboard</h1>

        <ol className="mt-4 max-w-3xl list-decimal space-y-1 pl-5 text-sm leading-6 text-gray-600">
          <li>Edit any section. Changes autosave as a draft in this browser only.</li>
          <li>
            Click <strong>Export</strong> to download the updated JSON file.
          </li>
          <li>
            Replace the same file in <code className="font-mono">content/</code>,
            commit, and redeploy. Visitors see it after the rebuild.
          </li>
        </ol>

        <div className="mt-10">
          <Dashboard />
        </div>
      </div>
    </section>
  );
}
