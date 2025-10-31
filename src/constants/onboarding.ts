// src\constants\onboarding.ts

export const ROLES = [
  "Freelancer",
  "Content Creator",
  "Social Media Manager",
  "Business Owner",
  "Marketing Manager",
  "Other",
] as const;

export const USE_CASES = [
  "Social Media Management",
  "Content Planning",
  "Campaign Management",
  "Analytics & Reporting",
  "All of the above",
] as const;

export const PLATFORMS = [
  "Facebook",
  "Instagram",
  "Twitter",
  "LinkedIn",
  "TikTok",
  "YouTube",
] as const;

export const WORKSPACE_TYPES = [
  { label: "Individual", sub: "Just for me", value: "individual" },
  { label: "In-house", sub: "For my company", value: "in_house" },
  { label: "Partner", sub: "With partners", value: "partner" },
] as const;

 