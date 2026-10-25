import Link from "next/link";
import { StrategyButton } from "@/components/header/StrategyButton";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import type { Industry } from "@/lib/industries";
import { industries } from "@/lib/industries";
import { getService } from "@/lib/services";

export function IndustryView({ industry }: { industry: Industry }) {
  const others = industries.filter((item) => item.slug !== industry.slug);
  const related = industry.serviceSlugs
    .map((slug) => getService(slug))
    .filter((service) => service !== undefined);

  return (
    <>
      <PageHero
        title={industry.title}
        headingId="industry-heading"
        imageSrc="/menu/industries.jpg"
        imageAlt="Financial district skyline"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: industry.title },
        ]}
      />

      <section
        className="bg-[#f4f8fc] px-5 py-16 sm:px-6 lg:px-8 lg:py-24"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
        aria-labelledby="industry-lead-heading"
      >
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-16">
          <Reveal from="up" duration={1100}>
            <div>
              <h2
                id="industry-lead-heading"
                className="max-w-[18ch] text-[clamp(1.9rem,3.4vw,2.7rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#080a12]"
              >
                A familiar pressure,{" "}
                <span
                  className="font-normal italic text-[#3b82f6]"
                  style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
                >
                  seen clearly
                </span>
              </h2>
              <div className="mt-6 max-w-[62ch] space-y-5 text-[1.05rem] leading-[1.8] text-[#3d4b5c]">
                <p>{industry.lead}</p>
                <p>{industry.detail}</p>
              </div>
              <div className="mt-8">
                <StrategyButton href="/contact" label="Book a Strategy" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} from="up" duration={1100}>
            <ul className="space-y-4">
              {industry.points.map((point) => (
                <li
                  key={point}
                  className="rounded-[1rem] border border-[#d7e3ef] bg-white px-5 py-5 text-[1.02rem] leading-snug text-[#0c2f66] shadow-[0_8px_24px_rgba(12,47,102,0.04)]"
                >
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 max-w-[1400px]">
          <Reveal from="up" duration={1100}>
            <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] font-bold tracking-[-0.03em] text-[#080a12]">
              Where this shows up
            </h3>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {industry.situations.map((situation, index) => (
              <Reveal key={situation} delay={index * 70} from="up" duration={1000}>
                <article className="h-full rounded-[1rem] bg-white px-5 py-5 text-[1rem] leading-snug text-[#1a2433] shadow-[0_8px_24px_rgba(12,47,102,0.04)]">
                  {situation}
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-[1400px]">
          <Reveal from="up" duration={1100}>
            <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] font-bold tracking-[-0.03em] text-[#080a12]">
              How BYNK helps
            </h3>
            <p className="mt-3 max-w-[52ch] text-[1rem] leading-relaxed text-[#5b6b7f]">
              These practices are the usual way into this work. Each one can stand alone, and they are often used together.
            </p>
          </Reveal>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {related.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="block h-full rounded-[1rem] border border-[#d7e3ef] bg-white px-5 py-5 transition-colors hover:border-[#4eb6ee]"
                >
                  <span className="block text-[1.05rem] font-semibold text-[#0c2f66]">
                    {service.title}
                  </span>
                  <span className="mt-2 block text-[0.95rem] leading-relaxed text-[#5b6b7f]">
                    {service.menuDescription}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-16 max-w-[1400px] border-t border-[#d7e3ef] pt-10">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#5b6b7f]">
            Other industries
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/industries/${item.slug}`}
                  className="inline-flex rounded-full border border-[#d7e3ef] bg-white px-4 py-2 text-[0.9rem] font-semibold text-[#0c2f66] transition-colors hover:border-[#4eb6ee] hover:text-[#12499d]"
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="inline-flex rounded-full border border-[#d7e3ef] bg-white px-4 py-2 text-[0.9rem] font-semibold text-[#0c2f66] transition-colors hover:border-[#4eb6ee] hover:text-[#12499d]"
              >
                View services
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
