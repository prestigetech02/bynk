import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { defaultPageHeroAlt, defaultPageHeroImage, PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceBody } from "@/components/services/ServiceBody";
import { getService, services } from "@/lib/services";
import {
  breadcrumbJsonLd,
  buildMetadata,
  serviceJsonLd,
} from "@/lib/seo";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service" };

  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
    image: service.heroImage || defaultPageHeroImage,
    imageAlt: service.heroImage ? service.heroImageAlt : defaultPageHeroAlt,
  });
}

export default function ServicePage({ params }: ServicePageProps) {
  return (
    <Suspense fallback={<ServicePageFallback />}>
      <ServicePageContent params={params} />
    </Suspense>
  );
}

async function ServicePageContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(service),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Our Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      <PageHero
        title={service.title}
        headingId="service-heading"
        overlay="both"
        titleSpacing
        imageSrc={service.heroImage}
        imageAlt={service.heroImageAlt}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Our Services", href: "/services" },
          { label: service.title },
        ]}
      />
      <ServiceBody service={service} />
    </>
  );
}

function ServicePageFallback() {
  return (
    <>
      <div className="h-[min(68vh,700px)] min-h-[420px] animate-pulse rounded-b-[1.75rem] bg-[#0b1220] sm:min-h-[460px] sm:rounded-b-[2rem]" />
      <div className="bg-[#f7f9fc] px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.75fr)] lg:gap-12">
          <div className="space-y-6">
            <div className="aspect-[16/10] animate-pulse rounded-[1.15rem] bg-[#e7f0f8]" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-[#e7f0f8]" />
            <div className="h-28 animate-pulse rounded bg-[#e7f0f8]" />
          </div>
          <div className="h-72 animate-pulse rounded-[1.15rem] bg-white" />
        </div>
      </div>
    </>
  );
}
