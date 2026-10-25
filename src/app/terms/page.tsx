import type { Metadata } from "next";
import Link from "next/link";
import { defaultPageHeroAlt, defaultPageHeroImage, PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { brand } from "@/lib/brand";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: `Terms for using the ${brand.name} website. Site content is general information and does not create a client relationship.`,
  path: "/terms",
  keywords: ["BYNK terms of service", "bynk.ca terms", "BYNK website terms"],
  image: defaultPageHeroImage,
  imageAlt: defaultPageHeroAlt,
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
      <PageHero
        title="Terms of Service"
        headingId="terms-heading"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Terms of Service" },
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
            These terms apply when you use the {brand.name} website. By using the
            site, you agree to them. Questions about these terms, or about our{" "}
            <Link
              href="/privacy"
              className="font-semibold text-[#12499d] underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            , can be sent to {brand.contact.email}.
          </p>

          <h2 className="pt-2 text-[1.35rem] font-bold text-[#0c2f66]">
            Information, not advice
          </h2>
          <p>
            Pages, articles, and replies from the on-site assistant are general
            information about BYNK. They are not legal, regulatory, financial, or
            other professional advice, and they are not a recommendation for your
            institution. Do not rely on them as a substitute for advice on your
            own facts.
          </p>
          <p>
            Sending a message, or using the assistant, does not make you a client
            of BYNK. A client relationship begins only when we agree to it in
            writing. Until then, do not send confidential or privileged
            information you need us to hold under a professional retainer.
          </p>

          <h2 className="pt-2 text-[1.35rem] font-bold text-[#0c2f66]">
            Using the site
          </h2>
          <p>
            You may browse the site and contact us for a lawful purpose. You may
            not misuse the site, attempt to disrupt it, scrape it in a way that
            harms the service, or use it to send unlawful, misleading, or harmful
            material.
          </p>
          <p>
            Contact forms open an email in your own mail program. We receive the
            message only if you send it. The on-site assistant answers from
            information on this website and does not replace a conversation with
            the firm.
          </p>

          <h2 className="pt-2 text-[1.35rem] font-bold text-[#0c2f66]">
            Our content
          </h2>
          <p>
            The BYNK name, logo, text, and design of this site belong to{" "}
            {brand.name} or its licensors. You may share a link to a page. You
            may not copy the site, or use the BYNK name or logo, without our
            permission, except where the law allows.
          </p>

          <h2 className="pt-2 text-[1.35rem] font-bold text-[#0c2f66]">
            No warranty
          </h2>
          <p>
            We work to keep the site accurate and available, and we may change or
            remove content at any time. The site is provided as it is. We do not
            promise that it will be error-free, complete, or always available.
          </p>
          <p>
            To the extent the law allows, BYNK is not liable for loss that comes
            from using the site, relying on its general information, or being
            unable to use it. Nothing in these terms limits liability that cannot
            be limited under the laws of Ontario or Canada.
          </p>

          <h2 className="pt-2 text-[1.35rem] font-bold text-[#0c2f66]">
            Other sites
          </h2>
          <p>
            Links to other websites, including social media, are provided for
            convenience. Those sites have their own terms and privacy practices.
            BYNK is not responsible for them.
          </p>

          <h2 className="pt-2 text-[1.35rem] font-bold text-[#0c2f66]">
            Law and contact
          </h2>
          <p>
            These terms are governed by the laws of the Province of Ontario and
            the federal laws of Canada that apply there. If a court finds part of
            these terms unenforceable, the rest remains in effect.
          </p>
          <p>
            {brand.name}, {brand.contact.location}. Email{" "}
            <a
              href={`mailto:${brand.contact.email}`}
              className="font-semibold text-[#12499d] underline underline-offset-2"
            >
              {brand.contact.email}
            </a>{" "}
            or use the{" "}
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
