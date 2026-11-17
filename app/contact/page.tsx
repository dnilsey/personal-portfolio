import Contact from "@/components/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nilsey Diaz | Contact Page",
  description:
    "Get in touch with Nilsey Diaz about front-end and senior software engineering roles or freelance projects.",
};

export default function Page() {
  return <Contact />;
}
