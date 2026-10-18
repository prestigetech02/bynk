import { StrategyButton } from "@/components/header/StrategyButton";
import { Reveal } from "@/components/motion/Reveal";

export function AboutIntro() {
  return (
    <section
      className="w-full bg-[#f4f8fc]"
      aria-labelledby="about-intro-heading"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-16 lg:px-8 lg:py-24 xl:gap-24">
        <Reveal from="up" duration={1100}>
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.78rem] font-medium text-[#1a2433] shadow-[0_4px_18px_rgba(12,47,102,0.08)]">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#69c1f0]"
                aria-hidden
              />
              About Our Company
            </p>

            <h2
              id="about-intro-heading"
              className="mt-6 text-[clamp(2.15rem,4.6vw,3.85rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#080a12]"
            >
              <span className="block">Strategic Thinking for</span>
              <span className="block">
                Stronger{" "}
                <span
                  className="font-normal italic text-[#3b82f6]"
                  style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
                >
                  Businesses
                </span>
              </span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={160} from="up" duration={1100}>
          <div className="flex flex-col lg:items-end lg:pt-2">
            <p className="max-w-[40ch] text-[1.05rem] leading-[1.75] text-[#5b6b7f]">
              We believe successful organizations are built through clear
              priorities, thoughtful decisions, and the ability to adapt.
            </p>

            <div className="mt-8">
              <StrategyButton href="/services" label="Discover More" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
