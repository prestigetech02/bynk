import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SupportChat } from "@/components/support/SupportChat";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <SmoothScroll />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <SupportChat />
    </>
  );
}
