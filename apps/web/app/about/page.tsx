import About from "@/components/about";
import { PLACEHOLDER_ABOUT_IMAGE } from "@/components/about/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nilsey Diaz | About Page",
  description:
    "About Nilsey Diaz, a Software Engineer and Team Lead with 7+ years of experience building web and mobile products.",
};

export default function Page() {
  // TODO: replace with the image fetched from the CMS.
  return <About image={PLACEHOLDER_ABOUT_IMAGE} />;
}
