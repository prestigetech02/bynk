import { PageHero } from "@/components/layout/PageHero";

export function JoinUsHero() {
  return (
    <PageHero
      title="Join Us"
      headingId="join-us-heading"
      imageSrc="/contact/office-collaboration.png"
      imageAlt="People collaborating in a bright advisory workspace"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Join Us" },
      ]}
    />
  );
}
