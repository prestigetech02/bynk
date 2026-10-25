import Link from "next/link";
import { StrategyButton } from "@/components/header/StrategyButton";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/lib/services";

const challenges = [
  {
    title: "Commercial disputes",
    body: "A dispute can carry financial and reputational consequences well beyond the claim itself.",
  },
  {
    title: "Technology investments",
    body: "A new system or AI program can create governance and operational risk at the same time it creates opportunity.",
  },
  {
    title: "Workplace conflict",
    body: "A people issue can affect culture, performance, and the long-term stability of the organization.",
  },
] as const;

export function AboutChallenges() {
  return (
    <section
      className="w-full bg-[#f4f8fc]"
      aria-labelledby="about-challenges-heading"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <Reveal from="up" duration={1100}>
          <div className="max-w-[44rem]">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#1a2433]">
              Where we help
            </p>
            <h2
              id="about-challenges-heading"
              className="mt-4 text-[clamp(1.9rem,3.4vw,2.85rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#080a12]"
            >
              The hardest problems cross{" "}
              <span
                className="font-normal italic text-[#3b82f6]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                disciplines
              </span>
            </h2>
            <p className="mt-5 max-w-[62ch] text-[1.05rem] leading-[1.8] text-[#3d4b5c]">
              The most significant challenges rarely live in a single field. BYNK
              connects those perspectives so leaders get strategic clarity,
              informed judgment, and a practical next step.
            </p>
          </div>
        </Reveal>

        <ol className="mt-12 grid gap-5 lg:grid-cols-3">
          {challenges.map((challenge, index) => (
            <li key={challenge.title}>
              <Reveal delay={80 + index * 100} from="up" duration={1100}>
                <article className="h-full rounded-[1.15rem] bg-white px-6 py-7 shadow-[0_10px_36px_rgba(12,47,102,0.06)]">
                  <p className="text-[0.78rem] font-semibold tracking-[0.14em] text-[#4eb6ee]">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 text-[1.2rem] font-bold tracking-[-0.02em] text-[#080a12]">
                    {challenge.title}
                  </h3>
                  <p className="mt-3 text-[0.98rem] leading-[1.7] text-[#3d4b5c]">
                    {challenge.body}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={180} from="up" duration={1100} className="mt-14">
          <div className="rounded-[1.35rem] bg-[#07111f] px-6 py-10 text-white sm:px-8 lg:px-10 lg:py-12">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
              <div>
                <h3 className="text-[clamp(1.6rem,2.6vw,2.15rem)] font-bold leading-[1.15] tracking-[-0.03em]">
                  Start with the bigger picture
                </h3>
                <p className="mt-4 max-w-[42ch] text-[1rem] leading-relaxed text-white/70">
                  Tell us the dispute, technology decision, or organizational
                  pressure in front of you. We will help you see it clearly and
                  decide what to do next.
                </p>
                <div className="mt-7">
                  <StrategyButton href="/contact" label="Book a Strategy" />
                </div>
              </div>

              <nav aria-label="BYNK services">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white/45">
                  Advisory areas
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="block rounded-[0.8rem] border border-white/10 bg-white/5 px-4 py-3.5 text-[0.92rem] font-semibold text-white transition-colors hover:border-[#4eb6ee] hover:text-[#4eb6ee]"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
