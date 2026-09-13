import Link from "next/link";
import { SITE } from "@/lib/content";

const GROUPS = [
  {
    title: "Products",
    items: [
      { label: "TenantPlane", href: "https://tenantplane.deboistech.in/" },
      { label: "MotoAdmin", href: "https://www.motoadmin.in/" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Blog", href: "/blogs" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Build", href: "/services#build" },
      { label: "Scale", href: "/services#scale" },
      { label: "Accelerate", href: "/services#accelerate" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
] as const;

const SOCIALS = [
  { label: "GitHub", href: SITE.socials.github },
  { label: "LinkedIn", href: SITE.socials.linkedin },
] as const;

export function Footer() {
  return (
    <footer className="bg-primary-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr]">
          <div>
            <Link href="/" className="text-2xl font-bold text-white">
              {SITE.name}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              Engineering modern solutions, AI, and cloud platforms that drive real
              business impact.
            </p>
            <p className="mt-4 text-sm text-gray-400">{SITE.location}</p>
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="mt-1 inline-block text-sm text-gray-400 transition-colors hover:text-white"
            >
              {SITE.contactEmail}
            </a>
            <div className="mt-6 flex gap-4">
              {SOCIALS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {GROUPS.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-bold text-white">{group.title}</h4>
                <ul className="mt-4 space-y-3">
                  {group.items.map(({ label, href }) => (
                    <li key={label}>
                      {href.startsWith("http") ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-400 transition-colors hover:text-white"
                        >
                          {label}
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className="text-sm text-gray-400 transition-colors hover:text-white"
                        >
                          {label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-primary-700 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <Link
            href="/privacy-policy"
            className="text-xs text-gray-500 transition-colors hover:text-white"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
