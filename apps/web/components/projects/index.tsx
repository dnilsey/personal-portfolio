"use client";

import { classNames } from "@/lib/classnames";
import Link from "next/link";
import { useState } from "react";
import WithNavLayout from "../shared/layouts/WithNavLayout";
import { Project, ALL, CATEGORIES } from "./data";
import { ProjectCard } from "./ProjectCard";
import { FeaturedProject } from "./FeaturedProject";

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
