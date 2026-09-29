import LandingPage from "../components/landing-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nilsey Diaz | Software Engineer & Team Lead",
  description:
    "Nilsey Diaz is a Software Engineer and Team Lead with 7+ years of experience building web and mobile products end to end with Next.js, React, React Native, Node.js, and AWS.",
};

export default function Page() {
  return <LandingPage />;
}
