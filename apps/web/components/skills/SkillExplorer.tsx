"use client";

import { classNames } from "@/lib/classnames";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Project } from "../projects/data";
import { findSkill, Skill, SKILL_AREAS } from "./data";
import { useRovingTabs } from "./useRovingTabs";

type Props = {
  projects: Project[];
  initialSkillId?: string | null;
};

const LEVEL_STYLES: Record<Skill["level"], string> = {
  Expert: "bg-primary text-primary-foreground",
  Advanced: "bg-surface-muted text-primary",
  Proficient: "bg-surface-muted text-muted-foreground",
};

const SkillDetail = ({
  skill,
  projects,
}: {
  skill: Skill;
  projects: Project[];
}) => {
  const [copied, setCopied] = useState(false);
  const usedIn = projects.filter((project) => project.tech.includes(skill.name));

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}?skill=${skill.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); the URL bar still has the link.
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={classNames(
            LEVEL_STYLES[skill.level],
            "rounded-full px-3 py-1 text-xs font-medium uppercase tracking-widest",
          )}
        >
          {skill.level}
        </span>
        <span className="text-sm text-muted-foreground">
          {skill.years}+ years
        </span>
      </div>
      <h3 className="mt-4 font-zalando-sans-expanded font-bold text-2xl sm:text-3xl">
        {skill.name}
      </h3>
      <p className="mt-3 text-base sm:text-lg leading-relaxed">{skill.summary}</p>

      <h4 className="mt-6 text-sm uppercase tracking-widest text-muted-foreground">
        What I do with it
      </h4>
      <ul className="mt-3 space-y-2">
        {skill.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-3 leading-relaxed">
            <span
              aria-hidden="true"
              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
            />
            {highlight}
          </li>
        ))}
      </ul>

      <h4 className="mt-6 text-sm uppercase tracking-widest text-muted-foreground">
        Used in
      </h4>
      {usedIn.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {usedIn.map((project) => (
            <li key={project.id}>
              <Link
                href="/projects"
                className="inline-flex rounded-full border border-border bg-surface px-3 py-1 text-sm transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-muted-foreground">
          Used across client work that isn&apos;t listed publicly.
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {skill.demo && (
          <a
            href={`#demo-${skill.demo}`}
            className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover"
          >
            See it live
          </a>
        )}
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors duration-200 hover:border-primary hover:text-primary cursor-pointer"
        >
          Copy link to this skill
        </button>
        <span role="status" className="text-sm text-muted-foreground">
          {copied ? "Link copied" : ""}
        </span>
      </div>
    </div>
  );
};

export const SkillExplorer = ({ projects, initialSkillId }: Props) => {
  const initial = findSkill(initialSkillId ?? null);
  const [areaId, setAreaId] = useState(initial?.area.id ?? SKILL_AREAS[0].id);
  const [skillId, setSkillId] = useState(
    initial?.skill.id ?? SKILL_AREAS[0].skills[0].id,
  );

  const areaIndex = SKILL_AREAS.findIndex((area) => area.id === areaId);
  const area = SKILL_AREAS[areaIndex];
  const skillIndex = Math.max(
    0,
    area.skills.findIndex((skill) => skill.id === skillId),
  );
  const skill = area.skills[skillIndex];

  // Keep the selection in the URL so a specific skill can be shared.
  const selectSkill = (id: string) => {
    setSkillId(id);
    window.history.replaceState(null, "", `?skill=${id}`);
  };

  const areaTabs = useRovingTabs(SKILL_AREAS.length, (index) => {
    setAreaId(SKILL_AREAS[index].id);
    selectSkill(SKILL_AREAS[index].skills[0].id);
  });
  const skillTabs = useRovingTabs(area.skills.length, (index) =>
    selectSkill(area.skills[index].id),
  );

  return (
    <div>
      {/* Area tabs */}
      <div
        role="tablist"
        aria-label="Skill areas"
        className="-mx-6 px-6 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SKILL_AREAS.map((item, index) => {
          const selected = item.id === areaId;
          return (
            <button
              key={item.id}
              id={`area-tab-${item.id}`}
              aria-controls={`area-panel-${item.id}`}
              onClick={() => {
                setAreaId(item.id);
                selectSkill(item.skills[0].id);
              }}
              {...areaTabs.getTabProps(index, selected)}
              className={classNames(
                selected
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-surface border-border text-muted-foreground hover:text-foreground hover:border-primary",
                "shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer",
              )}
            >
              {item.label}
              {item.primary && (
                <span
                  className={classNames(
                    selected
                      ? "bg-primary-foreground/20"
                      : "bg-surface-muted text-primary",
                    "rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest",
                  )}
                >
                  Main focus
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Area panel */}
      <div
        role="tabpanel"
        id={`area-panel-${area.id}`}
        aria-labelledby={`area-tab-${area.id}`}
        className="mt-6 rounded-2xl border border-border bg-surface"
      >
        <p className="px-6 pt-6 sm:px-8 text-muted-foreground">
          {area.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
          {/* Skill tabs: scrollable chips on mobile, a vertical list on desktop */}
          <div
            role="tablist"
            aria-label={`${area.label} skills`}
            aria-orientation="vertical"
            className="flex md:flex-col gap-2 overflow-x-auto px-6 py-6 sm:px-8 md:pr-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {area.skills.map((item, index) => {
              const selected = index === skillIndex;
              return (
                <button
                  key={item.id}
                  id={`skill-tab-${item.id}`}
                  aria-controls="skill-panel"
                  onClick={() => selectSkill(item.id)}
                  {...skillTabs.getTabProps(index, selected)}
                  className={classNames(
                    selected
                      ? "bg-surface-muted text-primary md:border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-muted md:border-transparent",
                    "shrink-0 rounded-full md:rounded-none md:border-l-2 px-4 py-2 text-left text-sm font-medium transition-colors duration-200 cursor-pointer",
                  )}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id="skill-panel"
            aria-labelledby={`skill-tab-${skill.id}`}
            tabIndex={0}
            className="border-t md:border-t-0 md:border-l border-border p-6 sm:p-8 md:min-h-[26rem]"
          >
            <SkillDetail key={skill.id} skill={skill} projects={projects} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reads ?skill= from the URL. Rendered inside <Suspense> so the rest of the
// page can still be statically rendered.
export const SkillExplorerFromUrl = ({ projects }: { projects: Project[] }) => {
  const searchParams = useSearchParams();
  return (
    <SkillExplorer
      projects={projects}
      initialSkillId={searchParams.get("skill")}
    />
  );
};
