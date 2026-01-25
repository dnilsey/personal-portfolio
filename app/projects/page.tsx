import Projects from "@/components/projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nilsey Diaz | Projects Page",
  description:
    "Projects page showcasing projects, skills, and experience in React and Next.js.",
};

export default function Page() {
  return <Projects />;
}
