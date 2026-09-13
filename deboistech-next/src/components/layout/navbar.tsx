"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blogs" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

  // Collapse the mobile menu on navigation. Comparing the previous route
  // during render is React's documented way to adjust state from a
  // changed input — an effect here would cause a cascading re-render,
  // and an onClick on each link would miss browser back/forward.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed left-1/2 top-6 z-50 w-full max-w-4xl -translate-x-1/2 px-4">
      <nav className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white/95 px-5 py-3.5 shadow-lg backdrop-blur">
        <Link href="/" className="flex items-center" aria-label="deboistech home">
          <Image
            src="/images/logo.png"
            alt="deboistech"
            width={144}
            height={36}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 sm:flex">
            {LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={
                    isActive(href)
                      ? "text-sm font-semibold text-primary-700"
                      : "text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                  }
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {user ? (
            <Link
              href="/studio"
              className="hidden text-sm font-semibold text-primary-700 sm:inline"
            >
              Studio
            </Link>
          ) : null}

          <Link
            href="/contact"
            className="hidden rounded-full bg-primary-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800 sm:inline-flex"
          >
            Let&apos;s Talk &rarr;
          </Link>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 sm:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.75}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={open ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"}
              />
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="mt-2 rounded-xl border border-gray-100 bg-white px-4 pb-4 pt-2 shadow-lg sm:hidden"
        >
          {LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={
                isActive(href)
                  ? "block rounded-lg px-3 py-2 text-base font-semibold text-primary-700"
                  : "block rounded-lg px-3 py-2 text-base font-medium text-gray-600"
              }
            >
              {label}
            </Link>
          ))}
          {user ? (
            <Link
              href="/studio"
              className="block rounded-lg px-3 py-2 text-base font-semibold text-primary-700"
            >
              Studio
            </Link>
          ) : null}
          <Link
            href="/contact"
            className="mt-3 inline-flex rounded-full bg-primary-700 px-5 py-2 text-sm font-semibold text-white"
          >
            Let&apos;s Talk &rarr;
          </Link>
        </div>
      )}
    </header>
  );
}
