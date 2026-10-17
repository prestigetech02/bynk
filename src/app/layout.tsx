import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { brand } from "@/lib/brand";
import {
  organizationJsonLd,
  siteConfig,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${brand.name} | Strategic Advisory for Financial Institutions`,
    template: `%s | ${brand.name}`,
  },
  description: siteConfig.description,
  applicationName: brand.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: brand.name, url: siteConfig.url }],
  creator: brand.name,
  publisher: brand.name,
  category: "Business Consulting",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${brand.name} | Strategic Advisory for Financial Institutions`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: brand.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: brand.logo.src,
        alt: brand.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} | Strategic Advisory for Financial Institutions`,
    description: siteConfig.description,
    images: [brand.logo.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: brand.logo.src,
    apple: brand.logo.src,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-CA" className={`${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="flex min-h-full flex-col"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
      >
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <SmoothScroll />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
