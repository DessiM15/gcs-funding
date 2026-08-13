import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { BrandLoader } from "@/components/brand-loader";
import { NavProgress } from "@/components/nav-progress";
import { ScrollReset } from "@/components/scroll-reset";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";
import { JsonLd, organizationSchema, personSchema, websiteSchema } from "@/lib/schema";
import { SITE_URL, site } from "@/lib/site";

// Self-hosted through next/font: no external request, no layout shift, no
// third-party font call for a privacy policy to explain.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "GCS Funding | Business Funding & Customer Financing in Houston, TX",
    // Every page supplies its own keyword-led title; this only appends the brand.
    template: "%s",
  },
  description:
    "GCS Funding helps Houston-area businesses offer customer financing at the point of sale, and secures lines of credit, equipment financing, and compliant card processing. A national direct funding source since 2003.",
  applicationName: site.name,
  authors: [{ name: site.legalName, url: SITE_URL }],
  creator: site.legalName,
  publisher: site.legalName,
  formatDetection: { telephone: false },
  icons: {
    icon: "/icon.svg",
    apple: "/brand/gcs-logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfcfd",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        {/*
          Scroll reveals start at opacity 0. Search engines execute JS so the
          content is indexed either way, but this guarantees the page is readable
          if scripting fails or is blocked.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh antialiased">
        <JsonLd
          schemas={[organizationSchema(), websiteSchema(), personSchema()]}
        />

        <ScrollReset />
        <BrandLoader />
        <NavProgress />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main" className="pt-[72px]">
          {children}
        </main>

        <SiteFooter />
        <StickyCta />
      </body>
    </html>
  );
}
