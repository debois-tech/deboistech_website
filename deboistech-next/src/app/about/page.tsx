import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ABOUT_CAPABILITIES, ABOUT_FAQ_ITEMS, TEAM } from "@/lib/content";
import { FaqAccordion } from "@/components/ui/faq-accordion";

export const metadata: Metadata = {
  title: "About",
  description:
    "deboistech is a software development company in Nashik delivering IT solutions, ERP-grade products, open-source platforms, and industrial training programs.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About deboistech | Software Development Company in Nashik",
    description:
      "IT solutions, ERP-grade products, open-source platforms, and industrial training programs.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
              About deboistech
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Software development company in Nashik for serious IT delivery.
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                What we do
              </h2>
              <p className="mt-4 text-base leading-7 text-gray-600">
                We work across the full IT stack: strategy, design, development,
                deployment, maintenance, and training. Our focus stays on usable
                systems that help teams move faster.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {ABOUT_CAPABILITIES.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Meet the team ── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
              Our People
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet the Team
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-500">
              The driven individuals behind every solution we build.
            </p>
          </div>

          <ul className="no-scrollbar flex snap-x snap-mandatory flex-nowrap gap-8 overflow-x-auto sm:flex-wrap sm:justify-center sm:gap-16">
            {TEAM.map((member) => (
              <li
                key={member.name}
                className="group flex w-[85vw] flex-shrink-0 snap-center flex-col items-center text-center sm:w-auto"
              >
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <div className="relative h-32 w-32 overflow-hidden rounded-full shadow-lg ring-4 ring-white transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={256}
                      height={256}
                      sizes="128px"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </a>
                <h3 className="mt-4 text-base font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary-600">
                  {member.role}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ teaser ── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-primary-900 p-8 text-white sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Frequently Asked Questions
                </h2>
                <p className="mt-5 text-base leading-7 text-primary-100">
                  deboistech is a technology company that combines software
                  engineering, product development, cloud technologies, AI, and
                  creative design services. We work with startups, SMEs,
                  educational institutions, and enterprises to build scalable
                  digital products and business solutions.
                </p>
                <Link
                  href="/faq"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-primary-50 transition-all hover:bg-white/20"
                >
                  Read more FAQs &rarr;
                </Link>
              </div>
              <FaqAccordion items={ABOUT_FAQ_ITEMS} variant="dark" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
