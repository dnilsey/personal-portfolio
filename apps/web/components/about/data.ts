import type { CmsImage } from "@/lib/cms";

// Placeholder until the CMS is connected; app/about/page.tsx passes this to
// <About image={...} />.
export const PLACEHOLDER_ABOUT_IMAGE: CmsImage = {
  src: "/images/about-page-image.jpg",
  alt: "Illustration of Nilsey Diaz",
};

export const STATS = [
  { value: "7+", label: "Years building software" },
  { value: "2", label: "Team lead roles" },
  { value: "7", label: "Production apps shipped" },
];

export const FOCUS_AREAS = [
  {
    title: "Build",
    description:
      "Web and mobile apps from architecture through deployment, with a focus on performance and responsive, cross-device UI.",
    tools: ["Next.js", "React", "TypeScript", "React Native", "Tailwind CSS"],
  },
  {
    title: "Integrate",
    description:
      "Secure APIs for authentication, payments, and email, working closely with backend engineers on end-to-end features.",
    tools: ["Node.js", "REST APIs", "AWS", "MySQL", "CI/CD"],
  },
  {
    title: "Lead",
    description:
      "Running Agile teams, planning sprints, mentoring developers through code reviews, and working directly with international clients.",
    tools: [
      "Agile / Scrum",
      "Code reviews",
      "Mentoring",
      "Client communication",
    ],
  },
];

export const DETAILS = [
  {
    label: "Education",
    value: "BS Computer Science",
    note: "De La Salle University – Dasmariñas",
  },
  {
    label: "Languages",
    value: "English, Filipino",
    note: "Professional · Native",
  },
  {
    label: "Based in",
    value: "Tagaytay City",
    note: "Cavite, Philippines",
  },
];
