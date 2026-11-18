import { ExperienceItem } from "./data";
import { useState } from "react";
import { classNames } from "@/lib/classnames";
import ChevronDown from "../shared/svgs/ChevronDown";

export const ExperienceCard = ({
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
