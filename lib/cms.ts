// Shape of an image coming from the CMS. Most CMSs return at least a URL and
// alt text for an image field — map the CMS response to this type and pass it
// to the component.
//
// When the CMS serves images from its own domain, add that domain to
// `images.remotePatterns` in next.config.ts so next/image can optimize it.
export type CmsImage = {
  src: string; // "/images/..." for local files, or a full CMS URL
  alt: string;
  // Optional low-res preview shown while the image loads (many CMSs provide one).
  blurDataURL?: string;
};
