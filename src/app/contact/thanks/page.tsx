import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <section className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Message sent</p>
        <h1 className="section-heading">Thanks, we got it.</h1>
        <p className="section-subheading mx-auto">
          We reply within 24 business hours. If it&apos;s urgent, email us directly.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">Back to home</Link>
          <Link href="/services" className="btn-secondary">See our services</Link>
        </div>
      </div>
    </section>
  );
}
