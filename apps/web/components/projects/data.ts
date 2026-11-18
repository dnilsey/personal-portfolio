// Shape of a project entry. The real entries will come from the CMS;
// map the CMS response to this type and pass it to <Projects items={...} />.
export type ProjectCategory = "Web" | "Mobile" | "Full stack" | "Personal";

export type Project = {
  id: number;
  title: string;
  summary: string;
  category: ProjectCategory;
  year: string;
  role: string;
  tech: string[];
  // Path under /public (e.g. "/images/projects/foo.png"). When missing, the
  // card shows a panel with the project's initials instead.
  image?: string;
  // The "Live site" link only renders when this is set.
  liveUrl?: string;
  // The first featured project gets the large card at the top.
  featured?: boolean;
};

const SUMMARY =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

// Placeholder content until the CMS is connected. Newest first.
export const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: 6,
    title: "Atlas Commerce",
    summary: SUMMARY,
    category: "Full stack",
    year: "2025",
    role: "Team lead",
    tech: ["Next.js", "TypeScript", "Node.js", "AWS"],
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: 5,
    title: "Harbor Mobile",
    summary: SUMMARY,
    category: "Mobile",
    year: "2024",
    role: "Front-end lead",
    tech: ["React Native", "TypeScript"],
    liveUrl: "https://example.com",
  },
  {
    id: 4,
    title: "Lumen Dashboard",
    summary: SUMMARY,
    category: "Web",
    year: "2024",
    role: "Front-end developer",
    tech: ["React", "Tailwind CSS"],
  },
  {
    id: 3,
    title: "Payroll Connect",
    summary: SUMMARY,
    category: "Full stack",
    year: "2023",
    role: "Full stack developer",
    tech: ["Next.js", "MySQL", "REST APIs"],
    liveUrl: "https://example.com",
  },
  {
    id: 2,
    title: "Trailmark",
    summary: SUMMARY,
    category: "Mobile",
    year: "2022",
    role: "Mobile developer",
    tech: ["React Native", "Firebase"],
  },
  {
    id: 1,
    title: "Personal Portfolio",
    summary: SUMMARY,
    category: "Personal",
    year: "2026",
    role: "Designer and developer",
    tech: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://example.com",
  },
];

export const ALL = "All";
export const CATEGORIES: ProjectCategory[] = [
  "Web",
  "Mobile",
  "Full stack",
  "Personal",
];
