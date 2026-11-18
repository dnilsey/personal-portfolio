import Link from "next/link";
import { Suspense } from "react";
import { Project } from "../projects/data";
import WithNavLayout from "../shared/layouts/WithNavLayout";
import LiveDemos from "./demos";
import { SkillExplorer, SkillExplorerFromUrl } from "./SkillExplorer";

const PRINCIPLES = [
  {
    title: "Clarify before building",
    description:
      "I pin down the problem, constraints, and trade-offs with clients and the team before code gets written.",
  },
  {
    title: "Make the next change easy",
    description:
      "Clear structure, typed data, and small components so the codebase stays easy to work in as it grows.",
  },
  {
    title: "Reviews are for teaching",
    description:
      "Code reviews explain the why, so the team levels up and the same feedback doesn't come back twice.",
  },
  {
    title: "Ship in small steps",
    description:
      "Short sprints and frequent releases keep feedback fast and surprises small.",
  },
];

// Talking points for walking someone through how this page itself is built.
const BUILT_WITH = [
  {
    title: "Accessible tabs",
    description:
      "The explorer follows the WAI-ARIA tabs pattern with a roving tabindex, so it works fully from the keyboard and with screen readers.",
    tryIt: "Tab into the skill areas, then use the arrow keys, Home, and End.",
    file: "components/skills/useRovingTabs.ts",
  },
  {
    title: "Shareable state",
    description:
      "The selected skill lives in the URL, so a link opens the page on exactly that skill.",
    tryIt: "Pick a skill, copy its link, and open it in a new tab.",
    file: "components/skills/SkillExplorer.tsx",
  },
  {
    title: "Server-first rendering",
    description:
      "The page is a server component. Only the interactive explorer ships JavaScript, and it's wrapped in Suspense so the rest renders statically.",
    tryIt: "View the page source: the content is already in the HTML.",
    file: "components/skills/index.tsx",
  },
  {
    title: "Code splitting",
    description:
      "Each live demo is a separate bundle loaded with next/dynamic only when its tab is opened, so visitors don't pay for demos they never open.",
    tryIt: "Open the Network tab in dev tools, then switch demos.",
    file: "components/skills/demos/index.tsx",
  },
  {
    title: "Theme tokens",
    description:
      "Every color is a semantic CSS variable. Components never use dark: variants; the tokens swap when the theme changes.",
    tryIt: "Toggle the theme with the button in the corner.",
    file: "app/globals.css",
  },
  {
    title: "Typed, connected data",
    description:
      "Skills and projects are typed data. The \"Used in\" list is derived from the projects page, so the two never drift apart.",
    tryIt: "Open React and check the projects listed under Used in.",
    file: "components/skills/data.ts",
  },
  {
    title: "Responsive by default",
    description:
      "Mobile-first layout: the skill list becomes scrollable chips on small screens and a side list on larger ones.",
    tryIt: "Resize the window or open the page on your phone.",
    file: "components/skills/SkillExplorer.tsx",
  },
];

const Skills = ({ projects }: { projects: Project[] }) => {
  return (
    <WithNavLayout>
      <div className="w-full font-poppins text-foreground px-6 sm:px-12 pt-6 md:pt-24 pb-24">
        <header>
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Skills
          </div>
          <h1 className="mt-3 font-zalando-sans-expanded font-bold tracking-wide text-3xl sm:text-4xl lg:text-5xl">
            What I bring to a team
          </h1>
          <p className="mt-4 max-w-prose text-base sm:text-lg leading-relaxed text-muted-foreground">
            A front-end developer at heart, with the full-stack range and
            leadership experience of a senior engineer. Pick a skill to see what
            I do with it and where I&apos;ve used it.
          </p>
        </header>

        {/* Skill explorer */}
        <section aria-label="Skill explorer" className="mt-10">
          <Suspense fallback={<SkillExplorer projects={projects} />}>
            <SkillExplorerFromUrl projects={projects} />
          </Suspense>
        </section>

        <LiveDemos />

        {/* How I work */}
        <section className="mt-16 md:mt-24">
          <h2 className="font-zalando-sans-expanded font-bold text-2xl sm:text-3xl">
            How I work as a senior engineer
          </h2>
          <ol className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PRINCIPLES.map((principle, index) => (
              <li
                key={principle.title}
                className="border-l-4 border-primary pl-4"
              >
                <div className="text-sm font-medium text-primary">
                  0{index + 1}
                </div>
                <h3 className="mt-1 text-lg font-semibold">{principle.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {principle.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* How this page is built */}
        <section className="mt-16 md:mt-24">
          <h2 className="font-zalando-sans-expanded font-bold text-2xl sm:text-3xl">
            How this page is built
          </h2>
          <p className="mt-3 max-w-prose text-muted-foreground">
            This page is a small showcase in itself. Here&apos;s what&apos;s
            going on under the hood.
          </p>
          <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BUILT_WITH.map((item) => (
              <li
                key={item.title}
                className="flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-primary"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <p className="mt-4 rounded-xl bg-surface-muted px-4 py-3 text-sm">
                  <span className="font-medium text-primary">Try it: </span>
                  {item.tryIt}
                </p>
                <code className="mt-4 block truncate text-xs text-muted-foreground">
                  {item.file}
                </code>
              </li>
            ))}
          </ul>
        </section>

        {/* Call to action */}
        <section className="mt-16 md:mt-24 flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl bg-surface-muted p-6 sm:p-10">
          <div>
            <h2 className="font-zalando-sans-expanded font-bold text-xl sm:text-2xl">
              See these skills in action
            </h2>
            <p className="mt-2 text-muted-foreground">
              Browse the projects, or reach out to talk about a role.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium tracking-wide text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-primary-hover"
            >
              Get in touch
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center rounded-full border border-border bg-surface px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium tracking-wide text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              View projects
            </Link>
          </div>
        </section>
      </div>
    </WithNavLayout>
  );
};

export default Skills;
