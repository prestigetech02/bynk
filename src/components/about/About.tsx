import Image from "next/image";
import Link from "next/link";
import { StrategyButton } from "@/components/header/StrategyButton";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

const stats: Array<{
  end: number | null;
  suffix?: string;
  label: string;
}> = [
  {
    end: 25,
    suffix: "+",
    label:
      "years of combined financial services expertise across technology, law and risk",
  },
  {
    end: 40,
    suffix: "+",
    label:
      "institutions and fintech operators guided through complex change and disputes",
  },
  {
    end: 100,
    suffix: "%",
    label:
      "of engagements built across Legal, Risk, Compliance, Technology and the business",
  },
  {
    end: null,
    label:
      "problems solved across silos, not handed off between advisors who never meet",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative bg-[#f7f9fc] px-5 py-20 sm:px-6 lg:px-8 lg:py-28"
      aria-labelledby="about-heading"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal from="up" duration={1200}>
          <h2
            id="about-heading"
            className="text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.15] tracking-[-0.03em]"
          >
            <span className="font-bold text-[#080a12]">Our Approach to </span>
            <span
              className="text-[#3b82f6] italic"
              style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
            >
              Business Growth
            </span>
          </h2>
        </Reveal>

        <div className="mt-8 grid items-start gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)] lg:gap-10 xl:gap-12">
          <Reveal delay={160} from="up" duration={1200}>
            <div className="relative h-[220px] overflow-hidden rounded-[1.5rem] bg-[#e7f0f8] shadow-[0_18px_50px_rgba(12,47,102,0.08)] sm:h-[260px] lg:h-[280px]">
              <Image
                src="/about/approach.jpg"
                alt="BYNK advisors collaborating on strategy"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 65vw"
              />
            </div>
          </Reveal>

          <Reveal delay={240} from="up" duration={1200}>
            <div>
              <p className="text-[1.05rem] leading-[1.85] text-[#3d4b5c] sm:text-[1.15rem]">
                BYNK helps financial institutions navigate complex change, emerging
                technology and high-stakes disputes by combining legal judgment,
                strategic thinking and innovation. Explore our{" "}
                <Link
                  href="/services"
                  className="font-semibold text-[#12499d] underline underline-offset-2"
                >
                  advisory services
                </Link>{" "}
                or{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-[#12499d] underline underline-offset-2"
                >
                  contact the team
                </Link>{" "}
                to turn uncertainty into practical decisions, stronger systems and
                better outcomes.
              </p>

              <div className="mt-8">
                <StrategyButton href="/contact" label="Lets have a session" />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} from="up" duration={1200} className="mt-12 lg:mt-16">
          <div className="rounded-[1.5rem] bg-white px-6 py-10 shadow-[0_16px_40px_rgba(12,47,102,0.06)] sm:px-8 lg:px-10 lg:py-12">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {stats.map((stat, index) => (
                <Reveal
                  key={stat.label}
                  delay={120 + index * 100}
                  duration={1100}
                  from="up"
                  className="text-center"
                >
                  <p className="text-[clamp(2.4rem,4vw,3.25rem)] font-bold leading-none tracking-[-0.04em] text-[#0c2f66]">
                    {stat.end !== null ? (
                      <CountUp
                        end={stat.end}
                        suffix={stat.suffix}
                        duration={1600 + index * 120}
                        delay={index * 80}
                      />
                    ) : (
                      <span aria-label="unlimited">∞</span>
                    )}
                  </p>
                  <p className="mx-auto mt-4 max-w-[22ch] text-[0.92rem] leading-relaxed text-[#5b6b7f]">
                    {stat.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
