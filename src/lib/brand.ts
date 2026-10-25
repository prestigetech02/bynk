/**
 * BYNK Advisory brand tokens and company snapshot from the company brief.
 * Visual palette sampled from the official logo.
 */
export const brand = {
  name: "BYNK Advisory",
  shortName: "BYNK",
  tagline:
    "Strategic Advisory for Financial Institutions & Fintech Companies Navigating Technology, Innovation and Complex Disputes.",
  mission:
    "To help financial institutions make better decisions at the intersection of technology, innovation, law and risk.",
  vision:
    "To redefine how financial institutions use legal and risk expertise, not simply to respond to problems, but to design better businesses.",
  philosophy: "Every dispute is data. Every risk is a design problem.",
  colors: {
    navy: "#12499D",
    navyDeep: "#0C2F66",
    sky: "#4EB6EE",
    skyBright: "#2AA6E8",
    skySoft: "#E7F6FD",
    muted: "#5B6B7F",
    border: "#D7E3EF",
    background: "#FFFFFF",
  },
  logo: {
    src: "/bynk-logo.png",
    alt: "BYNK Advisory",
  },
  contact: {
    email: "info@bynk.ca",
    location: "Markham, Ontario",
    instagram: "@bynk.ca",
    instagramUrl: "https://instagram.com/bynk.ca",
  },
  practices: [
    "Litigation & Disputes",
    "Finance & Business",
    "Innovation & Transformation",
    "Technology & AI",
    "People & Workplace",
    "Hospitality",
  ],
} as const;
