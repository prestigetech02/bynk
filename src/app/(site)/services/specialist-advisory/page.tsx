import type { Metadata } from "next";
import Link from "next/link";
import { StrategyButton } from "@/components/header/StrategyButton";
import { defaultPageHeroAlt, defaultPageHeroImage, PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const capabilities = [
  {
    title: "Crisis & Sensitive Matters",
    body: "Strategic support when a situation is urgent, complex, or sensitive to reputation. BYNK helps coordinate commercial risk assessments, stakeholder management, organizational response planning, specialist engagement, and business continuity.",
  },
  {
    title: "Strategic Decision Intelligence",
    body: "Independent analysis of high-stakes decisions that involve uncertainty, competing priorities, or significant commercial consequences. The work covers decision frameworks, alternatives, assumptions, and support for executive decisions.",
  },
  {
    title: "Independent Strategic Reviews",
    body: "A second view of a major business decision, a dispute strategy, a technology investment, a transformation program, or an organizational challenge. Reviews look for blind spots, test assumptions, and end in practical recommendations.",
  },
  {
    title: "Fractional Strategic Advisory",
    body: "Ongoing access to senior advisory without a full-time executive appointment. BYNK supports owners, leadership teams, and professional organizations on strategy, innovation, technology decisions, risk oversight, and transformation.",
  },
] as const;

export const metadata: Metadata = buildMetadata({
  title: "Specialist Advisory",
  description:
    "Cross-practice support from BYNK Advisory: crisis matters, strategic decision intelligence, independent reviews, and fractional strategic advisory.",
  path: "/services/specialist-advisory",
  keywords: [
    "crisis advisory",
    "strategic decision intelligence",
    "independent strategic review",
    "fractional advisory",
  ],
  image: defaultPageHeroImage,
  imageAlt: defaultPageHeroAlt,
});

export default function SpecialistAdvisoryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Our Services", path: "/services" },
          { name: "Specialist Advisory", path: "/services/specialist-advisory" },
        ])}
      />
      <PageHero
        title="Specialist Advisory"
        headingId="specialist-heading"
        overlay="both"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Our Services", href: "/services" },
          { label: "Specialist Advisory" },
        ]}
      />

      <section
        className="bg-[#f7f9fc] px-5 py-16 sm:px-6 lg:px-8 lg:py-24"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
        aria-labelledby="specialist-intro-heading"
      >
        <div className="mx-auto max-w-[1400px]">
          <Reveal from="up" duration={1100}>
            <div className="max-w-[46rem]">
              <h2
                id="specialist-intro-heading"
                className="text-[clamp(1.9rem,3.4vw,2.7rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#080a12]"
              >
                Support that cuts across{" "}
                <span
                  className="font-normal italic text-[#3b82f6]"
                  style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
                >
                  the practices
                </span>
              </h2>
              <p className="mt-5 max-w-[62ch] text-[1.05rem] leading-[1.8] text-[#3d4b5c]">
                Some matters do not sit inside one practice. These four
                capabilities are how BYNK shows up when the need is urgent, the
                decision is high-stakes, or the organization wants senior advice
                without a full-time appointment.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {capabilities.map((item, index) => (
              <Reveal key={item.title} delay={80 + index * 80} from="up" duration={1000}>
                <article className="h-full rounded-[1.15rem] border border-[#d7e3ef] bg-white p-6 shadow-[0_8px_24px_rgba(12,47,102,0.04)] sm:p-7">
                  <h3 className="text-[1.25rem] font-bold tracking-[-0.02em] text-[#080a12]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[1.02rem] leading-[1.75] text-[#3d4b5c]">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <StrategyButton href="/contact" label="Book a Strategy" />
            <Link
              href="/services"
              className="text-[0.9rem] font-semibold text-[#12499d] underline underline-offset-2"
            >
              View all services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
