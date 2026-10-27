import type { Metadata } from "next";
import { LeadershipHero } from "@/components/leadership/LeadershipHero";
import { LeadershipProfile } from "@/components/leadership/LeadershipProfile";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata, absoluteUrl, siteConfig } from "@/lib/seo";
import { brand } from "@/lib/brand";

export const metadata: Metadata = buildMetadata({
  title: "Our Leadership",
  description:
    "Meet BYNK Advisory’s leadership: Oyindamola Aladejana, Founder and Principal, and Jamila Garba Ibrahim, Lead Legal Consultant for Africa and North America.",
  path: "/company/leadership",
  keywords: [
    "Oyindamola Aladejana",
    "Jamila Garba Ibrahim",
    "BYNK Advisory founder",
    "finance and technology lawyer Canada",
    "corporate governance legal consultant",
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
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Jamila Garba Ibrahim",
            jobTitle: "Lead Legal Consultant, Africa & North America",
            image: absoluteUrl("/about/Jamila.jpeg"),
            url: absoluteUrl("/company/leadership"),
            worksFor: {
              "@type": "Organization",
              name: brand.name,
              url: siteConfig.url,
            },
            alumniOf: [
              {
                "@type": "CollegeOrUniversity",
                name: "University of Lagos",
              },
              {
                "@type": "CollegeOrUniversity",
                name: "Nile University of Nigeria",
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
