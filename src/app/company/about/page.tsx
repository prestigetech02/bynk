import type { Metadata } from "next";
import { AboutApproach } from "@/components/about/AboutApproach";
import { AboutChallenges } from "@/components/about/AboutChallenges";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutImpact } from "@/components/about/AboutImpact";
import { AboutIntro } from "@/components/about/AboutIntro";
import { AboutPurpose } from "@/components/about/AboutPurpose";
import { AboutStory } from "@/components/about/AboutStory";
import { JsonLd } from "@/components/seo/JsonLd";
import { aboutPageJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "BYNK helps financial institutions make better decisions at the intersection of technology, innovation, law and risk.",
  path: "/company/about",
  keywords: [
    "about BYNK Advisory",
    "lawyer founded advisory consultancy",
    "strategic advisory Canada",
    "dispute and technology advisory",
  ],
  image: "/about/approach.jpg",
  imageAlt: "BYNK advisors collaborating on strategy",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          aboutPageJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About Us", path: "/company/about" },
          ]),
        ]}
      />
      <AboutHero />
      <AboutIntro />
      <AboutImpact />
      <AboutPurpose />
      <AboutStory />
      <AboutApproach />
      <AboutChallenges />
  );
}
