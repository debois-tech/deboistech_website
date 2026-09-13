import Image from "next/image";
import { TECH_LOGOS, type TechLogo } from "@/lib/content";

function LogoStrip({
  logos,
  duplicate = false,
}: {
  logos: TechLogo[];
  duplicate?: boolean;
}) {
  return (
    <>
      {logos.map((logo) => (
        <Image
          key={`${duplicate ? "dup" : "set"}-${logo.src}`}
          src={logo.src}
          alt={duplicate ? "" : logo.alt}
          width={120}
          height={logo.height ?? 48}
          aria-hidden={duplicate || undefined}
          className="scroll-item tech-logo"
          style={logo.height ? { height: `${logo.height}px` } : undefined}
        />
      ))}
    </>
  );
}

export function TechMarquee({
  title = "Trusted Technologies",
  subtitle = "We use modern, reliable and secure technologies to build scalable solutions for the future.",
  logos = TECH_LOGOS,
}: {
  title?: string;
  subtitle?: string;
  logos?: TechLogo[];
}) {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="section-heading">{title}</h2>
          {subtitle && <p className="section-subheading mx-auto">{subtitle}</p>}
        </div>
        <div className="mx-auto mt-16 max-w-full">
          <div className="overflow-hidden">
            {/* The set is rendered twice so the -50% keyframe loops seamlessly. */}
            <div className="scroll-track">
              <LogoStrip logos={logos} />
              <LogoStrip logos={logos} duplicate />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
