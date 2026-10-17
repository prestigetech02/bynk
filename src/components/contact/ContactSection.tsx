import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { brand } from "@/lib/brand";
import { services } from "@/lib/services";

const details = [
  {
    label: "Email",
    value: brand.contact.email,
    href: `mailto:${brand.contact.email}`,
    icon: EmailIcon,
  },
  {
    label: "Location",
    value: brand.contact.location,
    href: null,
    icon: LocationIcon,
  },
  {
    label: "Instagram",
    value: brand.contact.instagram,
    href: brand.contact.instagramUrl,
    icon: InstagramIcon,
  },
] as const;

export function ContactSection() {
  return (
    <section
      className="bg-[#f7f9fc] px-5 py-16 sm:px-6 lg:px-8 lg:py-24"
      aria-labelledby="contact-form-heading"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 xl:gap-20">
        <Reveal from="up" duration={1200}>
          <div>
            <h2
              id="contact-form-heading"
              className="text-[clamp(1.75rem,3vw,2.4rem)] font-bold leading-[1.15] tracking-[-0.03em] text-[#080a12]"
            >
              Let’s start the conversation
            </h2>
            <p className="mt-4 max-w-[46ch] text-[1.02rem] leading-relaxed text-[#5b6b7f]">
              Tell us about the technology, risk, or dispute challenge you’re
              navigating. Review our{" "}
              <Link
                href="/services"
                className="font-semibold text-[#12499d] underline underline-offset-2"
              >
                services
              </Link>{" "}
              first, or send a message and we’ll follow up to book a strategy
              session.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </Reveal>

        <Reveal delay={160} from="up" duration={1200}>
          <aside className="rounded-[1.25rem] bg-[#07111f] px-7 py-9 text-white sm:px-8 sm:py-10 lg:px-9">
            <h3 className="text-[1.35rem] font-bold tracking-[-0.02em]">
              Contact details
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-white/65">
              {brand.mission}
            </p>

            <ul className="mt-8 space-y-6">
              {details.map((item) => (
                <li key={item.label}>
                  <div className="group flex items-start gap-3.5">
                    <span className="bynk-contact-icon">
                      <span className="bynk-contact-icon__glyph">
                        <item.icon />
                      </span>
                    </span>
                    <div className="pt-0.5">
                      <p className="text-sm font-semibold text-white">
                        {item.label}:
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={
                            item.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="mt-0.5 block text-sm leading-relaxed text-[#4EB6EE] transition hover:text-[#9AD4F5]"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm leading-relaxed text-white/70">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-white/10 pt-7">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-white/80">
                Popular services
              </p>
              <ul className="mt-3 space-y-2">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-sm text-[#4EB6EE] transition-colors hover:text-[#9AD4F5]"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <p
                className="mt-7 text-[1.05rem] italic leading-snug text-[#4EB6EE]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                {brand.philosophy}
              </p>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-5.4 7-11.2A7 7 0 1 0 5 9.8C5 15.6 12 21 12 21z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="9.8" r="2.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m4.5 7.5 7.5 6 7.5-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0-2.16C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0z" />
      <path d="M12 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.15A3.99 3.99 0 1 1 16 12a3.99 3.99 0 0 1-4 4zM18.41 4.15a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
    </svg>
  );
}
