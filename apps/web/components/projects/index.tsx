"use client";

import { classNames } from "@/lib/classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import WithNavLayout from "../shared/layouts/WithNavLayout";
import ExternalLink from "../shared/svgs/ExternalLink";
import { Project, ProjectCategory } from "./data";

const ALL = "All";
const CATEGORIES: ProjectCategory[] = ["Web", "Mobile", "Full stack", "Personal"];

const getInitials = (title: string) =>
  title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

// Screenshot, or a panel with the project's initials until one is added.
const ProjectThumbnail = ({
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

const TechTags = ({ tech }: { tech: string[] }) => (
  <ul className="flex flex-wrap gap-2">
    {tech.map((item) => (
      <li
        key={item}
        className="rounded-full bg-surface-muted px-3 py-1 text-xs sm:text-sm text-foreground"
      >
        {item}
      </li>
    ))}
  </ul>
);

const LiveLink = ({ project }: { project: Project }) =>
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

const FeaturedProject = ({ project }: { project: Project }) => (
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

const ProjectCard = ({ project }: { project: Project }) => (
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

const Projects = ({ items }: { items: Project[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL);
  const categories = [
    ALL,
    ...CATEGORIES.filter((category) =>
      items.some((item) => item.category === category),
    ),
  ];
  const visibleItems =
    selectedCategory === ALL
      ? items
      : items.filter((item) => item.category === selectedCategory);
  const featured = visibleItems.find((item) => item.featured);
  const rest = visibleItems.filter((item) => item !== featured);

  return (
    <WithNavLayout>
      <div className="w-full font-poppins text-foreground px-6 sm:px-12 pt-6 md:pt-24 pb-24">
        <header>
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Projects
          </div>
          <h1 className="mt-3 font-zalando-sans-expanded font-bold tracking-wide text-3xl sm:text-4xl lg:text-5xl">
            Things I&apos;ve built
          </h1>
          <p className="mt-4 max-w-prose text-base sm:text-lg text-muted-foreground">
            Selected work across web, mobile, and the APIs behind them.
          </p>
        </header>

        {/* Category filter */}
        <div
          role="group"
          aria-label="Filter by category"
          className="mt-8 -mx-6 px-6 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              className={classNames(
                selectedCategory === category
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-surface border-border text-muted-foreground hover:text-foreground hover:border-primary",
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-10 space-y-6">
          {featured && <FeaturedProject project={featured} />}
          {rest.length > 0 && (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </ul>
          )}
        </div>

        {/* Call to action */}
        <section className="mt-16 md:mt-24 flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl bg-surface-muted p-6 sm:p-10">
          <div>
            <h2 className="font-zalando-sans-expanded font-bold text-xl sm:text-2xl">
              Have something in mind?
            </h2>
            <p className="mt-2 text-muted-foreground">
              I&apos;d love to hear about your next project.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex self-start sm:self-auto items-center rounded-full bg-primary px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium tracking-wide text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-primary-hover"
          >
            Get in touch
          </Link>
        </section>
      </div>
    </WithNavLayout>
  );
};

export default Projects;
