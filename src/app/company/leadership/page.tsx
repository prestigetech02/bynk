import type { Metadata } from "next";
import { LeadershipHero } from "@/components/leadership/LeadershipHero";
import { LeadershipProfile } from "@/components/leadership/LeadershipProfile";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata, absoluteUrl, siteConfig } from "@/lib/seo";
import { brand } from "@/lib/brand";

export const metadata: Metadata = buildMetadata({
  title: "Our Leadership",
  description:
    "Oyindamola Aladejana is Founder and Principal of BYNK Advisory, a finance and technology lawyer advising financial institutions on disputes, litigation strategy, and emerging technology.",
  path: "/company/leadership",
  keywords: [
    "Oyindamola Aladejana",
    "BYNK Advisory founder",
    "finance and technology lawyer Canada",
    "litigation strategy financial institutions",
  ],
  image: "/about/0x0.jpg",
  imageAlt: "A compass beside a torn paper reading Leadership",
});

export default function LeadershipPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Our Leadership", path: "/company/leadership" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Oyindamola Aladejana",
            jobTitle: "Founder & Principal",
            image: absoluteUrl("/about/MDCEO.jpeg"),
            url: absoluteUrl("/company/leadership"),
            worksFor: {
              "@type": "Organization",
              name: brand.name,
              url: siteConfig.url,
            },
            alumniOf: [
              {
                "@type": "CollegeOrUniversity",
                name: "Queen's University",
              },
              {
                "@type": "CollegeOrUniversity",
                name: "University of Buckingham",
              },
            ],
          },
        ]}
      />
      <LeadershipHero />
      <LeadershipProfile />
    </>
  );
}
