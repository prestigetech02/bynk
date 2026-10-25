import { PageHero } from "@/components/layout/PageHero";

export function LeadershipHero() {
  return (
    <PageHero
      title="Our Leadership"
      headingId="leadership-heading"
      imageSrc="/about/0x0.jpg"
      imageAlt="A compass beside a torn paper reading Leadership"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Our Leadership" },
      ]}
    />
  );
}
