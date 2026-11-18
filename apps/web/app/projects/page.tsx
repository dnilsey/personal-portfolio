import Projects from "@/components/projects";
import { PLACEHOLDER_PROJECTS } from "@/components/projects/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nilsey Diaz | Projects Page",
  description:
    "Projects page showcasing projects, skills, and experience in React and Next.js.",
};

export default function Page() {
  // TODO: replace with entries fetched from the CMS.
  return <Projects items={PLACEHOLDER_PROJECTS} />;
}
