import { SITE_URL, site } from "@/lib/site";

/**
 * JSON-LD builders.
 *
 * Structured data is how Google resolves "GCS Funding" from a string into an
 * entity it can attach a location, a service list, and a person to. It also
 * powers FAQ and breadcrumb rich results. Every page emits at least a
 * breadcrumb; money pages add Service and FAQPage.
 */

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PERSON_ID = `${SITE_URL}/about#scott-reed`;

export function organizationSchema() {
  return {
    "@type": ["FinancialService", "LocalBusiness"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: SITE_URL,
    email: site.email,
    telephone: site.phone,
    foundingDate: String(site.founded),
    slogan: site.tagline,
    description:
      "GCS Funding is a national direct funding source based in Cypress, Texas, providing point-of-sale customer financing, business lines of credit, equipment and commercial truck financing, personal loans, and compliant credit card surcharge processing.",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/brand/gcs-logo.png`,
    },
    image: `${SITE_URL}/brand/gcs-logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    // Service-area business: we serve the Houston metro rather than take walk-ins.
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: site.geo.lat,
        longitude: site.geo.lng,
      },
      geoRadius: "80000",
    },
    priceRange: "$$",
    sameAs: [site.social.facebook],
    founder: { "@id": PERSON_ID },
  };
}

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Scott Reed",
    // NEEDS_SCOTT: confirm exact title, credentials, and headshot URL.
    jobTitle: "Founder & Lending Broker",
    worksFor: { "@id": ORG_ID },
    url: `${SITE_URL}/about`,
    knowsAbout: [
      "Point-of-sale consumer financing",
      "Business lines of credit",
      "Equipment and commercial truck financing",
      "High-risk merchant processing",
      "Credit card surcharge compliance",
    ],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: site.name,
    publisher: { "@id": ORG_ID },
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: input.url,
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Greater Houston, Texas",
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

/** Renders one @graph script tag so all entities on a page can cross-reference. */
export function JsonLd({ schemas }: { schemas: object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": schemas,
        }),
      }}
    />
  );
}
