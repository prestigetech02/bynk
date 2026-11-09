import type { Metadata } from "next";
import Link from "next/link";
import { StrategyButton } from "@/components/header/StrategyButton";
import {
  defaultPageHeroAlt,
  PageHero,
} from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { brand } from "@/lib/brand";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const heroImage = "/services/technology-ai-hero.png";

const capabilities = [
  {
    title: "Litigation Document Analysis",
    body: "Review pleadings, affidavits, contracts, correspondence, and evidentiary records with structured, source-referenced clarity.",
  },
  {
    title: "Banking & Financial Analysis",
    body: "Examine loan documentation, banking transactions, payment histories, and financial discrepancies across complex files.",
  },
  {
    title: "Evidence & Contradiction Detection",
    body: "Identify potential inconsistencies, gaps, and conflicting statements across litigation records for professional review.",
  },
  {
    title: "Technology Dispute Analysis",
    body: "Organize and analyze technology contracts, digital evidence, and technical documentation in dispute contexts.",
  },
  {
    title: "AI-Generated Litigation Reports",
    body: "Produce structured summaries, chronologies, and source-referenced findings ready for counsel and institutional teams.",
  },
] as const;

export const metadata: Metadata = buildMetadata({
  title: "BYNK AI Litigation Intelligence",
  description:
    "Analyze complex banking, finance, and technology disputes with greater speed, precision, and clarity. Transform litigation records into structured, source-referenced insights.",
  path: "/platform/litigation-intelligence",
  keywords: [
    "litigation intelligence",
    "AI litigation analysis",
    "banking dispute AI",
    "BYNK AI platform",
    "litigation document analysis",
  ],
  image: heroImage,
  imageAlt: defaultPageHeroAlt,
});

export default function LitigationIntelligencePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform/litigation-intelligence" },
          {
            name: "Litigation Intelligence",
            path: "/platform/litigation-intelligence",
          },
        ])}
      />
      <PageHero
        title="Litigation Intelligence"
        headingId="litigation-intelligence-heading"
        imageSrc={heroImage}
        imageAlt="BYNK AI Litigation Intelligence"
        overlay="both"
        titleSpacing
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Platform", href: "/platform/litigation-intelligence" },
          { label: "Litigation Intelligence" },
        ]}
      />

      <section
        className="bg-white px-5 py-16 sm:px-6 lg:px-8 lg:py-20"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
        aria-labelledby="platform-intro-heading"
      >
        <div className="mx-auto max-w-[1400px]">
          <Reveal from="up" duration={1100}>
            <p className="text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-[#12499d]">
              Litigation intelligence. Powered by AI
            </p>
            <h2
              id="platform-intro-heading"
              className="mt-4 max-w-[22ch] text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#080a12]"
            >
              Analyze complex disputes with{" "}
              <span
                className="font-normal italic text-[#3b82f6]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                speed, precision and clarity
              </span>
            </h2>
            <p className="mt-6 max-w-[62ch] text-[1.08rem] leading-[1.8] text-[#3d4b5c]">
              Transform extensive litigation records into structured,
              source-referenced insights through artificial intelligence. BYNK AI
              Litigation Intelligence is an advanced litigation analysis
              platform, designed to support legal professionals, financial
              institutions, forensic investigators, and organizations involved in
              complex banking, financial, and technology disputes.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="bg-[#f7f9fc] px-5 py-16 sm:px-6 lg:px-8 lg:py-24"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
        aria-labelledby="capabilities-heading"
      >
        <div className="mx-auto max-w-[1400px]">
          <Reveal from="up" duration={1100}>
            <h2
              id="capabilities-heading"
              className="text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#080a12]"
            >
              Capabilities
            </h2>
            <p className="mt-4 max-w-[58ch] text-[1.05rem] leading-[1.8] text-[#3d4b5c]">
              Built for professionals who need clearer visibility across dense
              litigation files—without losing the source trail.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((item, index) => (
              <Reveal
                key={item.title}
                delay={80 + index * 70}
                from="up"
                duration={1000}
              >
                <article className="h-full rounded-[1.15rem] border border-[#d7e3ef] bg-white p-6 shadow-[0_8px_24px_rgba(12,47,102,0.04)] sm:p-7">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#12499d]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-[1.2rem] font-bold tracking-[-0.02em] text-[#080a12]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[1.02rem] leading-[1.75] text-[#3d4b5c]">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-[#0c2f66] px-5 py-16 text-white sm:px-6 lg:px-8 lg:py-20"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
        aria-labelledby="early-access-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(78,182,238,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(18,73,157,0.5), transparent 40%)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px]">
          <Reveal from="up" duration={1100}>
            <h2
              id="early-access-heading"
              className="max-w-[20ch] text-[clamp(1.8rem,3.2vw,2.7rem)] font-bold leading-[1.12] tracking-[-0.03em]"
            >
              Transforming complex litigation files into actionable intelligence.
            </h2>
            <p className="mt-5 max-w-[58ch] text-[1.05rem] leading-[1.8] text-white/80">
              Contact {brand.shortName} to register your interest or inquire about
              early access to BYNK AI Litigation Intelligence.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <StrategyButton href="/contact" label="Request Early Access" />
              <Link
                href="/services/litigation-disputes"
                className="text-[0.9rem] font-semibold text-white underline underline-offset-2 transition-colors hover:text-[#4eb6ee]"
              >
                Related: Litigation & Disputes advisory
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
