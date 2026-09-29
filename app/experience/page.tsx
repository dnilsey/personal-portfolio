import Experience from "@/components/experience";
import { PLACEHOLDER_EXPERIENCE } from "@/components/experience/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nilsey Diaz | Experience Page",
  description:
    "Experience page showcasing projects, skills, and experience in React and Next.js.",
};

export default function Page() {
  // TODO: replace with entries fetched from the CMS.
  return <Experience items={PLACEHOLDER_EXPERIENCE} />;
}
