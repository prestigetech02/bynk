import Link from "next/link";
import { RequestServiceForm } from "@/components/services/RequestServiceForm";
import { services } from "@/lib/services";

type ServiceSidebarProps = {
  currentSlug: string;
};

export function ServiceSidebar({ currentSlug }: ServiceSidebarProps) {
  return (
    <div className="space-y-5 lg:sticky lg:top-28">
      <aside
        className="rounded-[1.15rem] bg-white p-5 sm:p-6"
        aria-label="Services navigation"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
      >
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#12499d]">
          Our Services
        </p>

        <nav className="mt-5">
          <ul className="space-y-3.5">
            {services.map((service) => {
              const active = service.slug === currentSlug;

              return (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={`bynk-service-nav ${active ? "is-active" : ""}`}
                  >
                    <span className="bynk-service-nav__fill" aria-hidden />
                    <span className="bynk-service-nav__label">{service.title}</span>
                    <span className="bynk-service-nav__arrow" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <RequestServiceForm currentSlug={currentSlug} />
    </div>
  );
}
