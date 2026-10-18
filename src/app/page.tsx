import type { Metadata } from "next";
import { About } from "@/components/about/About";
import { Hero } from "@/components/hero/Hero";
import { WordMarquee } from "@/components/marquee/WordMarquee";
import { Practice } from "@/components/practice/Practice";
import { JsonLd } from "@/components/seo/JsonLd";
import { WhyChooseUs } from "@/components/why/WhyChooseUs";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Strategic Advisory for Financial Institutions & Fintech",
    description:
      "BYNK Advisory helps banks and fintech companies navigate technology, AI, innovation risk, litigation strategy, and complex disputes with clearer decisions.",
    path: "/",
    keywords: [
      "strategic advisory Canada",
      "bank consulting",
      "fintech advisory Markham",
    ],
  }),
  title: {
    absolute: "BYNK Advisory | Strategic Advisory for Financial Institutions",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }])}
      />
      <Hero />
      <Practice />
      <About />
      <WhyChooseUs />
      <WordMarquee variant="home" />
    </>
  );
}
