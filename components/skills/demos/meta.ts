export type DemoId = "theme" | "performance" | "search";

export type DemoMeta = {
  id: DemoId;
  label: string;
  title: string;
  shows: string;
  file: string;
};

const REPO_URL = "https://github.com/dnilsey/personal-portfolio/blob/main";

export const sourceUrl = (file: string) => `${REPO_URL}/${file}`;

export const DEMOS: DemoMeta[] = [
  {
    id: "theme",
    label: "Theme editor",
    title: "Re-theme the whole site, live",
    shows:
      "Design tokens and accessibility: one CSS variable drives every accent on the page, and contrast is checked against WCAG as you pick.",
    file: "components/skills/demos/ThemeEditorDemo.tsx",
  },
  {
    id: "performance",
    label: "10,000 rows",
    title: "Render only what's on screen",
    shows:
      "Performance: list virtualization keeps a 10,000-row list fast by rendering only the rows you can see.",
    file: "components/skills/demos/VirtualListDemo.tsx",
  },
  {
    id: "search",
    label: "Async search",
    title: "Search over an unreliable network",
    shows:
      "Real-world data fetching: debounced input, loading, empty, and error states, retries, and cancelled requests.",
    file: "components/skills/demos/AsyncSearchDemo.tsx",
  },
];
