import Image from "next/image";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

const metrics = [
  {
    end: 98,
    suffix: "%",
    label: "Client Retention",
  },
  {
    end: 15,
    suffix: "K",
    label: "Successful Projects",
  },
] as const;

export function AboutImpact() {
  return (
    <section
      className="w-full bg-[#f4f8fc]"
      aria-label="BYNK impact"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <div className="mx-auto grid max-w-[1400px] gap-6 px-5 pb-16 sm:px-6 sm:pb-20 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)] lg:items-stretch lg:gap-7 lg:px-8 lg:pb-24">
        <Reveal from="up" duration={1100} className="min-h-0">
          <div className="relative h-full min-h-[240px] overflow-hidden rounded-[1.35rem] sm:min-h-[300px] lg:min-h-[360px]">
            <Image
              src="/about/metrics-collage.png"
              alt="BYNK advisors collaborating with clients across strategy, partnership, and data-led decisions"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
          </div>
        </Reveal>

        <Reveal delay={140} from="up" duration={1100} className="min-h-0">
          <div className="flex h-full items-center justify-center rounded-[1.35rem] bg-white px-5 py-10 shadow-[0_10px_36px_rgba(12,47,102,0.06)] sm:px-6 lg:px-4 xl:px-6">
            <div className="grid w-full grid-cols-2 items-stretch divide-x divide-[#e4ebf2]">
              {metrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className={`flex flex-col items-center justify-center text-center ${
                    index === 0 ? "pr-4 sm:pr-6" : "pl-4 sm:pl-6"
                  }`}
                >
                  <p className="text-[clamp(2.4rem,4vw,3.35rem)] font-bold leading-none tracking-[-0.04em] text-[#080a12]">
                    <CountUp
                      end={metric.end}
                      suffix={metric.suffix}
                      duration={1600}
                      delay={index * 120}
                    />
                  </p>
                  <p className="mt-3 max-w-[10ch] text-[0.92rem] font-medium leading-snug text-[#1a2433]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
