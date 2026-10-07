import Link from "next/link";
import type { ReactNode } from "react";

interface CtaBar {
  text: string;
  href: string;
  label: string;
}

interface SmallCta {
  text: string;
  href: string;
}

/**
 * Section shell used by the home, products and blog surfaces:
 * heading + optional subtitle, a responsive card grid, and an
 * optional CTA below it.
 *
 * The vanilla widget switched on a `cardType` string and built the
 * cards itself. Here the caller passes the cards as children, so one
 * component serves every surface without knowing about card shapes.
 */
export function CardSection({
  title,
  titleAccent,
  titleAs: Heading = "h2",
  subtitle,
  children,
  cols = 3,
  background = "bg-white",
  viewAll,
  smallCta,
  ctaBar,
  scrollOnMobile = true,
  id,
}: {
  title: string;
  /** Rendered after `title` in the brand colour. */
  titleAccent?: string;
  /** Use "h1" when this section is the page's primary heading. */
  titleAs?: "h1" | "h2";
  subtitle?: string;
  children: ReactNode;
  cols?: 2 | 3;
  background?: string;
  viewAll?: SmallCta;
  smallCta?: SmallCta;
  ctaBar?: CtaBar;
  scrollOnMobile?: boolean;
  id?: string;
}) {
  const gridCols = cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  const gridClass = scrollOnMobile
    ? `mobile-scroll mt-16 gap-8 ${gridCols}`
    : `mt-16 grid gap-8 ${gridCols}`;

  return (
    <section
      id={id}
      className={`px-4 py-20 sm:px-6 sm:py-28 lg:px-8 ${background}`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <Heading className="section-heading">
            {title}
            {titleAccent && (
              <>
                {" "}
                <span className="text-primary-600">{titleAccent}</span>
              </>
            )}
          </Heading>
          {subtitle && <p className="section-subheading mx-auto">{subtitle}</p>}
          {viewAll && (
            <Link
              href={viewAll.href}
              className="mt-6 inline-flex text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
            >
              {viewAll.text} &rarr;
            </Link>
          )}
        </div>

        <div className={gridClass}>{children}</div>

        {smallCta && (
          <div className="mt-12 text-center">
            <Link href={smallCta.href} className="btn-secondary">
              {smallCta.text} &rarr;
            </Link>
          </div>
        )}

        {ctaBar && (
          <div className="svc-cta-strip">
            <p className="svc-cta-strip__heading">{ctaBar.text}</p>
            <Link href={ctaBar.href} className="btn-primary whitespace-nowrap">
              {ctaBar.label} &rarr;
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
