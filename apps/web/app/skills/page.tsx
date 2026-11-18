import { PLACEHOLDER_PROJECTS } from "@/components/projects/data";
import Skills from "@/components/skills";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nilsey Diaz | Skills Page",
  description:
    "Front-end and senior software engineering skills: React, Next.js, TypeScript, React Native, Node.js, AWS, and team leadership.",
};

export default function Page() {
  // TODO: replace with projects fetched from the CMS.
  return <Skills projects={PLACEHOLDER_PROJECTS} />;
}
