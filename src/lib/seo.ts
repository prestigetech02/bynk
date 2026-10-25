import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { industries } from "@/lib/industries";
import { services, type Service } from "@/lib/services";

export const siteConfig = {
  name: brand.name,
  shortName: brand.shortName,
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://bynk.ca",
  locale: "en_CA",
  description:
    "Strategic advisory for financial institutions and fintech companies navigating technology, AI, innovation risk, litigation strategy, and complex disputes.",
  keywords: [
    "BYNK Advisory",
    "financial institutions advisory",
    "fintech consulting Canada",
    "AI advisory banks",
    "technology governance",
    "litigation strategy",
    "dispute risk intelligence",
    "innovation risk",
    "workplace mental health risk",
    "Markham Ontario consulting",
  ],
} as const;

/** Share card for the main site when a page has no hero image of its own. */
export const defaultShareImage = "/og-default.png";

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized === "/" ? "" : normalized}`;
}

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  image = defaultShareImage,
  imageAlt = brand.name,
  type = "website",
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const fullTitle = title === brand.name ? title : title;

  return {
    title: fullTitle,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: brand.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
          ...(image === defaultShareImage ? { width: 1200, height: 630 } : {}),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: brand.name,
    alternateName: brand.shortName,
    url: siteConfig.url,
    logo: absoluteUrl(brand.logo.src),
    image: absoluteUrl(brand.logo.src),
    description: siteConfig.description,
    email: brand.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Markham",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    sameAs: [brand.contact.instagramUrl],
    areaServed: {
      "@type": "Country",
      name: "Canada",
    },
    knowsAbout: services.map((service) => service.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "BYNK Advisory Services",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: absoluteUrl(`/services/${service.slug}`),
        },
      })),
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: brand.name,
      url: siteConfig.url,
    },
    inLanguage: "en-CA",
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: {
      "@type": "Organization",
      name: brand.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: "Canada",
    },
    serviceType: service.title,
    image: absoluteUrl(service.heroImage || service.image),
  };
}

export function aboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${brand.name}`,
    url: absoluteUrl("/company/about"),
    description:
      "BYNK helps financial institutions make better decisions at the intersection of technology, innovation, law and risk.",
    mainEntity: {
      "@type": "Organization",
      name: brand.name,
      url: siteConfig.url,
      email: brand.contact.email,
    },
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${brand.name}`,
    url: absoluteUrl("/contact"),
    description: `Contact ${brand.name} in Markham, Ontario for strategic advisory.`,
    mainEntity: {
      "@type": "Organization",
      name: brand.name,
      email: brand.contact.email,
      url: siteConfig.url,
    },
  };
}

export const marketingRoutes = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/company/about", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/company/leadership", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/company/client-impact", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/company/join-us", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/services", changeFrequency: "weekly" as const, priority: 0.9 },
  {
    path: "/services/specialist-advisory",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  { path: "/industries", changeFrequency: "monthly" as const, priority: 0.8 },
  ...industries.map((industry) => ({
    path: `/industries/${industry.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  })),
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
  ...services.map((service) => ({
    path: `/services/${service.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  })),
];
