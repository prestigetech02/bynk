import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { brand } from "@/lib/brand";

export function AboutStory() {
  return (
    <section
      className="w-full bg-[#f4f8fc]"
      aria-labelledby="about-story-heading"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:px-8 lg:py-24">
        <Reveal from="up" duration={1100}>
          <div>
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#1a2433]">
              Who we are
            </p>
            <h2
              id="about-story-heading"
              className="mt-4 max-w-[16ch] text-[clamp(1.9rem,3.4vw,2.85rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#080a12]"
            >
              Independent advice for{" "}
              <span
                className="font-normal italic text-[#3b82f6]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                complex decisions
              </span>
            </h2>
            <div className="mt-6 max-w-[62ch] space-y-5 text-[1.05rem] leading-[1.8] text-[#3d4b5c]">
              <p>
                BYNK is an independent, lawyer-founded strategic advisory
                consultancy. We help businesses, institutions, and professionals
                navigate complex disputes, commercial challenges, emerging
                technologies, and organizational transformation.
              </p>
              <p>
                The practice is built on experience in legal practice, litigation
                management, financial and commercial matters, and technology
                innovation. That is how we sit with executives and professional
                organizations when a decision carries real consequence.
              </p>
              <p>
                We look past the immediate problem to the bigger picture, then
                turn that view into{" "}
                <Link
                  href="/services"
                  className="font-semibold text-[#12499d] underline underline-offset-2"
                >
                  practical advisory
                </Link>
                .
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140} from="up" duration={1100}>
          <div>
            <div className="relative h-[280px] overflow-hidden rounded-[1.35rem] sm:h-[340px] lg:h-[420px]">
              <Image
                src="/services/featured-collaboration.jpg"
                alt="BYNK advisors in conversation with clients"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
            <blockquote className="mt-6 rounded-[1.15rem] bg-white px-6 py-6 shadow-[0_10px_36px_rgba(12,47,102,0.06)] sm:px-7">
              <p
                className="text-[1.45rem] italic leading-snug text-[#0c2f66]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                {brand.philosophy}
              </p>
              <footer className="mt-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#5b6b7f]">
                {brand.shortName} philosophy
              </footer>
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
