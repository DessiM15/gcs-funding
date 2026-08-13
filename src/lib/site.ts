/**
 * Single source of truth for business facts, NAP data, and SEO defaults.
 *
 * Every fact here is taken verbatim from gcsfunding.com. Nothing is invented.
 * Items marked NEEDS_SCOTT are placeholders awaiting client confirmation --
 * search the codebase for that token to find every gap before launch.
 */

export const SITE_URL = "https://gcsfunding.com";

export const site = {
  name: "GCS Funding",
  legalName: "GCS Funding, LLC",
  tagline: "The Leader in Securing Funding Options",
  founded: 2003,
  url: SITE_URL,
  email: "info@gcsfunding.com",

  /**
   * NAP (Name / Address / Phone) -- must match Google Business Profile and every
   * citation site character-for-character. Do not edit one without the others.
   *
   * Per client direction the phone is intentionally NOT surfaced in the header or
   * as a click-to-call button. It appears only in the footer, JSON-LD, and the
   * post-submission thank-you page so that Google can verify the entity.
   */
  phone: "(832) 526-8133",
  phoneRaw: "+18325268133",

  address: {
    // NEEDS_SCOTT: "STE 1872" indicates a private mailbox. Google Business Profile
    // prohibits mailbox services and will suspend the listing. Confirm a real
    // physical office, or convert to a Service Area Business with a hidden address.
    street: "16635 Spring Cypress Rd, Ste 1872",
    city: "Cypress",
    state: "TX",
    zip: "77410",
    country: "US",
  },

  // Cypress, TX centroid -- used for LocalBusiness geo schema.
  geo: { lat: 29.9691, lng: -95.6972 },

  social: {
    facebook: "https://www.facebook.com/gcsfundingtx",
  },

  /** Verified claims from the current site, safe to use in copy and schema. */
  stats: {
    yearsInBusiness: new Date().getFullYear() - 2003,
    lenders: 20,
    merchants: 5000,
    maxConsumerLoan: 100_000,
    maxLineOfCredit: 300_000,
  },
} as const;

/** Primary metro plus the surrounding suburbs we build city landing pages for. */
export const serviceArea = [
  "Houston",
  "Cypress",
  "Katy",
  "The Woodlands",
  "Sugar Land",
  "Spring",
  "Tomball",
  "Conroe",
  "Pearland",
] as const;
