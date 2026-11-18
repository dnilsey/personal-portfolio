import { Project } from "./data";
import { ProjectThumbnail } from "./ProjectThumbnail";
import { TechTags } from "./TechTags";
import { LiveLink } from "./LiveLink";

export const ProjectCard = ({ project }: { project: Project }) => (
  <li className="h-full">
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-200 hover:border-primary">
      <ProjectThumbnail
        project={project}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
        className="aspect-video"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="text-sm text-muted-foreground">
          {project.category} · {project.year}
        </div>
        <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
        <div className="mt-2 flex-1">
          <p className="leading-relaxed text-muted-foreground line-clamp-3">
            {project.summary}
          </p>
        </div>
        <div className="mt-5">
          <TechTags tech={project.tech} />
        </div>
        {project.liveUrl && (
          <div className="mt-5">
            <LiveLink project={project} />
          </div>
        )}
      </div>
    </article>
  </li>
);
