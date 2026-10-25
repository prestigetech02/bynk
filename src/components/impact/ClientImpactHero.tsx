import { PageHero } from "@/components/layout/PageHero";

export function ClientImpactHero() {
  return (
    <PageHero
      title="Client Impact"
      headingId="client-impact-heading"
      imageSrc="/about/client-impact.jpeg"
      imageAlt="A team reviewing strategy around a meeting table"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Client Impact" },
      ]}
    />
  );
}
