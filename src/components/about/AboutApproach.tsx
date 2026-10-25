import { Reveal } from "@/components/motion/Reveal";

const lenses = [
  {
    title: "Legal awareness",
    body: "Judgment shaped by legal practice and litigation management, so risk is seen early and named clearly.",
    icon: ScaleIcon,
  },
  {
    title: "Commercial strategy",
    body: "Advice grounded in finance and business reality, so a decision protects value as well as position.",
    icon: ChartIcon,
  },
  {
    title: "Technology intelligence",
    body: "A clear read on emerging technology, so investment and adoption do not outrun governance.",
    icon: NodeIcon,
  },
  {
    title: "Human-centred thinking",
    body: "Attention to the people inside the decision, because culture and trust shape the outcome.",
    icon: PeopleIcon,
  },
] as const;

export function AboutApproach() {
  return (
    <section
      className="w-full bg-white"
      aria-labelledby="about-approach-heading"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <Reveal from="up" duration={1100}>
          <div className="max-w-[46rem]">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#1a2433]">
              How we work
            </p>
            <h2
              id="about-approach-heading"
              className="mt-4 text-[clamp(1.9rem,3.4vw,2.85rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#080a12]"
            >
              One conversation,{" "}
              <span
                className="font-normal italic text-[#3b82f6]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                four perspectives
              </span>
            </h2>
            <p className="mt-5 max-w-[62ch] text-[1.05rem] leading-[1.8] text-[#3d4b5c]">
              Our approach combines experience in finance, litigation management,
              business advisory, and technology with a deep understanding of the
              commercial and human dimensions of complex decisions.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {lenses.map((lens, index) => (
            <Reveal
              key={lens.title}
              delay={80 + index * 90}
              from="up"
              duration={1100}
            >
              <article className="group flex h-full gap-5 rounded-[1.15rem] border border-[#d7e3ef] bg-[#f4f8fc] p-6 shadow-[0_8px_24px_rgba(12,47,102,0.04)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(12,47,102,0.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7">
                <span className="[perspective:520px]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[0.75rem] bg-[#0c2f66] text-white transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] motion-reduce:transition-none motion-reduce:group-hover:[transform:none]">
                    <lens.icon />
                  </span>
                </span>
                <div>
                  <h3 className="text-[1.15rem] font-bold tracking-[-0.02em] text-[#080a12]">
                    {lens.title}
                  </h3>
                  <p className="mt-2 text-[0.98rem] leading-[1.7] text-[#3d4b5c]">
                    {lens.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScaleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4.5v15M8.5 19.5h7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M12 6.5 6.2 9.2M12 6.5l5.8 2.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M4.8 9.2h3.2l-1.6 3.4a1.6 1.6 0 0 1-3.2 0L4.8 9.2Zm11.2 0h3.2l-1.6 3.4a1.6 1.6 0 0 1-3.2 0l1.6-3.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.5 19.5h15M7 16.5V11M12 16.5V7.5M17 16.5v-3.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NodeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="6" cy="12" r="2.1" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.5" cy="7" r="2.1" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.5" cy="17" r="2.1" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 11.2 14.4 8M8 12.8l6.4 3.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="9.2" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.8 18.2c.6-2.4 2.4-3.7 4.2-3.7s3.6 1.3 4.2 3.7M14 14.6c1.3-.3 2.6.2 3.4 1.6.5.9.8 1.6.8 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
