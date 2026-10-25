import { services } from "@/lib/services";

export type MegaLink = {
  label: string;
  href: string;
  description?: string;
  /** Stretch the link across both columns of the mega menu. */
  span?: "full";
};

export type NavItem = {
  label: string;
  /** Omit when the item only opens a mega menu. */
  href?: string;
  mega?: {
    links: MegaLink[];
    image: {
      src: string;
      alt: string;
      caption: string;
      ctaLabel: string;
      ctaHref: string;
    };
  };
};

export const navItems: NavItem[] = [
  {
    label: "Our company",
    mega: {
      links: [
        {
          label: "About BYNK",
          href: "/company/about",
          description: "Who we are and how we sit at the intersections that matter.",
        },
        {
          label: "Leadership",
          href: "/company/leadership",
          description: "Meet the founder and principal guiding BYNK Advisory.",
        },
        {
          label: "Client Impact",
          href: "/company/client-impact",
          description: "How we turn uncertainty into practical decisions and stronger systems.",
        },
        {
          label: "Join Us",
          href: "/company/join-us",
          description: "Explore opportunities to build with BYNK.",
        },
      ],
      image: {
        src: "/menu/company.jpg",
        alt: "Modern advisory workspace",
        caption: "Strategic advisory at the intersection of technology, law and risk.",
        ctaLabel: "About BYNK",
        ctaHref: "/company/about",
      },
    },
  },
  {
    label: "Our Services",
    href: "/services",
    mega: {
      links: [
        ...services.map((service) => ({
          label: service.title,
          href: `/services/${service.slug}`,
          description: service.menuDescription,
        })),
        {
          label: "Specialist Advisory",
          href: "/services/specialist-advisory",
          description:
            "Crisis support, decision intelligence, reviews, and fractional advisory.",
          span: "full",
        },
      ],
      image: {
        src: "/menu/services.jpg",
        alt: "Consulting team collaborating",
        caption: "Legal judgment + technology fluency + litigation insight.",
        ctaLabel: "View services",
        ctaHref: "/services",
      },
    },
  },
  {
    label: "Industries",
    href: "/industries",
    mega: {
      links: [
        {
          label: "Banks & Financial Institutions",
          href: "/industries/banks",
          description: "Complex change, disputes, and technology risk inside regulated banks.",
        },
        {
          label: "Fintech Companies",
          href: "/industries/fintech",
          description: "Responsible innovation and growth for emerging financial platforms.",
        },
        {
          label: "Payments & Digital Banking",
          href: "/industries/payments",
          description: "Product, privacy, and operational risk across digital channels.",
        },
        {
          label: "Capital Markets & Wealth",
          href: "/industries/capital-markets",
          description: "Advisory for institutions navigating litigation and transformation.",
        },
      ],
      image: {
        src: "/menu/industries.jpg",
        alt: "Financial district skyline",
        caption: "Built for financial institutions and fintech operators.",
        ctaLabel: "Explore industries",
        ctaHref: "/industries",
      },
    },
  },
  {
    label: "Reach Us",
    href: "/contact",
  },
];
