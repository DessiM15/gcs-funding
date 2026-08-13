/**
 * City landing pages.
 *
 * Each page carries genuinely distinct local content -- real districts, real
 * local industry mix, real reasons a business there needs funding. Spinning one
 * template with the city name swapped is a doorway-page violation under Google's
 * spam policies, so every `context` and `industries` value below is specific to
 * that city and the pages are intentionally limited to markets GCS actually serves.
 */

export type Location = {
  slug: string;
  city: string;
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;
  /** Two or three sentences of real local economic context. */
  context: string;
  /** Named areas within the city, used in body copy. */
  areas: string[];
  /** The business types that actually dominate this market. */
  industries: string[];
  /** One locally-specific angle that no other city page repeats. */
  angle: { title: string; body: string };
};

export const locations: Location[] = [
  {
    slug: "houston",
    city: "Houston",
    metaTitle: "Business Funding & Customer Financing in Houston, TX",
    metaDescription:
      "Houston business lines of credit to $300K, equipment and truck financing, high-risk card processing, and customer financing programs. A Houston-area broker since 2003.",
    targetKeyword: "business funding Houston",
    context:
      "Houston runs on small and mid-sized businesses that serve energy, healthcare, construction, and logistics, and almost all of them carry the same problem: revenue arrives on someone else's schedule while payroll arrives on yours. It is also a city where hurricane season, freeze events, and energy cycles can reshape a quarter without warning, which is exactly when a line of credit that was opened in a calm month earns its keep.",
    areas: [
      "the Energy Corridor",
      "the Texas Medical Center",
      "Westchase",
      "the Heights",
      "Greenspoint",
      "the Ship Channel industrial corridor",
    ],
    industries: [
      "Trucking and logistics",
      "Medical and dental practices",
      "Home services and construction",
      "Auto sales and repair",
      "Retail and restaurants",
    ],
    angle: {
      title: "Built for Houston's cash flow reality",
      body: "Storm damage, freeze events, and energy-cycle slowdowns all hit Houston businesses the same way: a sudden expense on a month with thin cash. A revolving line approved in advance, with no fee to open and no fee to keep, means the money is already there when the market decides to test you.",
    },
  },
  {
    slug: "cypress",
    city: "Cypress",
    metaTitle: "Business Funding & Customer Financing in Cypress, TX",
    metaDescription:
      "GCS Funding is based in Cypress, TX. Business lines of credit, equipment financing, surcharge card processing, and customer financing programs for Cypress-area businesses.",
    targetKeyword: "business funding Cypress TX",
    context:
      "Cypress is our home market. The Highway 290 and Grand Parkway corridor has absorbed years of rooftop growth, and that growth has pulled in exactly the businesses that benefit most from consumer financing: pool builders, remodelers, HVAC companies, landscapers, and med spas serving a large base of newer homes with owners who are still building equity.",
    areas: [
      "the US-290 corridor",
      "Bridgeland",
      "Fairfield",
      "Towne Lake",
      "Coles Crossing",
      "the Grand Parkway",
    ],
    industries: [
      "Pool builders and outdoor living",
      "HVAC and home services",
      "Remodeling contractors",
      "Med spas and dental practices",
      "Landscaping companies",
    ],
    angle: {
      title: "A local broker, not a call center",
      body: "GCS Funding has operated out of Cypress since 2003. That matters less for the paperwork and more for the part that actually decides deals: knowing which lenders move quickly on a Cypress home services business, and which ones will waste two weeks before declining.",
    },
  },
  {
    slug: "katy",
    city: "Katy",
    metaTitle: "Business Funding & Customer Financing in Katy, TX",
    metaDescription:
      "Customer financing programs, business lines of credit, and merchant processing for Katy, TX businesses. Approvals in as fast as 20 minutes. Serving Katy since 2003.",
    targetKeyword: "business funding Katy TX",
    context:
      "Katy's growth along I-10 and the Grand Parkway has produced a dense base of owner-operated home services and retail businesses chasing a large, relatively affluent residential market. In that environment the constraint is rarely demand. It is the customer's ability to say yes to the full ticket in one payment.",
    areas: [
      "the I-10 Energy Corridor stretch",
      "Cinco Ranch",
      "Cross Creek Ranch",
      "Old Katy",
      "Firethorne",
    ],
    industries: [
      "Home improvement and remodeling",
      "Pool and outdoor living",
      "Medical and aesthetic practices",
      "Retail and specialty services",
      "Auto repair",
    ],
    angle: {
      title: "Where financing changes the average ticket",
      body: "In a market with strong household income but heavy mortgage and property tax load, homeowners are payment buyers rather than cash buyers. Presenting a monthly option alongside the estimate is often the entire difference between the base package and the full scope.",
    },
  },
  {
    slug: "the-woodlands",
    city: "The Woodlands",
    metaTitle: "Business Funding & Customer Financing in The Woodlands, TX",
    metaDescription:
      "Business lines of credit to $300K, patient and customer financing, and compliant surcharge processing for The Woodlands, TX. Houston-area broker with 20+ lenders.",
    targetKeyword: "business funding The Woodlands TX",
    context:
      "The Woodlands carries a concentration of professional services, medical and aesthetic practices, and corporate-adjacent businesses clustered around Town Center and the I-45 corridor. These are higher-ticket, consultation-driven businesses, which makes point-of-sale financing less about affordability and more about closing while the patient or client is still in the room.",
    areas: [
      "Town Center",
      "Hughes Landing",
      "Sterling Ridge",
      "Creekside Park",
      "the I-45 corridor",
    ],
    industries: [
      "Med spas and aesthetic practices",
      "Dental and specialty medical",
      "Professional services",
      "High-end remodeling",
      "Retail and restaurants",
    ],
    angle: {
      title: "Closing consultation-driven sales",
      body: "For elective medical, dental, and aesthetic practices, the deal is won or lost in the consult. A soft-pull application the patient completes privately on their own phone, returning offers in about ten seconds, converts interest into a booked procedure before they leave.",
    },
  },
  {
    slug: "sugar-land",
    city: "Sugar Land",
    metaTitle: "Business Funding & Customer Financing in Sugar Land, TX",
    metaDescription:
      "Merchant processing, high-risk placement, business lines of credit, and customer financing for Sugar Land, TX businesses. Over 5,000 merchants processing with GCS.",
    targetKeyword: "business funding Sugar Land TX",
    context:
      "Sugar Land and the wider Fort Bend market hold one of the most diverse small business bases in the metro, with a heavy concentration of independent retail, restaurants, and owner-operated medical and professional practices. For businesses in that mix, card processing costs are often a larger monthly line item than anyone realizes until they are shown the statement.",
    areas: [
      "Sugar Land Town Square",
      "First Colony",
      "Telfair",
      "Riverstone",
      "the US-59 corridor",
    ],
    industries: [
      "Independent retail",
      "Restaurants and food service",
      "Medical and dental practices",
      "Professional services",
      "Specialty and high-risk merchants",
    ],
    angle: {
      title: "Where surcharge changes the P&L",
      body: "A business running $10,000 to $100,000 a month in card volume is absorbing a meaningful cost of doing business on every swipe. A compliant surcharge program moves that cost to the cardholder, and you keep 100% of your published prices.",
    },
  },
  {
    slug: "spring",
    city: "Spring",
    metaTitle: "Business Funding & Customer Financing in Spring, TX",
    metaDescription:
      "Equipment and commercial truck financing, business lines of credit, and customer financing for Spring, TX. Second-chance credit programs. Approvals in 3-4 hours.",
    targetKeyword: "business funding Spring TX",
    context:
      "Spring sits at the intersection of established residential neighborhoods and the industrial and service corridors running along I-45 and Hardy Toll Road. That produces a strong base of trades, trucking, and equipment-dependent businesses, where the funding question is usually about an asset rather than about working capital.",
    areas: [
      "Old Town Spring",
      "Klein",
      "the Hardy Toll Road corridor",
      "Springwoods Village",
      "the I-45 North corridor",
    ],
    industries: [
      "Trucking and owner-operators",
      "Construction and trades",
      "Equipment-dependent services",
      "Auto and diesel repair",
      "Home services",
    ],
    angle: {
      title: "Financing the asset, not just the month",
      body: "For an owner-operator or a growing fleet, the truck is the business. We finance long haul trucks, day cabs, trailers, vocational trucks, and construction and agriculture equipment, new or used, from a dealer, private seller, or auction, with second-chance programs for credit that a bank will not touch.",
    },
  },
];

export const locationBySlug = (slug: string) =>
  locations.find((location) => location.slug === slug);
