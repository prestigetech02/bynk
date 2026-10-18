import { PageHero } from "@/components/layout/PageHero";

export function AboutHero() {
  return (
    <PageHero
      title="About Us"
      headingId="about-page-heading"
      imageSrc="/about/approach.jpg"
      imageAlt="BYNK advisors collaborating on strategy"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "About Us" },
      ]}
    />
  );
}
