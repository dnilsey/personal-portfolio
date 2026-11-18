import ExternalLink from "../shared/svgs/ExternalLink";
import { Project } from "./data";

export const LiveLink = ({ project }: { project: Project }) =>
  project.liveUrl ? (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${project.title} live site (opens in a new tab)`}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover"
    >
      Live site
      <ExternalLink className="w-4 h-4" />
    </a>
  ) : null;
