import LandingPage from "@/components/landing-page";
import { getProfile } from "@/service/profile";

export default async function Page() {
  const profile = await getProfile();
  return <LandingPage profile={profile} />;
}
