import { industries } from "@/lib/industries";
import { services } from "@/lib/services";
import { locations } from "@/lib/locations";

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    label: "Partner Program",
    href: "/partners",
    items: [
      {
        label: "How the partner program works",
        href: "/partners",
        description: "Offer financing to your customers at the point of sale",
      },
      ...industries.map((industry) => ({
        label: industry.name,
        href: `/partners/${industry.slug}`,
        description: industry.typicalTicket,
      })),
    ],
  },
  {
    label: "Financing",
    href: "/services/consumer-financing",
    items: services.map((service) => ({
      label: service.nav,
      href: `/services/${service.slug}`,
      description: service.eyebrow,
    })),
  },
  {
    label: "Areas We Serve",
    href: "/locations",
    items: locations.map((location) => ({
      label: location.city,
      href: `/locations/${location.slug}`,
    })),
  },
  {
    label: "Resources",
    href: "/resources",
    items: [
      {
        label: "Surcharge Savings Calculator",
        href: "/resources/surcharge-savings-calculator",
        description: "See what card fees cost you each year",
      },
      {
        label: "Financing Impact Calculator",
        href: "/resources/financing-impact-calculator",
        description: "Model what offering financing does to revenue",
      },
      { label: "Insights & Guides", href: "/blog" },
    ],
  },
];

export const footerLegal: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Accessibility", href: "/accessibility" },
];
