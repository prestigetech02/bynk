import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export type PageHeroCrumb = {
  label: string;
  href?: string;
};

type PageHeroProps = {
  title: string;
  crumbs: PageHeroCrumb[];
  imageSrc?: string;
  imageAlt?: string;
  headingId?: string;
  /** Left-only overlay by default; use "both" for left + right fades. */
  overlay?: "left" | "both";
  /** Extra vertical space around the page title. */
  titleSpacing?: boolean;
};

const leftOverlay =
  "linear-gradient(90deg, rgba(12,47,102,0.78) 0%, rgba(7,17,31,0.58) 22%, rgba(7,17,31,0.28) 42%, rgba(7,17,31,0.08) 58%, rgba(7,17,31,0) 68%)";

const rightOverlay =
  "linear-gradient(270deg, rgba(12,47,102,0.78) 0%, rgba(7,17,31,0.58) 22%, rgba(7,17,31,0.28) 42%, rgba(7,17,31,0.08) 58%, rgba(7,17,31,0) 68%)";

export function PageHero({
  title,
  crumbs,
  imageSrc = "/contact/office-collaboration.png",
  imageAlt = "BYNK Advisory",
  headingId = "page-heading",
  overlay = "left",
  titleSpacing = false,
}: PageHeroProps) {
  const heightClass = titleSpacing
    ? "h-[min(68vh,700px)] min-h-[420px] sm:min-h-[460px] lg:h-[min(72vh,760px)]"
    : "h-[min(58vh,560px)] min-h-[340px] sm:min-h-[380px] lg:h-[min(62vh,620px)]";

  return (
    <section
      className={`relative overflow-hidden rounded-b-[1.75rem] bg-[#0b1220] sm:rounded-b-[2rem] ${heightClass}`}
      aria-labelledby={headingId}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-[center_35%]"
        sizes="100vw"
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{ background: leftOverlay }}
      />
      {overlay === "both" ? (
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
          style={{ background: rightOverlay }}
        />
      ) : null}

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col px-5 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center pt-[6.5rem] pb-20">
          <Reveal
            delay={120}
            duration={1200}
            from="up"
            className={titleSpacing ? "py-5 sm:py-7" : undefined}
          >
            <h1
              id={headingId}
              className="max-w-[16ch] text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white"
              style={{ fontFamily: '"Google Sans", sans-serif' }}
            >
              {title}
            </h1>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-20">
        <Reveal delay={220} duration={1100} from="up">
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-3 rounded-tr-[0.85rem] bg-white py-3.5 pr-6 pl-4 sm:pr-8"
            style={{ fontFamily: '"Google Sans", sans-serif' }}
          >
            <Link
              href="/"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.3rem] bg-[#3b82f6] text-white transition-colors hover:bg-[#2563eb]"
              aria-label="Home"
            >
              <HomeIcon />
            </Link>
            <ol className="flex flex-wrap items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-[#0c2f66]">
              {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;
                return (
                  <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                    {index > 0 ? <span aria-hidden>/</span> : null}
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="transition-colors hover:text-[#12499d]"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current={isLast ? "page" : undefined}>
                        {crumb.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}

function HomeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3.2 3.8 10.2c-.3.25-.3.7 0 .95l.7.55c.25.2.6.2.85 0L12 6.6l6.65 5.1c.25.2.6.2.85 0l.7-.55c.3-.25.3-.7 0-.95L12 3.2zM6.5 12.5V19c0 .55.45 1 1 1h3v-4.25c0-.41.34-.75.75-.75h1.5c.41 0 .75.34.75.75V20h3c.55 0 1-.45 1-1v-6.5L12 8.2 6.5 12.5z" />
    </svg>
  );
}
