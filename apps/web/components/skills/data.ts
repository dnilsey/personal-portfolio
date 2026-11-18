// Skills shown on the skills page. Each skill's `name` is matched against the
// `tech` list of every project, so the "Used in" list stays in sync with the
// projects page without extra wiring — keep the spelling identical.
//
// TODO: review the levels, years, and highlights — they're starting points.

import type { DemoId } from "./demos/meta";

export type SkillLevel = "Expert" | "Advanced" | "Proficient";

export type Skill = {
  id: string; // URL-safe, used in ?skill=<id>
  name: string;
  level: SkillLevel;
  years: number;
  summary: string;
  highlights: string[];
  demo?: DemoId; // shows a "See it live" link to that demo
};

export type SkillArea = {
  id: string;
  label: string;
  description: string;
  primary?: boolean;
  skills: Skill[];
};

export const SKILL_AREAS: SkillArea[] = [
  {
    id: "front-end",
    label: "Front end",
    description:
      "My main focus: fast, accessible interfaces that hold up on every screen size.",
    primary: true,
    skills: [
      {
        id: "react",
        name: "React",
        level: "Expert",
        years: 7,
        summary:
          "My day-to-day tool for building component systems that teams can extend safely.",
        highlights: [
          "Design reusable, typed component libraries shared across products",
          "Structure state and data fetching so screens stay fast as they grow",
          "Profile and fix unnecessary re-renders in large component trees",
        ],
        demo: "performance",
      },
      {
        id: "nextjs",
        name: "Next.js",
        level: "Expert",
        years: 5,
        summary:
          "Production apps using server and client components, routing, and static rendering.",
        highlights: [
          "Choose between static, server, and client rendering per page",
          "Optimize images, fonts, and bundles for good Core Web Vitals",
          "Set up project structure and conventions for new teams",
        ],
      },
      {
        id: "typescript",
        name: "TypeScript",
        level: "Expert",
        years: 6,
        summary:
          "Typed data models and APIs that catch mistakes before code review does.",
        highlights: [
          "Model API responses and UI state with precise types",
          "Migrate JavaScript codebases to TypeScript incrementally",
          "Write shared types that keep front end and back end in sync",
        ],
        demo: "search",
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        level: "Expert",
        years: 4,
        summary:
          "Design-token driven styling, including light and dark themes like this site.",
        highlights: [
          "Build themes on semantic color tokens instead of per-component overrides",
          "Translate designs into responsive layouts quickly and consistently",
        ],
        demo: "theme",
      },
      {
        id: "responsive-ui",
        name: "Responsive UI",
        level: "Expert",
        years: 7,
        summary:
          "Interfaces that work the same on a phone, a tablet, and a wide monitor.",
        highlights: [
          "Mobile-first layouts with fluid type and spacing",
          "Cross-browser and cross-device testing before release",
        ],
      },
      {
        id: "accessibility",
        name: "Accessibility",
        level: "Advanced",
        years: 4,
        summary:
          "Keyboard, screen reader, and contrast support built in, not bolted on.",
        highlights: [
          "Implement WAI-ARIA patterns like the tabs on this page",
          "Semantic HTML first, ARIA only where it adds meaning",
          "Check focus order, labels, and color contrast during review",
        ],
        demo: "theme",
      },
      {
        id: "web-performance",
        name: "Web performance",
        level: "Advanced",
        years: 5,
        summary: "Measuring first, then fixing what users actually feel.",
        highlights: [
          "Code splitting and lazy loading for heavy routes",
          "Image and font optimization",
          "Lighthouse and Web Vitals audits before launches",
        ],
        demo: "performance",
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    description: "Cross-platform apps that share logic and patterns with the web.",
    skills: [
      {
        id: "react-native",
        name: "React Native",
        level: "Advanced",
        years: 4,
        summary: "iOS and Android apps from a single TypeScript codebase.",
        highlights: [
          "Ship and maintain apps on both app stores",
          "Share business logic and types between web and mobile",
          "Handle platform differences in navigation and native APIs",
        ],
      },
    ],
  },
  {
    id: "back-end",
    label: "Back end and cloud",
    description:
      "Enough depth to own features end to end and work closely with back-end engineers.",
    skills: [
      {
        id: "nodejs",
        name: "Node.js",
        level: "Advanced",
        years: 5,
        summary: "APIs and services that power the front ends I build.",
        highlights: [
          "Build REST endpoints with validation and error handling",
          "Integrate third-party services for auth, payments, and email",
        ],
      },
      {
        id: "rest-apis",
        name: "REST APIs",
        level: "Advanced",
        years: 6,
        summary: "Designing and consuming APIs with clear, stable contracts.",
        highlights: [
          "Secure authentication flows",
          "Payment and email integrations",
          "Agree on API contracts with back-end teams before building",
        ],
        demo: "search",
      },
      {
        id: "aws",
        name: "AWS",
        level: "Proficient",
        years: 4,
        summary: "Deploying and hosting the apps I build.",
        highlights: [
          "Deploy and host web apps and APIs",
          "Configure storage, environments, and access",
        ],
      },
      {
        id: "mysql",
        name: "MySQL",
        level: "Proficient",
        years: 5,
        summary: "Relational data modeling and queries behind product features.",
        highlights: [
          "Design schemas for new features",
          "Write and tune queries used by APIs",
        ],
      },
      {
        id: "ci-cd",
        name: "CI/CD",
        level: "Proficient",
        years: 4,
        summary: "Automated checks and deploys so releases are routine.",
        highlights: [
          "Set up lint, type-check, and build pipelines",
          "Automate deploys to staging and production",
        ],
      },
    ],
  },
  {
    id: "leadership",
    label: "Leadership",
    description:
      "What I bring as a senior engineer and team lead beyond writing code.",
    skills: [
      {
        id: "team-leadership",
        name: "Team leadership",
        level: "Advanced",
        years: 3,
        summary:
          "Leading front-end and full-stack teams through planning and delivery.",
        highlights: [
          "Lead a front-end team at GSS Lab",
          "Previously Full Stack Team Lead at Klaudsol",
          "Own technical direction and architecture decisions",
        ],
      },
      {
        id: "agile",
        name: "Agile and Scrum",
        level: "Advanced",
        years: 5,
        summary: "Running sprints that ship predictably.",
        highlights: [
          "Plan sprints and break features into deliverable tasks",
          "Run stand-ups, reviews, and retrospectives",
        ],
      },
      {
        id: "mentoring",
        name: "Code reviews and mentoring",
        level: "Advanced",
        years: 4,
        summary: "Helping developers grow through reviews and pairing.",
        highlights: [
          "Review code for correctness, clarity, and maintainability",
          "Mentor junior developers and onboard new team members",
          "Set team conventions so reviews focus on what matters",
        ],
      },
      {
        id: "client-communication",
        name: "Client communication",
        level: "Advanced",
        years: 5,
        summary:
          "Working directly with international clients to turn needs into requirements.",
        highlights: [
          "Clarify requirements and trade-offs with clients",
          "Report progress and manage expectations across time zones",
        ],
      },
    ],
  },
];

export const findSkill = (skillId: string | null) => {
  if (!skillId) return null;
  for (const area of SKILL_AREAS) {
    const skill = area.skills.find((item) => item.id === skillId);
    if (skill) return { area, skill };
  }
  return null;
};
