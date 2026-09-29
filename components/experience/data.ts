// Shape of an experience entry. The real entries will come from the CMS;
// map the CMS response to this type and pass it to <Experience items={...} />.
export type ExperienceItem = {
  id: number;
  period: string;
  title: string;
  description: string;
};

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

// Placeholder content until the CMS is connected. Newest first.
export const PLACEHOLDER_EXPERIENCE: ExperienceItem[] = [
  {
    id: 4,
    period: "2023 ~ Present",
    title: "Columbus Discovers America",
    description: LOREM,
  },
  {
    id: 3,
    period: "2021 ~ 2023",
    title: "War of the Roses",
    description: LOREM,
  },
  {
    id: 2,
    period: "2019 ~ 2021",
    title: "The Black Death",
    description: LOREM,
  },
  {
    id: 1,
    period: "2019",
    title: "Magna Carta",
    description: LOREM,
  },
];
