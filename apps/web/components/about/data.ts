import type { CmsImage } from "@/lib/cms";

// Placeholder until the CMS is connected; app/about/page.tsx passes this to
// <About image={...} />.
export const PLACEHOLDER_ABOUT_IMAGE: CmsImage = {
  src: "/images/about-page-image.jpg",
  alt: "Illustration of Nilsey Diaz",
};
