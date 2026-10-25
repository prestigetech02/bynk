import type { Metadata } from "next";
import { JoinUsBody } from "@/components/join/JoinUsBody";
import { JoinUsHero } from "@/components/join/JoinUsHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { defaultPageHeroAlt, defaultPageHeroImage } from "@/components/layout/PageHero";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Join Us",
  description:
    "BYNK Advisory is an independent practice at the intersection of technology, litigation, innovation, and financial services. Write to the team about working together.",
  path: "/company/join-us",
  keywords: [
    "join BYNK Advisory",
    "careers BYNK",
    "advisory careers Canada",
  ],
  image: defaultPageHeroImage,
  imageAlt: "People collaborating in a bright advisory workspace",
});

export default function JoinUsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Join Us", path: "/company/join-us" },
        ])}
      />
      <JoinUsHero />
      <JoinUsBody />
    </>
  );
}
