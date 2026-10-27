import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { defaultPageHeroAlt, defaultPageHeroImage } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/contact/ContactSection";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  buildMetadata,
  contactPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Contact BYNK Advisory in Markham, Ontario. Email info@bynk.ca to book a strategy session on technology, risk, AI, or disputes.",
  path: "/contact",
  keywords: [
    "contact BYNK Advisory",
    "book strategy session",
    "Markham consulting contact",
  ],
  image: defaultPageHeroImage,
  imageAlt: defaultPageHeroAlt,
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          contactPageJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact Us", path: "/contact" },
          ]),
        ]}
      />
      <ContactHero />
      <ContactSection />
    </>
  );
}
