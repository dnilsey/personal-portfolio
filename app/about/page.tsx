import About from "@/components/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nilsey Diaz | About Page",
  description:
    "About Nilsey Diaz, a Software Engineer and Team Lead with 7+ years of experience building web and mobile products.",
};

export default function Page() {
  return <About />;
}
