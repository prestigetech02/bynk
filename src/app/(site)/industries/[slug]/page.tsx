import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryView } from "@/components/industries/IndustryView";
import { JsonLd } from "@/components/seo/JsonLd";
import { getIndustry, industries } from "@/lib/industries";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    return {};
  }

  return buildMetadata({
    title: industry.title,
    description: industry.seoDescription,
    path: `/industries/${industry.slug}`,
    keywords: [industry.title, "BYNK Advisory", industry.menuDescription],
    image: "/menu/industries.jpg",
    imageAlt: "Financial district skyline",
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.title, path: `/industries/${industry.slug}` },
        ])}
      />
      <IndustryView industry={industry} />
    </>
  );
}
