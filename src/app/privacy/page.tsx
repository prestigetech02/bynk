import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { brand } from "@/lib/brand";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${brand.name} collects, uses, and protects personal information when you contact us or use bynk.ca.`,
  path: "/privacy",
  keywords: ["BYNK privacy policy", "bynk.ca privacy"],
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <PageHero
        title="Privacy Policy"
        headingId="privacy-heading"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <section
        className="bg-[#f7f9fc] px-5 py-16 sm:px-6 lg:px-8 lg:py-20"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
      >
        <div className="mx-auto max-w-[760px] space-y-6 text-[1.02rem] leading-relaxed text-[#3d4b5c]">
          <p>
            {brand.name} (“BYNK”, “we”, “us”) respects your privacy. This page
            explains how we handle information when you visit{" "}
            <Link href="/" className="text-[#12499d] underline underline-offset-2">
              bynk.ca
            </Link>{" "}
            or contact us through our{" "}
            <Link
              href="/contact"
              className="text-[#12499d] underline underline-offset-2"
            >
              Contact Us
            </Link>{" "}
            page.
          </p>
          <h2 className="pt-2 text-[1.35rem] font-bold text-[#0c2f66]">
            Information we collect
          </h2>
          <p>
            When you reach out, we may receive your name, email address, phone
            number, organization details, and the content of your message. We
            use this information only to respond to your inquiry and deliver
            requested advisory services.
          </p>
          <h2 className="pt-2 text-[1.35rem] font-bold text-[#0c2f66]">
            How we use information
          </h2>
          <p>
            We do not sell personal information. We may use limited analytics to
            understand how visitors use our website and to improve our{" "}
            <Link
              href="/services"
              className="text-[#12499d] underline underline-offset-2"
            >
              services
            </Link>{" "}
            and content.
          </p>
          <h2 className="pt-2 text-[1.35rem] font-bold text-[#0c2f66]">
            Contact
          </h2>
          <p>
            For privacy questions, email{" "}
            <a
              href={`mailto:${brand.contact.email}`}
              className="text-[#12499d] underline underline-offset-2"
            >
              {brand.contact.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
