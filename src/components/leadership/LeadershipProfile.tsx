import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

const credentials = [
  {
    label: "Licensed to practise",
    value: "Nigeria and Ontario, Canada",
  },
  {
    label: "Financial innovation",
    value: "Master’s, Smith School of Business, Queen’s University",
  },
  {
    label: "Commercial law",
    value: "Master’s, University of Buckingham, Financial Services",
  },
  {
    label: "Risk and technology",
    value: "CRISC, CAMS, Oxford Fintech Programme, AI governance",
  },
] as const;

export function LeadershipProfile() {
  return (
    <section
      className="w-full bg-white"
      aria-labelledby="leadership-profile-heading"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16 xl:gap-20">
          <Reveal from="up" duration={1100}>
            <figure className="lg:sticky lg:top-28">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.35rem] bg-[#eaf2f8]">
                <Image
                  src="/about/MDCEO.jpeg"
                  alt="Oyindamola Aladejana, Founder and Principal of BYNK Advisory"
                  fill
                  className="object-cover object-[center_18%]"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
              </div>
              <figcaption className="mt-4 text-[0.82rem] font-semibold text-[#0c2f66]">
                Founder & Principal, BYNK Advisory
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={120} from="up" duration={1100}>
            <div>
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#1a2433]">
                Founder & Principal
              </p>
              <h2
                id="leadership-profile-heading"
                className="mt-3 text-[clamp(2.1rem,4vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.035em] text-[#080a12]"
              >
                Oyindamola{" "}
                <span
                  className="font-normal italic text-[#3b82f6]"
                  style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
                >
                  Aladejana
                </span>
              </h2>

              <div className="mt-7 max-w-[68ch] space-y-5 text-[1.05rem] leading-[1.8] text-[#3d4b5c]">
                <p>
                  Oyindamola Aladejana is a finance and technology lawyer and
                  strategic advisor working at the intersection of technology,
                  litigation, innovation, and financial services. Licensed to
                  practise law in Nigeria and Ontario, Canada, she brings a
                  multidisciplinary perspective to the legal, technological, and
                  business challenges facing financial institutions.
                </p>
                <p>
                  She is the founder of BYNK and helps financial institutions
                  assess disputes, quantify litigation risk, develop strategy,
                  and prepare for complex litigation. Her work in legal
                  technology looks at how artificial intelligence, data, and
                  emerging technologies can change legal decision-making and
                  risk management inside financial institutions.
                </p>
                <p>
                  Before founding BYNK, Oyindamola was in-house counsel at a
                  commercial bank, advising internal and external stakeholders
                  on litigation management, technology, business risk, and
                  related strategic matters. That seat gives her a practical
                  view of how legal, risk, technology, and business functions
                  meet inside highly regulated institutions.
                </p>
                <p>
                  She holds a Master’s degree in Financial Innovation &
                  Technology from Smith School of Business at Queen’s
                  University, and a Master’s degree in International &
                  Commercial Law, specializing in Financial Services, from the
                  University of Buckingham. She is also a Certified
                  Counterintelligence Threat Analyst and an AI governance
                  professional, with credentials that include CRISC, CAMS, and
                  the Oxford Fintech Programme at Saïd Business School,
                  University of Oxford.
                </p>
              </div>

              <p className="mt-8 text-[0.98rem] leading-relaxed text-[#3d4b5c]">
                To discuss a matter with Oyindamola,{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-[#12499d] underline underline-offset-2"
                >
                  contact BYNK
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {credentials.map((item, index) => (
            <Reveal
              key={item.label}
              delay={80 + index * 80}
              from="up"
              duration={1000}
            >
              <article className="h-full rounded-[1rem] border border-[#d7e3ef] bg-[#f4f8fc] px-5 py-5">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#4eb6ee]">
                  {item.label}
                </p>
                <p className="mt-2 text-[0.95rem] font-semibold leading-snug text-[#0c2f66]">
                  {item.value}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
