import Skills from "@/components/Skills";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nilsey Diaz | Skills Page",
  description:
    "Skills page showcasing projects, skills, and experience in React and Next.js.",
};

export default function Page() {
  return <Skills />;
}
