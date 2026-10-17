import type { Service } from "@/lib/services";

type ServiceWhyChooseProps = {
  service: Service;
};

export function ServiceWhyChoose({ service }: ServiceWhyChooseProps) {
  return (
    <div className="mt-12 max-w-[58ch]">
      <h3 className="text-[clamp(1.45rem,2.4vw,1.85rem)] font-bold leading-[1.2] tracking-[-0.03em] text-[#0c2f66]">
        Why Choose Our {service.title}?
      </h3>
      <p className="mt-4 text-[1.02rem] leading-[1.8] text-[#3d4b5c]">
        {service.whyChoose.intro}
      </p>
      <ul className="mt-6 space-y-3.5">
        {service.whyChoose.points.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <span
              className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4EB6EE] text-white"
              aria-hidden
            >
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.5 7.2 5.4 10.2 11.5 3.8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-[1.02rem] leading-relaxed text-[#3d4b5c]">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
