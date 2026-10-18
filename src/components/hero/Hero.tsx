import { StrategyButton } from "@/components/header/StrategyButton";
import { Reveal } from "@/components/motion/Reveal";
import { brand } from "@/lib/brand";

export function Hero() {
  return (
    <section
      className="bynk-hero relative min-h-[100dvh] overflow-hidden rounded-b-[3.5rem] bg-[#0b1220] sm:rounded-b-[4.5rem] lg:rounded-b-[4.25rem]"
      aria-label="Hero"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      >
        <source src="/7579941-uhd_4096_2160_25fps.mp4" type="video/mp4" />
      </video>

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, rgba(11,18,32,0.88) 0%, rgba(11,18,32,0.65) 28%, rgba(11,18,32,0.35) 45%, rgba(11,18,32,0.1) 52%, rgba(11,18,32,0) 58%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col items-start justify-center px-5 pt-[7.5rem] pb-16 sm:px-6 lg:px-8">
        <Reveal delay={120} duration={1200} from="up">
          <div className="inline-flex items-center gap-2 rounded-[0.3rem] border border-white/10 bg-[#0b1220]/55 py-1 pr-3 pl-1 backdrop-blur-sm">
            <span className="rounded-[0.2rem] bg-[#3b82f6] px-2.5 py-1 text-[0.68rem] font-bold tracking-[0.08em] text-white uppercase">
              {brand.shortName}
            </span>
            <span className="text-[0.68rem] font-medium tracking-[0.1em] text-white/90 uppercase">
              Strategic Advisory
            </span>
          </div>
        </Reveal>

        <Reveal delay={280} duration={1300} from="up" className="mt-5">
          <h1 className="max-w-[15ch] text-[clamp(2.15rem,4.5vw,3.75rem)] leading-[1.08] font-bold tracking-[-0.025em] text-white">
            Strategic Advisory.
            <br />
            Technology. Risk.
            <br />
            Clear Decisions.
          </h1>
        </Reveal>

        <Reveal delay={460} duration={1300} from="up" className="mt-5">
          <p className="max-w-xl text-[clamp(0.98rem,1.35vw,1.125rem)] leading-relaxed text-white/90">
            We help financial institutions and fintech companies navigate
            technology, innovation, and complex disputes, turning uncertainty into
            practical decisions, stronger systems, and better outcomes.
          </p>
        </Reveal>

        <Reveal delay={640} duration={1200} from="up" className="mt-8">
          <StrategyButton href="/services" label="Explore More" />
        </Reveal>
      </div>
    </section>
  );
}
