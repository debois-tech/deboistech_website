import type { Metadata } from "next";
import { getProjects } from "@/lib/queries/projects";
import { CardSection } from "@/components/ui/card-section";
import { ProjectCard } from "@/components/projects/project-card";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Tools and platforms built by deboistech to power modern infrastructure and teams — including TenantPlane and MotoAdmin.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products — deboistech",
    description:
      "Tools and platforms built by deboistech to power modern infrastructure and teams.",
    url: "/products",
  },
};

export default async function ProductsPage() {
  const projects = await getProjects();

  return (
    <CardSection
      background="bg-gray-50"
      title="Our"
      titleAccent="Products"
      titleAs="h1"
      subtitle="Tools and platforms built by deboistech to power modern infrastructure and teams."
      ctaBar={{
        text: "Want to build something amazing together?",
        href: "/contact",
        label: "Let's Build Your Product",
      }}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </CardSection>
  );
}
