import type { Metadata } from "next";
import { ClientImpactBody } from "@/components/impact/ClientImpactBody";
import { ClientImpactHero } from "@/components/impact/ClientImpactHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Client Impact",
  description:
    "See how BYNK Advisory turns disputes, technology risk, and organizational pressure into clearer decisions, stronger systems, and practical next steps.",
  path: "/company/client-impact",
  keywords: [
    "BYNK client impact",
    "litigation intelligence financial institutions",
    "dispute strategy outcomes",
    "financial services advisory results",
  ],
  image: "/about/client-impact.jpeg",
  imageAlt: "A team reviewing strategy around a meeting table",
});

export default function ClientImpactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Client Impact", path: "/company/client-impact" },
        ])}
      />
      <ClientImpactHero />
      <ClientImpactBody />
    </>
  );
}
