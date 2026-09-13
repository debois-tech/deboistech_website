import Image from "next/image";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  const isExternal = project.link_target === "_blank";

  return (
    <article className="card flex flex-col">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${project.icon_bg} ${project.icon_color}`}
      >
        {/*
          `icon_svg` holds the inner markup of an <svg> (Heroicons path data).
          It is authored by admins via the service_role key — the projects
          table is not writable by end users (see RLS policies in the plan).
        */}
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: project.icon_svg }}
        />
      </div>

      <h3 className="mt-5 text-lg font-bold text-gray-900">{project.title}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-500">{project.description}</p>

      {project.tech_stack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {project.link_url && (
        <a
          href={project.link_url}
          target={project.link_target || "_self"}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="mt-4 inline-flex items-center text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
        >
          {project.link_label || "Learn more"} &rarr;
        </a>
      )}

      {project.image_url ? (
        <div className="mt-5 min-h-35 flex-1 overflow-hidden rounded-xl">
          <Image
            src={project.image_url}
            alt={project.image_alt || `${project.title} screenshot`}
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
