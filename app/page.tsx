import LandingPage from "../components/landing-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nilsey Diaz | Frontend Engineer Portfolio",
  description:
    "Landing page showcasing projects, skills, and experience in React and Next.js.",
};

export default function Page() {
  return <LandingPage />;
}
