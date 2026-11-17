export const CONTACT = {
  email: "d.nilsey@gmail.com",
  phone: "(+63) 967 243 5308",
  phoneHref: "tel:+639672435308",
  location: "Tagaytay City, Cavite, Philippines",
  timeZone: "Asia/Manila",
  timeZoneLabel: "UTC+8",
  // Flip to false to hide the "Open to new opportunities" badge.
  openToOpportunities: true,
};

export const REASONS = [
  "Job opportunity",
  "Freelance project",
  "Just saying hi",
] as const;

export type Reason = (typeof REASONS)[number];
