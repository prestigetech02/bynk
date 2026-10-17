import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { services } from "@/lib/services";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Services",
  description:
    "Explore BYNK Advisory services: Technology & AI Advisory, Litigation & Disputes Strategy, Innovation Risk Sprint, and Workplace Mental Health Risk.",
  path: "/services",
  keywords: [
    "BYNK services",
    "financial services consulting",
    "AI advisory services",
    "litigation strategy services",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Our Services", path: "/services" },
        ])}
      />
      <PageHero
        title="Our Services"
        headingId="services-heading"
        overlay="both"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Our Services" },
        ]}
      />

      <section
        className="bg-[#f7f9fc] px-5 py-16 sm:px-6 lg:px-8 lg:py-20"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
        aria-labelledby="services-list-heading"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="max-w-[60ch] text-[1.05rem] leading-relaxed text-[#5b6b7f]">
            BYNK works at the intersections that matter for financial
            institutions and fintech operators.{" "}
            <Link
              href="/contact"
              className="font-medium text-[#12499d] underline underline-offset-2"
            >
              Reach our team
            </Link>{" "}
            when you are ready to start a strategy conversation.
          </p>
          <h2 id="services-list-heading" className="sr-only">
            All BYNK Advisory services
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {services.map((service, index) => (
              <Reveal
                key={service.slug}
                delay={index * 80}
                from="up"
                duration={1100}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="block rounded-[1.15rem] bg-white px-6 py-7 transition-colors hover:bg-[#eaf5fb]"
                >
                  <h3 className="text-[1.25rem] font-bold tracking-[-0.02em] text-[#0c2f66]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-[#5b6b7f]">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-block text-[0.85rem] font-semibold text-[#12499d]">
                    Learn more →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
