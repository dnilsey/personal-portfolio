import Image from "next/image";
import { classNames } from "@/lib/classnames";
import { Project } from "./data";
import { getInitials } from "@/utils/getInitials";

export const ProjectThumbnail = ({
  project,
  sizes,
  className,
}: {
  project: Project;
  sizes: string;
  className?: string;
}) => (
  <div
    className={classNames(
      "relative overflow-hidden bg-surface-muted",
      className,
    )}
  >
    {project.image ? (
      <Image
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
    ) : (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-zalando-sans-expanded font-bold text-4xl sm:text-5xl text-primary/70">
          {getInitials(project.title)}
        </span>
      </div>
    )}
  </div>
);
