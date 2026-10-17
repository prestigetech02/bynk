import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { RelatedServices } from "@/components/services/RelatedServices";
import { ServiceSidebar } from "@/components/services/ServiceSidebar";
import { ServiceWhyChoose } from "@/components/services/ServiceWhyChoose";
import { StrategyButton } from "@/components/header/StrategyButton";
import type { Service } from "@/lib/services";

type ServiceBodyProps = {
  service: Service;
};

export function ServiceBody({ service }: ServiceBodyProps) {
  return (
    <section
      className="bg-[#f7f9fc] px-5 py-14 sm:px-6 lg:px-8 lg:py-20"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.75fr)] lg:items-start lg:gap-12 xl:gap-16">
        <Reveal from="up" duration={1200}>
          <article>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.15rem] bg-[#e7f0f8]">
              <Image
                src="/services/featured-collaboration.jpg"
                alt="BYNK advisors collaborating with clients around a shared strategy"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>

            <h2 className="mt-9 max-w-[22ch] text-[clamp(1.65rem,2.8vw,2.35rem)] font-bold leading-[1.15] tracking-[-0.03em] text-[#080a12]">
              Real people. Clear judgment. Decisions you can stand behind.
            </h2>

            <div className="mt-6 max-w-[58ch] space-y-5 text-[1.05rem] leading-[1.85] text-[#3d4b5c]">
              <p className="bynk-dropcap">
                At BYNK, {service.title.toLowerCase()} is never only about systems,
                statutes, or slides. We sit with your leaders, listen carefully, and
                help your teams face complex change as a human challenge—so the people
                carrying the risk feel seen, supported, and ready to decide.
              </p>
              <p>
                We bring legal judgment, technology fluency, and practical empathy into
                the same conversation. That is how BYNK turns uncertainty into clarity:
                not by distancing you from the problem, but by walking through it with
                you—toward stronger systems, calmer teams, and better outcomes.
              </p>
            </div>

            <ServiceWhyChoose service={service} />

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <StrategyButton href="/contact" label="Book a Strategy" />
              <Link
                href="/services"
                className="text-[0.9rem] font-semibold text-[#12499d] underline underline-offset-2 transition-colors hover:text-[#0c2f66]"
              >
                View all services
              </Link>
            </div>

            <RelatedServices currentSlug={service.slug} />
          </article>
        </Reveal>

        <Reveal delay={140} from="up" duration={1200}>
          <ServiceSidebar currentSlug={service.slug} />
        </Reveal>
      </div>
    </section>
  );
}
