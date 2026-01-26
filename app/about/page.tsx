import About from "@/components/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nilsey Diaz | About Page",
  description:
    "About page showcasing projects, skills, and experience in React and Next.js.",
};

export default function Page() {
  return <About />;
}
