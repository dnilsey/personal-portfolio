import Experience from "@/components/experience";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nilsey Diaz | Experience Page",
  description:
    "Experience page showcasing projects, skills, and experience in React and Next.js.",
};

export default function Page() {
  return <Experience />;
}
