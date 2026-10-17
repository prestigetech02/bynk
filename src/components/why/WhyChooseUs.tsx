import Link from "next/link";
import { StrategyButton } from "@/components/header/StrategyButton";
import { Reveal } from "@/components/motion/Reveal";
import { GrowthChart } from "./GrowthChart";

const reasons = [
  {
    number: "01",
    title: "Global Expertise, Local Insight",
    body: "We combine deep international experience with localized market intelligence to help you navigate every region with confidence.",
  },
  {
    number: "02",
    title: "End-To-End Strategic Support",
    body: "From market entry to operational scaling, we offer full-spectrum consulting that adapts to your global growth journey.",
  },
  {
    number: "03",
    title: "Trusted By Global Brands",
    body: "We’ve partnered with some of the world’s most influential companies — delivering impact at scale, across borders.",
  },
] as const;

export function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="relative"
      aria-labelledby="why-choose-heading"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <div className="pointer-events-none absolute inset-0 hidden lg:grid lg:grid-cols-2" aria-hidden>
        <div className="bg-white" />
        <div className="bg-[#eaf5fb]" />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] lg:grid-cols-2">
        <div className="bg-white px-5 py-20 sm:px-6 lg:bg-transparent lg:px-8 lg:py-28 lg:pr-12 xl:pr-16">
          <Reveal from="up" duration={1100}>
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#1a2433]">
              Why Choose Us
            </p>
            <h2
              id="why-choose-heading"
              className="mt-4 max-w-[18ch] text-[clamp(1.9rem,3.4vw,2.85rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#080a12]"
            >
              Transforming Businesses, Delivering Results
            </h2>
          </Reveal>

          <div className="relative mt-10">
            <div
              className="absolute left-[1.35rem] top-4 bottom-4 w-px bg-[#d7e0ea]"
              aria-hidden
            />
            <ol className="list-none">
              {reasons.map((reason, index) => (
                <li
                  key={reason.number}
                  className={index === reasons.length - 1 ? "" : "pb-9"}
                >
                  <Reveal
                    delay={140 + index * 120}
                    from="up"
                    duration={1100}
                    className="group relative flex cursor-default gap-5"
                  >
                    <span className="relative z-10 flex h-[2.7rem] w-[2.7rem] shrink-0 items-center justify-center rounded-full bg-[#e8eef4] text-[0.85rem] font-semibold text-[#1a2433] transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-[#0c2f66] group-hover:text-white">
                      {reason.number}
                    </span>
                    <div className="pt-1 transition-colors duration-300">
                      <h3 className="text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-[#080a12] transition-colors duration-300 group-hover:text-[#0c2f66]">
                        {reason.title}
                      </h3>
                      <p className="mt-2 max-w-[42ch] text-[0.98rem] leading-relaxed text-[#5b6b7f]">
                        {reason.body}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <Reveal delay={280} from="up" duration={1100} className="mt-10">
            <div className="flex flex-wrap items-center gap-4">
              <StrategyButton href="/contact" label="Book a Strategy" />
              <Link
                href="/services"
                className="text-[0.9rem] font-semibold text-[#12499d] underline underline-offset-2"
              >
                Explore our services
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="bg-[#eaf5fb] px-5 py-16 sm:px-6 lg:bg-transparent lg:px-8 lg:py-28 lg:pl-12 xl:pl-16">
          <Reveal delay={200} from="up" duration={1200}>
            <GrowthChart />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
