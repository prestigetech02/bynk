import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutImpact } from "@/components/about/AboutImpact";
import { AboutIntro } from "@/components/about/AboutIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about BYNK Advisory: strategic advisory for financial institutions and fintech companies at the intersection of technology, law, and risk.",
  path: "/company/about",
  keywords: [
    "about BYNK Advisory",
    "fintech advisory firm Canada",
    "financial institutions consulting Markham",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/company/about" },
        ])}
      />
      <AboutHero />
      <AboutIntro />
      <AboutImpact />
    </>
  );
}
