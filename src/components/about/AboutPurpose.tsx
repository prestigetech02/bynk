import { Reveal } from "@/components/motion/Reveal";

const statements = [
  {
    title: "Our Mission",
    lead: "To help financial institutions make better decisions at the intersection of technology, innovation, law and risk.",
    icon: MissionIcon,
  },
  {
    title: "Our Vision",
    lead: "To redefine how financial institutions use legal and risk expertise, not simply to respond to problems, but to design better businesses.",
    icon: VisionIcon,
  },
] as const;

const advantages = [
  "Legal judgment",
  "Technology fluency",
  "Litigation insight",
  "Innovation strategy",
  "Financial-services specialization",
] as const;

export function AboutPurpose() {
  return (
    <section
      className="w-full bg-white"
      aria-labelledby="about-purpose-heading"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <h2 id="about-purpose-heading" className="sr-only">
          Mission, vision, and value proposition
        </h2>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
          {statements.map((statement, index) => (
            <Reveal
              key={statement.title}
              delay={index * 120}
              from="up"
              duration={1100}
              className="h-full"
            >
              <article className="group flex h-full gap-5 rounded-[1.15rem] border border-[#d7e3ef] bg-[#f4f8fc] p-6 shadow-[0_8px_24px_rgba(12,47,102,0.04)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(12,47,102,0.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:gap-6 sm:p-8">
                <span className="[perspective:520px]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-[0.85rem] bg-[#0c2f66] text-white transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] motion-reduce:transition-none motion-reduce:group-hover:[transform:none]">
                    <statement.icon />
                  </span>
                </span>
                <div>
                  <h3 className="text-[1.25rem] font-bold tracking-[-0.02em] text-[#080a12]">
                    {statement.title}
                  </h3>
                  <p className="mt-3 text-[1.05rem] font-medium leading-[1.7] text-[#0c2f66]">
                    {statement.lead}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160} from="up" duration={1100} className="mt-8">
          <article className="rounded-[1.15rem] border border-[#d7e3ef] bg-[#07111f] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-10">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#4eb6ee]">
              Value proposition
            </p>
            <h3 className="mt-3 max-w-[28ch] text-[clamp(1.55rem,2.6vw,2.15rem)] font-bold leading-[1.15] tracking-[-0.03em]">
              A lawyer&apos;s judgment for problems legal advice alone cannot solve.
            </h3>
            <p className="mt-4 max-w-[78ch] text-[1.02rem] leading-[1.75] text-white/75">
              BYNK helps banks, financial institutions and fintechs anticipate
              risk, navigate disputes, adopt emerging technology responsibly, and
              turn legal and operational challenges into opportunities for
              innovation.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {advantages.map((advantage) => (
                <li
                  key={advantage}
                  className="rounded-[0.85rem] border border-white/10 bg-white/5 px-4 py-4 text-[0.95rem] font-semibold leading-snug text-white"
                >
                  {advantage}
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-[70ch] text-[0.98rem] leading-relaxed text-white/70">
              Most competitors hold two or three of these. BYNK&apos;s advantage
              is the integration of all five.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function MissionIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="1.35" fill="currentColor" />
    </svg>
  );
}

function VisionIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M2.75 12S6.2 6.75 12 6.75 21.25 12 21.25 12 17.8 17.25 12 17.25 2.75 12 2.75 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
