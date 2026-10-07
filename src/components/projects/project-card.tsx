import Image from "next/image";
import type { Product } from "@/lib/types";
import { Icon } from "@/components/ui/icon";

export function ProjectCard({ project }: { project: Product }) {
  const isExternal = project.linkTarget === "_blank";

  return (
    <article className="card flex flex-col">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${project.iconBg} ${project.iconColor}`}
      >
        <Icon d={project.iconPath} className="h-6 w-6" />
      </div>

      <h3 className="mt-5 text-lg font-bold text-gray-900">{project.title}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-500">{project.description}</p>

      {project.techStack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
              {tech}
            </span>
          ))}
        </div>
      )}

      {project.linkUrl && (
        <a
          href={project.linkUrl}
          target={project.linkTarget || "_self"}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="mt-4 inline-flex items-center text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
        >
          {project.linkLabel || "Learn more"} &rarr;
        </a>
      )}

      {project.image ? (
        <div className="mt-5 min-h-35 flex-1 overflow-hidden rounded-xl">
          <Image
            src={project.image}
            alt={project.imageAlt || `${project.title} screenshot`}
            width={800}
            height={500}
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 85vw, 384px"
          />
        </div>
      ) : (
        <div className="placeholder-box mt-5 min-h-35 flex-1">
          <span className="text-xs">Screenshot Placeholder</span>
        </div>
      )}
    </article>
  );
}
