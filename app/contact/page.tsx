import Contact from "@/components/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nilsey Diaz | Contact Page",
  description:
    "Contact page showcasing projects, skills, and experience in React and Next.js.",
};

export default function Page() {
  return <Contact />;
}
