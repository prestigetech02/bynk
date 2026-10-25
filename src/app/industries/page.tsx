import type { Metadata } from "next";
import Link from "next/link";
import { StrategyButton } from "@/components/header/StrategyButton";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { industries } from "@/lib/industries";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industries",
  description:
    "BYNK advises banks, fintech companies, payments and digital banking teams, and capital markets and wealth firms.",
  path: "/industries",
  keywords: [
    "bank advisory",
    "fintech advisory",
    "payments consulting",
    "capital markets advisory",
  ],
  image: "/services/social-legal-tech.png",
  imageAlt: "A hand selecting legal technology tools on a digital interface",
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />
      <PageHero
        title="Industries"
        headingId="industries-heading"
        imageSrc="/services/social-legal-tech.png"
        imageAlt="A hand selecting legal technology tools on a digital interface"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Industries" },
        ]}
      />

      <section
        className="bg-[#f4f8fc] px-5 py-16 sm:px-6 lg:px-8 lg:py-24"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-5 sm:grid-cols-2">
            {industries.map((industry, index) => (
              <Reveal key={industry.slug} delay={index * 80} from="up" duration={1000}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="block h-full rounded-[1.15rem] bg-white px-6 py-7 shadow-[0_8px_24px_rgba(12,47,102,0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(12,47,102,0.1)]"
                >
                  <h2 className="text-[1.25rem] font-bold tracking-[-0.02em] text-[#0c2f66]">
                    {industry.title}
                  </h2>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-[#5b6b7f]">
                    {industry.menuDescription}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-12">
            <StrategyButton href="/contact" label="Book a Strategy" />
          </div>
        </div>
      </section>
    </>
  );
}
