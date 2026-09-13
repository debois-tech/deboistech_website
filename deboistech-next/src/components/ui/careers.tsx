import { CAREER_APPLY_URL, OPEN_ROLES, type OpenRole } from "@/lib/content";
import { Icon } from "@/components/ui/icon";

export function Careers({
  title = "Join Our Team",
  subtitle = "We're a small, focused team building products that matter. Join us if you love ownership, learning, and impact.",
  roles = OPEN_ROLES,
}: {
  title?: string;
  subtitle?: string;
  roles?: OpenRole[];
}) {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="section-heading">{title}</h1>
          <p className="section-subheading mx-auto">{subtitle}</p>
        </div>

        {roles.length > 0 ? (
          <div className="mobile-scroll mt-10 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <div key={role.title} className="card flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                    <Icon d={role.iconPath} className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">{role.title}</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {role.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-5">
                  <a
                    href={role.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-16 rounded-xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center">
            <p className="text-lg font-semibold text-gray-700">
              No open positions right now.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Check back soon, or send us your application using the link below.
            </p>
          </div>
        )}

        <div className="mt-12 rounded-xl border border-gray-100 bg-gray-50 px-8 py-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="text-lg font-semibold text-gray-900">
              Don&apos;t see a role that fits?
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Send your application anyway — we&apos;re always looking for great
              people.
            </p>
          </div>
          <a
            href={CAREER_APPLY_URL}
            className="btn-primary mt-4 whitespace-nowrap sm:mt-0"
          >
            Send Your Application &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
