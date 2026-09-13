import Link from "next/link";

export default function NotFound() {
  return (
    <section className="px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-primary-600">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-5 text-lg leading-8 text-gray-500">
          The link may be outdated, or the page may have moved. Here are a few
          places worth trying instead.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact us
          </Link>
        </div>
        <nav className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {[
            { label: "Services", href: "/services" },
            { label: "Products", href: "/products" },
            { label: "Blog", href: "/blogs" },
            { label: "About", href: "/about" },
            { label: "FAQ", href: "/faq" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-medium text-gray-500 transition-colors hover:text-primary-700"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
