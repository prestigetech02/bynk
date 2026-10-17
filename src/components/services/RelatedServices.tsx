import Link from "next/link";
import { services } from "@/lib/services";

type RelatedServicesProps = {
  currentSlug: string;
};

export function RelatedServices({ currentSlug }: RelatedServicesProps) {
  const related = services.filter((service) => service.slug !== currentSlug);

  return (
    <section
      className="mt-14 border-t border-[#d7e3ef] pt-10"
      aria-labelledby="related-services-heading"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <h3
        id="related-services-heading"
        className="text-[1.35rem] font-bold tracking-[-0.02em] text-[#0c2f66]"
      >
        Explore related BYNK services
      </h3>
      <p className="mt-2 max-w-[48ch] text-[0.95rem] leading-relaxed text-[#5b6b7f]">
        Strong decisions rarely sit in one practice alone. Continue into another
        BYNK advisory area, or{" "}
        <Link href="/contact" className="font-medium text-[#12499d] underline underline-offset-2">
          book a strategy session
        </Link>
        .
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {related.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="block rounded-[0.75rem] border border-[#d7eaf7] bg-white px-4 py-4 transition-colors hover:border-[#4EB6EE] hover:bg-[#eaf5fb]"
            >
              <span className="block text-[0.95rem] font-semibold text-[#0c2f66]">
                {service.title}
              </span>
              <span className="mt-1.5 block text-[0.85rem] leading-relaxed text-[#5b6b7f]">
                {service.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
