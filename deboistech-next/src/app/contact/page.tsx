import type { Metadata } from "next";
import { ContactSection } from "@/components/ui/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project. We reply within 24 business hours — free consultation, no obligation.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — deboistech",
    description:
      "Tell us about your project. We reply within 24 business hours.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="section-heading">
            Get in <span className="text-primary-600">touch</span>
          </h1>
          <p className="section-subheading mx-auto">
            Tell us what you&apos;re building. We&apos;ll come back with a clear
            next step — not a sales pitch.
          </p>
        </div>
      </section>

      <ContactSection
        heading="Ready to Start? Let's"
        headingAccent="Build Something Great."
      />
    </>
  );
}
