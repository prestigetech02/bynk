import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Header } from "@/components/header/Header";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BYNK Advisory",
    template: "%s | BYNK Advisory",
  },
  description:
    "Strategic advisory for financial institutions and fintech companies navigating technology, innovation, and complex disputes.",
  applicationName: "BYNK Advisory",
  keywords: [
    "BYNK Advisory",
    "financial institutions",
    "fintech",
    "AI advisory",
    "litigation strategy",
    "innovation risk",
    "technology governance",
  ],
  openGraph: {
    title: "BYNK Advisory",
    description:
      "Strategic advisory for financial institutions and fintech companies navigating technology, innovation, and complex disputes.",
    type: "website",
    siteName: "BYNK Advisory",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full antialiased`}>
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
        <SmoothScroll />
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
