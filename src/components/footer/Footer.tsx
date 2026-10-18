import Image from "next/image";
import Link from "next/link";
import { FooterMarquee } from "@/components/marquee/FooterMarquee";
import { brand } from "@/lib/brand";
import { services } from "@/lib/services";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "About BYNK", href: "/company/about" },
  { label: "Our Services", href: "/services" },
  { label: "Reach Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
] as const;

const socialLinks = [
  {
    label: "Instagram",
    href: brand.contact.instagramUrl,
    icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: LinkedInIcon,
  },
] as const;

export function Footer() {
  return (
    <footer
      className="bg-[#07111f] px-5 py-14 text-white sm:px-6 lg:px-10 lg:py-16"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="inline-flex" aria-label={brand.name}>
            <Image
              src={brand.logo.src}
              alt={brand.logo.alt}
              width={160}
              height={48}
              className="h-11 w-auto object-contain sm:h-12"
            />
          </Link>

          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <span className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-white/90">
              Follow Us
            </span>
            <ul className="flex items-center gap-3.5">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex text-white transition-colors hover:text-[#4EB6EE]"
                  >
                    <social.icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-10 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] sm:items-start sm:gap-12 lg:gap-16">
          <div>
            <p className="max-w-[48ch] text-[0.95rem] leading-relaxed text-white/70">
              {brand.tagline}
            </p>
            <p
              className="mt-4 text-[1.05rem] italic leading-snug text-[#4EB6EE]"
              style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
            >
              {brand.philosophy}
            </p>
          </div>

          <div>
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-white">
              Reach Us
            </p>
            <dl className="mt-3 space-y-2 text-[0.9rem] leading-relaxed">
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-white/55">Email:</dt>
                <dd>
                  <a
                    href={`mailto:${brand.contact.email}`}
                    className="text-[#3b82f6] underline underline-offset-2 transition-colors hover:text-[#69c1f0]"
                  >
                    {brand.contact.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-white/55">Location:</dt>
                <dd className="text-white/70">{brand.contact.location}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-white/55">Instagram:</dt>
                <dd>
                  <a
                    href={brand.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3b82f6] transition-colors hover:text-[#69c1f0]"
                  >
                    {brand.contact.instagram}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <nav
          className="mt-10 flex flex-wrap gap-x-7 gap-y-3"
          aria-label="Footer"
        >
          {primaryLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[0.82rem] font-semibold uppercase tracking-[0.06em] text-white/90 underline underline-offset-[5px] decoration-white/40 transition-colors hover:text-[#4EB6EE] hover:decoration-[#4EB6EE]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav className="mt-5" aria-label="Footer services">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/45">
            Services
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-[0.85rem] text-white/70 transition-colors hover:text-[#4EB6EE]"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 w-full space-y-4 text-[0.8rem] leading-relaxed text-white/65">
          <p>{brand.mission}</p>
          <p>
            We advise across{" "}
            {services.map((service, index) => (
              <span key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-white/80 underline underline-offset-2 transition-colors hover:text-[#4EB6EE]"
                >
                  {service.title}
                </Link>
                {index < services.length - 2
                  ? ", "
                  : index === services.length - 2
                    ? ", and "
                    : ""}
              </span>
            ))}
            , helping banks and fintech operators turn uncertainty into practical
            decisions, stronger systems, and better outcomes.{" "}
            <Link
              href="/contact"
              className="text-white/80 underline underline-offset-2 transition-colors hover:text-[#4EB6EE]"
            >
              Contact BYNK
            </Link>{" "}
            to start a conversation.
          </p>
        </div>

        <FooterMarquee />

        <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[48rem] text-[0.75rem] leading-relaxed text-white/45">
            Content on this site is for general information only and is not legal
            or regulatory advice. Engage {brand.shortName} before relying on any
            recommendation.
          </p>
          <p className="shrink-0 text-[0.8rem] text-white/55">
            © 2026 {brand.name}
          </p>
        </div>
      </div>
    </footer>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.44v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0-2.16C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0z" />
      <path d="M12 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.15A3.99 3.99 0 1 1 16 12a3.99 3.99 0 0 1-4 4zM18.41 4.15a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
    </svg>
  );
}
