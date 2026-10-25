import type { Metadata } from "next";
import Link from "next/link";
import { defaultPageHeroAlt, defaultPageHeroImage, PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { brand } from "@/lib/brand";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${brand.name} collects, uses, and protects personal information when you visit bynk.ca or contact the firm.`,
  path: "/privacy",
  keywords: ["BYNK privacy policy", "bynk.ca privacy", "BYNK personal information"],
  image: defaultPageHeroImage,
  imageAlt: defaultPageHeroAlt,
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
          <p className="text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-[#5b6b7f]">
            Last updated October 25, 2026
          </p>
          <p>
            {brand.name} (“BYNK”, “we”, “us”) is based in {brand.contact.location}.
            This policy explains how we handle personal information when you visit{" "}
            <Link href="/" className="font-semibold text-[#12499d] underline underline-offset-2">
              bynk.ca
            </Link>{" "}
            or contact us. It should be read with our{" "}
            <Link
              href="/terms"
              className="font-semibold text-[#12499d] underline underline-offset-2"
            >
              Terms of Service
            </Link>
            .
          </p>

          <h2 className="pt-2 text-[1.35rem] font-bold text-[#0c2f66]">
            Information we collect
          </h2>
          <p>
            If you use the contact or service request forms, your browser opens an
            email to {brand.contact.email}. We receive your name, email address,
            phone number, organization, and message only if you send that email.
            We may also receive the same details if you write to us directly.
          </p>
          <p>
            The on-site assistant keeps the conversation in your browser for that
            visit. It does not send the chat to BYNK. If you want a person to
            see a question, use the contact form or email us.
          </p>
          <p>
            Our site may receive ordinary technical information from your browser,
            such as pages viewed and general device data, through hosting or
            analytics tools. We use that information to keep the site working and
            to understand which pages are useful.
          </p>

          <h2 className="pt-2 text-[1.35rem] font-bold text-[#0c2f66]">
            How we use information
          </h2>
          <p>
            We use contact details to reply to you, to discuss a possible
            engagement, and to provide the advisory services you ask for. We do
            not sell personal information. We do not send marketing messages
            unless you ask to hear from us.
          </p>
          <p>
            We keep inquiry information only for as long as we need it to respond,
            to manage a relationship, or to meet a legal or professional
            obligation. You may ask us what we hold about you, or ask us to
            correct or delete it, by emailing {brand.contact.email}.
          </p>

          <h2 className="pt-2 text-[1.35rem] font-bold text-[#0c2f66]">
            Sharing
          </h2>
          <p>
            We do not share your inquiry with other clients. We may share
            information with service providers who host the website or support our
            operations, and only for that purpose. We may also disclose
            information if the law requires it, or if we need to protect BYNK,
            our clients, or others from harm.
          </p>

          <h2 className="pt-2 text-[1.35rem] font-bold text-[#0c2f66]">
            Where we operate
          </h2>
          <p>
            BYNK is in Canada. If you contact us from another country, your
            information may be handled in Canada. We handle personal information
            in line with applicable Canadian privacy law, including the Personal
            Information Protection and Electronic Documents Act where it applies.
          </p>

          <h2 className="pt-2 text-[1.35rem] font-bold text-[#0c2f66]">
            Contact
          </h2>
          <p>
            Privacy questions can be sent to{" "}
            <a
              href={`mailto:${brand.contact.email}`}
              className="font-semibold text-[#12499d] underline underline-offset-2"
            >
              {brand.contact.email}
            </a>
            . You can also use the{" "}
            <Link
              href="/contact"
              className="font-semibold text-[#12499d] underline underline-offset-2"
            >
              contact page
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
