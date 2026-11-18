import { Project } from "./data";
import { ProjectThumbnail } from "./ProjectThumbnail";
import { TechTags } from "./TechTags";
import { LiveLink } from "./LiveLink";

export const FeaturedProject = ({ project }: { project: Project }) => (
  <article className="group grid grid-cols-1 md:grid-cols-[1.15fr_1fr] overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-200 hover:border-primary">
    <ProjectThumbnail
      project={project}
      sizes="(max-width: 768px) 100vw, 640px"
      className="aspect-video md:aspect-auto md:min-h-80"
    />
    <div className="flex flex-col p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary-foreground">
          Featured
        </span>
        <span className="text-sm text-muted-foreground">
          {project.year} · {project.role}
        </span>
      </div>
      <h2 className="mt-4 font-zalando-sans-expanded font-bold text-2xl sm:text-3xl">
        {project.title}
      </h2>
      <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
        {project.summary}
      </p>
      <div className="mt-6">
        <TechTags tech={project.tech} />
      </div>
      {project.liveUrl && (
        <div className="mt-6">
          <LiveLink project={project} />
        </div>
      )}
    </div>
  </article>
);
