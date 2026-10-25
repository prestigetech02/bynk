import Link from "next/link";
import { StrategyButton } from "@/components/header/StrategyButton";
import { Reveal } from "@/components/motion/Reveal";
import { brand } from "@/lib/brand";

const principles = [
  {
    title: "Lawyer-founded perspective",
    body: "Legal practice, finance, litigation management, and technology shape how complex commercial problems are read.",
  },
  {
    title: "Integrated thinking",
    body: "Disciplines that are often kept apart are connected, so the risk and the opportunity are seen together.",
  },
  {
    title: "Independent judgment",
    body: "Assumptions are tested. The view stays objective and tied to the client’s priorities.",
  },
  {
    title: "Technology with care",
    body: "Technology is treated as transformative, and also as a matter of governance, risk, and implementation.",
  },
  {
    title: "Commercial practicality",
    body: "The work is meant to end in a clear recommendation, a practical decision, and a real business outcome.",
  },
  {
    title: "Discretion",
    body: "Disputes, financial matters, workplace issues, and organizational change are handled with care.",
  },
] as const;

export function JoinUsBody() {
  return (
    <>
      <section
        className="w-full bg-[#f4f8fc]"
        aria-labelledby="join-intro-heading"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
      >
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16 lg:px-8 lg:py-24">
          <Reveal from="up" duration={1100}>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.78rem] font-medium text-[#1a2433] shadow-[0_4px_18px_rgba(12,47,102,0.08)]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#69c1f0]" aria-hidden />
                Careers
              </p>
              <h2
                id="join-intro-heading"
                className="mt-6 text-[clamp(2.15rem,4.6vw,3.85rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#080a12]"
              >
                <span className="block">Build with</span>
                <span
                  className="block font-normal italic text-[#3b82f6]"
                  style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
                >
                  BYNK
                </span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={140} from="up" duration={1100}>
            <div className="max-w-[46ch] lg:pb-2">
              <p className="text-[1.05rem] leading-[1.75] text-[#3d4b5c]">
                BYNK is an independent advisory practice at the intersection of
                technology, litigation, innovation, and financial services. There
                are no open roles listed here. If your experience belongs in
                that work, write to us.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <StrategyButton
                  href={`mailto:${brand.contact.email}`}
                  label="Write to BYNK"
                />
                <Link
                  href="/contact"
                  className="text-[0.9rem] font-semibold text-[#12499d] underline underline-offset-2"
                >
                  Or use the contact form
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="w-full bg-white"
        aria-labelledby="join-principles-heading"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
      >
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <Reveal from="up" duration={1100}>
            <div className="max-w-[40rem]">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#1a2433]">
                The standard of the work
              </p>
              <h2
                id="join-principles-heading"
                className="mt-4 text-[clamp(1.9rem,3.4vw,2.85rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#080a12]"
              >
                What the practice{" "}
                <span
                  className="font-normal italic text-[#3b82f6]"
                  style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
                >
                  holds to
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((item, index) => (
              <Reveal key={item.title} delay={70 + index * 70} from="up" duration={1000}>
                <article className="h-full rounded-[1.15rem] border border-[#d7e3ef] bg-[#f4f8fc] p-6 shadow-[0_8px_24px_rgba(12,47,102,0.04)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(12,47,102,0.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <h3 className="text-[1.15rem] font-bold tracking-[-0.02em] text-[#080a12]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.98rem] leading-[1.7] text-[#3d4b5c]">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
