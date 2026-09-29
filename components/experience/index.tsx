"use client";

import { classNames } from "@/lib/classnames";
import { useState } from "react";
import WithNavLayout from "../shared/layouts/WithNavLayout";
import ChevronDown from "../shared/svgs/ChevronDown";
import { ExperienceItem } from "./data";

const ALL = "All";

const ExperienceCard = ({
  item,
  isCurrent,
}: {
  item: ExperienceItem;
  isCurrent: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="relative pl-10 sm:pl-14">
      {/* Timeline dot */}
      <span
        className={classNames(
          isCurrent
            ? "bg-primary border-primary ring-4 ring-primary/20"
            : "bg-surface border-muted-foreground",
          "absolute left-0 sm:left-2 top-7 w-4 h-4 -translate-x-1/2 ml-2 rounded-full border-2",
        )}
      />
      <article className="rounded-2xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-primary">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-surface-muted px-3 py-1 text-xs sm:text-sm font-medium text-primary">
            {item.period}
          </span>
          {isCurrent && (
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Current
            </span>
          )}
        </div>
        <h2 className="mt-4 text-xl sm:text-2xl font-semibold">{item.title}</h2>
        <p
          className={classNames(
            expanded ? "" : "line-clamp-3",
            "mt-3 leading-relaxed text-muted-foreground",
          )}
        >
          {item.description}
        </p>
        <button
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover cursor-pointer"
        >
          {expanded ? "Show less" : "Read more"}
          <ChevronDown
            className={classNames(
              expanded ? "rotate-180" : "",
              "w-4 h-4 transition-transform duration-200",
            )}
          />
        </button>
      </article>
    </li>
  );
};

const Experience = ({ items }: { items: ExperienceItem[] }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(ALL);
  const periods = [ALL, ...items.map((item) => item.period)];
  const visibleItems =
    selectedPeriod === ALL
      ? items
      : items.filter((item) => item.period === selectedPeriod);

  return (
    <WithNavLayout>
      <div className="w-full font-poppins text-foreground px-6 sm:px-12 pt-6 md:pt-24 pb-24">
        <header>
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Experience
          </div>
          <h1 className="mt-3 font-zalando-sans-expanded font-bold tracking-wide text-3xl sm:text-4xl lg:text-5xl">
            Where I&apos;ve worked
          </h1>
        </header>

        {/* Period filter */}
        <div
          role="group"
          aria-label="Filter by period"
          className="mt-8 -mx-6 px-6 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              aria-pressed={selectedPeriod === period}
              className={classNames(
                selectedPeriod === period
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-surface border-border text-muted-foreground hover:text-foreground hover:border-primary",
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer",
              )}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative mt-10 max-w-3xl">
          <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-border" />
          <ol className="space-y-8">
            {visibleItems.map((item) => (
              <ExperienceCard
                key={item.id}
                item={item}
                isCurrent={item.period.includes("Present")}
              />
            ))}
          </ol>
        </div>
      </div>
    </WithNavLayout>
  );
};

export default Experience;
