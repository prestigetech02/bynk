import { PageHero } from "@/components/layout/PageHero";

export function ContactHero() {
  return (
    <PageHero
      title="Contact Us"
      headingId="contact-heading"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Contact Us" },
      ]}
    />
  );
}
