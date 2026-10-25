import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/lib/services";

type PracticeItem = {
  number: string;
  title: string;
  href: string;
  image: string;
  imageAlt: string;
};

const practices: PracticeItem[] = services.map((service, index) => ({
  number: String(index + 1).padStart(2, "0"),
  title: service.title,
  href: `/services/${service.slug}`,
  image: service.image,
  imageAlt: service.imageAlt,
}));

function PracticeCard({ item }: { item: PracticeItem }) {
  return (
    <article className="relative h-full">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-px -right-px z-20 h-[4.25rem] w-[4.25rem] rounded-full bg-[#eef4fa] sm:h-[4.75rem] sm:w-[4.75rem]"
      />

      <div
        aria-hidden
        className="absolute top-1.5 right-1.5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[0.95rem] font-bold text-[#0c2f66] shadow-[0_8px_22px_rgba(12,47,102,0.1)] sm:top-2 sm:right-2 sm:h-14 sm:w-14 sm:text-[1.05rem]"
      >
        {item.number}
      </div>

      <div className="grid h-full min-h-[220px] overflow-hidden rounded-[1.5rem] bg-white shadow-[0_16px_40px_rgba(12,47,102,0.07)] md:grid-cols-[42%_1fr]">
        <div className="relative min-h-[180px] bg-[#e7f0f8] md:min-h-[220px]">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>

        <div className="flex flex-col justify-center px-5 py-6 pr-16 sm:px-6 sm:pr-20">
          <h3 className="text-[1.35rem] leading-[1.2] font-bold tracking-[-0.02em] text-[#0c2f66] sm:text-[1.5rem]">
            {item.title}
          </h3>

          <Link
            href={item.href}
            className="mt-5 inline-flex text-sm font-semibold text-[#12499d] transition hover:text-[#2aa6e8]"
          >
            Learn more →
          </Link>
        </div>
      </div>
    </article>
  );
}

export function Practice() {
  return (
    <section
      className="relative bg-[#eef4fa] px-5 py-20 sm:px-6 lg:px-8 lg:py-28"
      aria-labelledby="practice-heading"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 max-w-2xl lg:mb-14">
          <Reveal from="up" duration={1200}>
            <h2
              id="practice-heading"
              className="text-[clamp(1.85rem,3vw,2.75rem)] font-bold tracking-[-0.03em] text-[#0c2f66]"
            >
              Our Practice
            </h2>
          </Reveal>
          <Reveal delay={160} from="up" duration={1200} className="mt-4">
            <p className="max-w-xl text-base leading-relaxed text-[#5b6b7f]">
              Legal judgment, technology fluency, and litigation insight, applied
              where financial institutions face their hardest problems.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {practices.map((item, index) => (
            <Reveal
              key={item.number}
              delay={220 + index * 140}
              duration={1200}
              from="up"
              className="h-full"
            >
              <PracticeCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
