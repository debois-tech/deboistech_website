import type { Metadata } from "next";
import Link from "next/link";
import { ServiceTiers } from "@/components/ui/service-tiers";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Technology solutions that solve real business problems — product engineering, cloud, DevOps, AI, and design across our Build, Scale and Accelerate tiers.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — deboistech",
    description:
      "Product engineering, cloud, DevOps, AI, and design across our Build, Scale and Accelerate tiers.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <h1 className="section-heading">
            Our <span className="text-primary-600">Services</span>
          </h1>
          <p className="section-subheading mx-auto">
            Technology solutions that solve real business problems. Not feature
            lists — outcomes you can measure.
          </p>
        </div>

        <ServiceTiers />

        <div className="svc-cta-strip">
          <div>
            <p className="svc-cta-strip__heading">
              Not sure which tier fits your project?
            </p>
            <p className="svc-cta-strip__body">
              Tell us what you&apos;re building and we&apos;ll point you to the right
              approach — no pitch, just clarity.
            </p>
          </div>
          <Link href="/contact" className="btn-primary whitespace-nowrap">
            Describe your project &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
