import Link from "next/link";
import { StrategyButton } from "@/components/header/StrategyButton";
import { Reveal } from "@/components/motion/Reveal";
import { brand } from "@/lib/brand";

const differences = [
  {
    title: "See around corners",
    body: "Identify emerging legal, technological, and litigation risks before they become institutional problems.",
  },
  {
    title: "Solve across silos",
    body: "Serious banking problems often sit between Legal, Risk, Compliance, Technology, HR, and the business. BYNK works across those boundaries.",
  },
  {
    title: "Turn problems into systems",
    body: "A dispute is more than the matter in front of you. It can reveal what needs to change in technology, process, governance, and organizational design.",
  },
] as const;

const steps = [
  {
    title: "Discover",
    body: "Understand the business context, objectives, stakeholders, and the challenge as it actually sits.",
  },
  {
    title: "Assess",
    body: "Examine the information, name the risks and opportunities, and weigh the strategic options.",
  },
  {
    title: "Challenge",
    body: "Test assumptions, explore alternatives, and bring an independent view to the decision.",
  },
  {
    title: "Design",
    body: "Shape a strategy, practical recommendations, and a roadmap the institution can use.",
  },
  {
    title: "Deliver",
    body: "Support execution and help the organization turn strategic thinking into action.",
  },
] as const;

const audiences = [
  "Financial institutions and fintech companies",
  "Boards, executives, and leadership teams",
  "Corporate legal departments and law firms",
  "Corporations and business owners",
  "Technology companies and startups",
  "Hospitality operators and investors",
  "Entrepreneurs and growth-stage businesses",
  "Institutions and nonprofit organizations",
] as const;

export function ClientImpactBody() {
  return (
    <>
      <section
        className="w-full bg-[#f4f8fc]"
        aria-labelledby="impact-intro-heading"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
      >
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16 lg:px-8 lg:py-24">
          <Reveal from="up" duration={1100}>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.78rem] font-medium text-[#1a2433] shadow-[0_4px_18px_rgba(12,47,102,0.08)]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#69c1f0]" aria-hidden />
                What changes
              </p>
              <h2
                id="impact-intro-heading"
                className="mt-6 text-[clamp(2.15rem,4.6vw,3.85rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#080a12]"
              >
                <span className="block">Uncertainty into</span>
                <span className="block">
                  practical{" "}
                  <span
                    className="font-normal italic text-[#3b82f6]"
                    style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
                  >
                    decisions
                  </span>
                </span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={140} from="up" duration={1100}>
            <div className="lg:pb-2">
              <p
                className="text-[1.45rem] italic leading-snug text-[#0c2f66]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                {brand.philosophy}
              </p>
              <p className="mt-5 max-w-[42ch] text-[1.05rem] leading-[1.75] text-[#3d4b5c]">
                BYNK helps financial institutions navigate what comes next: new
                AI risks, complex disputes, regulatory uncertainty, and the
                human issues that sit inside them. The result is clearer
                decisions, stronger systems, and better outcomes.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="w-full bg-white"
        aria-labelledby="impact-difference-heading"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
      >
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <Reveal from="up" duration={1100}>
            <div className="max-w-[40rem]">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#1a2433]">
                How the work lands
              </p>
              <h2
                id="impact-difference-heading"
                className="mt-4 text-[clamp(1.9rem,3.4vw,2.85rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#080a12]"
              >
                Three ways clients{" "}
                <span
                  className="font-normal italic text-[#3b82f6]"
                  style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
                >
                  feel BYNK
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {differences.map((item, index) => (
              <Reveal key={item.title} delay={80 + index * 100} from="up" duration={1100}>
                <article className="group flex h-full flex-col rounded-[1.15rem] border border-[#d7e3ef] bg-[#f4f8fc] p-6 shadow-[0_8px_24px_rgba(12,47,102,0.04)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(12,47,102,0.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7">
                  <p className="text-[0.78rem] font-semibold tracking-[0.14em] text-[#4eb6ee]">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 text-[1.25rem] font-bold tracking-[-0.02em] text-[#080a12]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-[1.7] text-[#3d4b5c]">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="w-full bg-[#f4f8fc]"
        aria-labelledby="impact-approach-heading"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
      >
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <Reveal from="up" duration={1100}>
            <div className="max-w-[42rem]">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#1a2433]">
                The BYNK approach
              </p>
              <h2
                id="impact-approach-heading"
                className="mt-4 text-[clamp(1.9rem,3.4vw,2.85rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#080a12]"
              >
                Understand. Analyze.{" "}
                <span
                  className="font-normal italic text-[#3b82f6]"
                  style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
                >
                  Challenge. Deliver.
                </span>
              </h2>
            </div>
          </Reveal>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={60 + index * 70} from="up" duration={1000}>
                  <article className="h-full rounded-[1rem] bg-white px-5 py-6 shadow-[0_10px_36px_rgba(12,47,102,0.06)]">
                    <p className="text-[0.78rem] font-semibold tracking-[0.14em] text-[#4eb6ee]">
                      0{index + 1}
                    </p>
                    <h3 className="mt-3 text-[1.1rem] font-bold text-[#080a12]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-[#3d4b5c]">
                      {step.body}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="w-full bg-white"
        aria-labelledby="impact-platform-heading"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
      >
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16 lg:px-8 lg:py-24">
          <Reveal from="up" duration={1100}>
            <div>
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#1a2433]">
                In development
              </p>
              <h2
                id="impact-platform-heading"
                className="mt-4 text-[clamp(1.9rem,3.4vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#080a12]"
              >
                Earlier intelligence on a{" "}
                <span
                  className="font-normal italic text-[#3b82f6]"
                  style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
                >
                  dispute
                </span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={140} from="up" duration={1100}>
            <div className="max-w-[62ch] space-y-5 text-[1.05rem] leading-[1.8] text-[#3d4b5c]">
              <p>
                BYNK is building an AI-powered litigation intelligence platform
                for the gap between a dispute emerging and external counsel
                delivering a full assessment. It is designed to help
                organizations read a complex dispute sooner: exposure, strategic
                considerations, and an early roadmap for senior management.
              </p>
              <p>
                During that early window, institutions may already need to
                decide on reserves, regulatory considerations, customer
                relationships, reputation, and litigation strategy. The platform
                is meant to strengthen and accelerate that decision, not replace
                legal judgment or external counsel.
              </p>
              <p>
                Legal teams can go to counsel with a clearer view of the matter
                from the start. Read how this sits beside{" "}
                <Link
                  href="/services/litigation-disputes"
                  className="font-semibold text-[#12499d] underline underline-offset-2"
                >
                  Litigation & Disputes Strategy
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="w-full bg-[#f4f8fc]"
        aria-labelledby="impact-audiences-heading"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
      >
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="rounded-[1.35rem] bg-[#07111f] px-6 py-10 text-white sm:px-8 lg:px-10 lg:py-12">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
              <Reveal from="up" duration={1100}>
                <div>
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#4eb6ee]">
                    Who we serve
                  </p>
                  <h2
                    id="impact-audiences-heading"
                    className="mt-4 text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[1.15] tracking-[-0.03em]"
                  >
                    Built for institutions facing complex decisions
                  </h2>
                  <p className="mt-4 max-w-[40ch] text-[1rem] leading-relaxed text-white/70">
                    Whether the pressure is a dispute, a technology investment,
                    organizational change, or a new commercial opportunity, BYNK
                    brings an independent view and practical guidance.
                  </p>
                  <div className="mt-7">
                    <StrategyButton href="/contact" label="Start a Conversation" />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={120} from="up" duration={1100}>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {audiences.map((audience) => (
                    <li
                      key={audience}
                      className="rounded-[0.85rem] border border-white/10 bg-white/5 px-4 py-3.5 text-[0.95rem] font-medium leading-snug text-white"
                    >
                      {audience}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
