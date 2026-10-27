import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { brand } from "@/lib/brand";
import { defaultShareImage, siteConfig } from "@/lib/seo";
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
        url: defaultShareImage,
        width: 1200,
        height: 630,
        alt: "Bynk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} | Strategic Advisory for Financial Institutions`,
    description: siteConfig.description,
    images: [defaultShareImage],
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
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
        {children}
      </body>
    </html>
  );
}
