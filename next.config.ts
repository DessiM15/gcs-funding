import type { NextConfig } from "next";

/**
 * Permanent redirects from the previous WordPress site.
 *
 * Sourced from the live wp-sitemap so nothing is guessed. Every old URL either
 * maps to its closest new equivalent or to the most relevant hub page, which
 * preserves any accumulated link equity and prevents an inbound link or an old
 * Google result from landing on a 404.
 */
const legacyRedirects = [
  { source: "/company", destination: "/about" },
  { source: "/financing-programs", destination: "/partners" },
  { source: "/financing-programs/consumer-financing", destination: "/services/consumer-financing" },
  { source: "/financing-programs/line-of-credit", destination: "/services/business-line-of-credit" },
  { source: "/financing-programs/personal-loans", destination: "/services/personal-loans" },
  { source: "/financing-programs/equipment-and-commercial-trucks", destination: "/services/equipment-financing" },
  { source: "/surcharge-card-processing", destination: "/services/credit-card-processing" },
  { source: "/surcharge-card-processing/products", destination: "/services/credit-card-processing" },
  { source: "/contact", destination: "/contact" },
  { source: "/privacy-policy", destination: "/privacy-policy" },
  { source: "/terms-of-use", destination: "/terms-of-use" },
  { source: "/cookie-privacy-policy", destination: "/cookie-policy" },
  { source: "/dmca", destination: "/terms-of-use" },
  { source: "/california-consumer-privacy-act-ccpa", destination: "/privacy-policy" },
  { source: "/particle", destination: "/" },
].filter((entry) => entry.source !== entry.destination);

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return legacyRedirects.map((entry) => ({ ...entry, permanent: true }));
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
