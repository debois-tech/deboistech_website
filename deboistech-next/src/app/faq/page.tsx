import type { Metadata } from "next";
import Link from "next/link";
import { FAQ_ITEMS, SITE_URL } from "@/lib/content";
import { FaqAccordion } from "@/components/ui/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about deboistech's services, location, pricing, timelines, SEO and GEO, AI development, and how we work with startups and enterprises.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ — deboistech",
    description:
      "Answers about our services, how we work, timelines, and pricing.",
    url: "/faq",
  },
};

/**
 * FAQPage structured data. Gives the answers a chance to surface as
 * rich results and in AI-generated overviews — which is exactly the
 * GEO capability the FAQ copy itself talks about.
 */
function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.bullets
          ? `${item.a} ${item.bullets.join(", ")}.`
          : item.a,
      },
    })),
  };
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Serialised from typed data above — no user input reaches this.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Questions</span>
          <h1 className="section-heading">Frequently Asked Questions</h1>
          <p className="section-subheading mx-auto">
            Everything people usually ask before starting a project with us.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={FAQ_ITEMS} />

          <div className="mt-12 rounded-xl border border-gray-100 bg-white px-8 py-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                Still have a question?
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Ask us directly — we usually reply within a business day.
              </p>
            </div>
            <Link
              href="/contact"
              className="btn-primary mt-4 whitespace-nowrap sm:mt-0"
            >
              Contact us &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
