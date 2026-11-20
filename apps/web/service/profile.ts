import type { ProfileResponse } from "@portfolio/types";
import { apiFetch } from "@/lib/interceptor";

export async function getProfile(): Promise<ProfileResponse> {
  try {
    return await apiFetch<ProfileResponse>("/profile", {
      next: { revalidate: 3600, tags: ["profile"] },
    });
  } catch (error) {
    console.error("[getProfile] API failed, using fallback:", error);
    return FALLBACK_PROFILE;
  }
}

export const FALLBACK_PROFILE: ProfileResponse = {
  name: "Nilsey Diaz",
  greeting: "Hello, I'm",
  headline: "Software Engineer & Team Lead",
  bio: "I'm a Software Engineer and Team Lead with 7+ years of experience building web and mobile products end to end, from React, Next.js, and React Native front ends to Node.js APIs and AWS infrastructure. I lead Agile teams, work directly with international clients, and take products from architecture through deployment.",
  portrait: {
    src: "/images/landing-page-portrait.webp",
    alt: "Portrait of Nilsey Diaz",
  },
};
