import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/queries/projects";
import { getPublishedPosts } from "@/lib/queries/blog";
import { CULTURE_PILLARS, SITE, SOLUTIONS } from "@/lib/content";
import { CardSection } from "@/components/ui/card-section";
import { FeaturedProduct } from "@/components/ui/featured-product";
import { TechMarquee } from "@/components/ui/tech-marquee";
import { ProcessSteps } from "@/components/ui/process-steps";
import { SolutionCard } from "@/components/ui/solution-card";
import { ProjectCard } from "@/components/projects/project-card";
import { BlogCard } from "@/components/blog/blog-card";
import { ContactSection } from "@/components/ui/contact-section";
import { Icon } from "@/components/ui/icon";

const TEAM_PHOTOS = [
  { src: "/images/teams/1.jpeg", className: "" },
  { src: "/images/teams/2.jpeg", className: "mt-8" },
  { src: "/images/teams/3.jpeg", className: "-mt-4" },
];

export default async function HomePage() {
  const [projects, posts] = await Promise.all([
    getFeaturedProjects(),
    getPublishedPosts(),
  ]);

  const latestPosts = posts.slice(0, 3);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="aspect-4/3 w-full lg:order-2 lg:aspect-auto lg:h-120">
              <Image
                src="/images/hero.png"
                alt="deboistech engineering team at work"
                width={1200}
                height={900}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full rounded-xl object-cover shadow-lg"
              />
            </div>
            <div className="lg:order-1">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Building Solutions.
                <br />
                <span className="text-primary-600">Empowering Futures.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-500">
                {SITE.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/services" className="btn-primary">
                  Explore Our Services &rarr;
                </Link>
                <Link href="/products" className="btn-secondary">
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProduct />
      <TechMarquee />

      {/* ── Solutions ── */}
      <CardSection
        background="bg-gray-50"
        title="Solutions That Drive"
        titleAccent="Real Impact"
        subtitle="From cloud infrastructure to intelligent applications, we build scalable, secure and future-ready solutions tailored to your business."
        smallCta={{ text: "Explore All Services", href: "/services" }}
      >
        {SOLUTIONS.map((solution) => (
          <SolutionCard key={solution.title} item={solution} />
        ))}
      </CardSection>

      {/* ── Selected products ── */}
      <CardSection
        title="Latest Products"
        subtitle="We build and maintain powerful products used by teams worldwide."
        ctaBar={{
          text: "Want to build something amazing together?",
          href: "/contact",
          label: "Let's Build Your Product",
        }}
      >
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </CardSection>

      {/* ── Selected blogs (only when posts exist) ── */}
      {latestPosts.length > 0 && (
        <CardSection
          background="bg-gray-50"
          title="Selected Blogs"
          viewAll={{ text: "View all blogs", href: "/blogs" }}
        >
          {latestPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </CardSection>
      )}

      <ProcessSteps />

      {/* ── Team & culture ── */}
      <section className="bg-primary-50/30 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="grid grid-cols-2 gap-4">
              {TEAM_PHOTOS.map((photo, index) => (
                <div
                  key={photo.src}
                  className={`aspect-square overflow-hidden rounded-2xl ${photo.className}`}
                >
                  <Image
                    src={photo.src}
                    alt={`deboistech team ${index + 1}`}
                    width={600}
                    height={600}
                    sizes="(max-width: 1024px) 45vw, 22vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div>
              <span className="eyebrow">Our team &amp; culture</span>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Great People. Strong Culture. Building the Future{" "}
                <span className="text-primary-600">Together.</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-500">
                We are a team of passionate engineers, designers, and problem
                solvers who believe in ownership, collaboration, and continuous
                learning.
              </p>
              <div className="mt-8 space-y-6">
                {CULTURE_PILLARS.map((pillar) => (
                  <div key={pillar.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                      <Icon d={pillar.iconPath} className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
