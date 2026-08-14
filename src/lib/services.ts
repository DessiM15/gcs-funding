/**
 * Service definitions.
 *
 * Every factual claim (amounts, terms, FICO floors, turnaround times) is taken
 * from the live gcsfunding.com pages. The headline, metaTitle, and intro copy
 * are written around the keyword each page is built to rank for.
 */

export type Service = {
  slug: string;
  /** Nav label -- short. */
  nav: string;
  /** H1 -- the human promise. */
  h1: string;
  /** <title> -- built around the target keyword, under ~60 chars. */
  metaTitle: string;
  metaDescription: string;
  /** The single query this page is built to win. */
  targetKeyword: string;
  /** Which branch of the enquiry form this page's CTA should open on. */
  leadPath: "partner" | "capital" | "processing";
  eyebrow: string;
  intro: string;
  highlights: { label: string; value: string }[];
  features: { title: string; body: string }[];
  qualifications?: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "consumer-financing",
    leadPath: "partner",
    nav: "Consumer Financing",
    h1: "Let your customers say yes to the full job",
    metaTitle: "Customer Financing for Businesses | GCS Funding Houston",
    metaDescription:
      "Offer your customers instant financing from $500 to $100,000 with one soft-pull application, approvals down to a 500 FICO, and funding in 24 hours. Houston-based, 20+ lenders.",
    targetKeyword: "customer financing for businesses",
    eyebrow: "Point-of-sale consumer financing",
    intro:
      "The fastest way to grow revenue is not finding more customers. It is closing the ones already standing in front of you. GCS Funding puts a single application in front of your buyer, soft-pulls their credit, and returns live offers from more than 20 lenders in about ten seconds, so the conversation moves from \"I cannot afford that today\" to \"which payment works best.\"",
    highlights: [
      { label: "Loan amounts", value: "$500 – $100,000" },
      { label: "Approvals down to", value: "500 FICO" },
      { label: "Decision time", value: "Under 10 seconds" },
      { label: "Funding", value: "Within 24 hours" },
    ],
    features: [
      {
        title: "One application, every credit tier",
        body: "A single paperless application reaches prime and subprime lenders at the same time. Your customer never fills out four forms or gets shopped around, and you never have to guess which lender to send them to.",
      },
      {
        title: "Soft pull, zero risk to the customer",
        body: "Live offers appear without touching their credit score. A hard inquiry only happens after they have chosen the offer they want, which removes the biggest reason customers refuse to apply at all.",
      },
      {
        title: "Same-as-cash promotional terms",
        body: "SAC programs run 6, 12, 18, 24, 36, and 48 months and can be set differently from one customer to the next. Terms run out to 84 months when the payment needs to come down further.",
      },
      {
        title: "Nothing to buy, nothing to install",
        body: "No monthly fees, no setup or application fees, and no equipment to purchase or lease. It is 100% paperless and works on any mobile device, so customers can apply privately from their own phone.",
      },
      {
        title: "Reporting that stays yours",
        body: "A back office with detailed analytics and custom reporting, available white-label so the program carries your brand rather than ours.",
      },
      {
        title: "Low discount fees",
        body: "Merchant discount rates are structured to protect your margin, because a financing program that eats the profit on every ticket is not a program worth running.",
      },
    ],
    faqs: [
      {
        q: "What credit scores can you approve for customer financing?",
        a: "Our lender pool approves from roughly a 500 FICO up to 800. Because one application reaches every tier at once, a customer who would be declined by a single prime lender still receives offers from a subprime lender in the same ten seconds.",
      },
      {
        q: "How much can my customers finance?",
        a: "Loan amounts run from $500 to $100,000 with terms from 6 to 84 months, across every industry we serve.",
      },
      {
        q: "Does checking offers hurt my customer's credit score?",
        a: "No. The initial application is a soft credit inquiry, so your customer can see real offers with no effect on their score. A hard inquiry is only pulled once they accept a specific offer.",
      },
      {
        q: "What does the financing program cost my business?",
        a: "There are no setup fees, no application fees, no monthly fees, and no equipment to buy or lease. Merchants pay a discount fee on funded transactions, which is quoted based on the terms you want to offer.",
      },
      {
        q: "How fast does my business get paid?",
        a: "Funding is issued within 24 hours, paid directly to your business, so financed tickets do not slow down your cash flow.",
      },
    ],
  },
  {
    slug: "business-line-of-credit",
    leadPath: "capital",
    nav: "Business Line of Credit",
    h1: "A business line of credit that is there before you need it",
    metaTitle: "Business Line of Credit in Houston, TX | GCS Funding",
    metaDescription:
      "Revolving business lines of credit up to $300K with approvals in as fast as 20 minutes. No opening, maintenance, prepayment, or closure fees. Serving Houston-area businesses since 2003.",
    targetKeyword: "business line of credit Houston",
    eyebrow: "Revolving working capital",
    intro:
      "Payroll does not wait for a slow receivable, and the best equipment deal never shows up on a month when cash is comfortable. A revolving line of credit means the money is already approved and sitting there. You draw what you need, pay for only what you use, and the line replenishes as you repay it.",
    highlights: [
      { label: "Credit lines up to", value: "$300,000" },
      { label: "Approval in as fast as", value: "20 minutes" },
      { label: "Draw to bank", value: "Within hours" },
      { label: "Repayment terms", value: "6 or 12 months" },
    ],
    features: [
      {
        title: "Funds available on demand",
        body: "Draw funds from an online dashboard whenever a expense, opportunity, or shortfall shows up, and the cash lands in your business account within hours.",
      },
      {
        title: "You only pay for what you use",
        body: "No fees to open or maintain the line, no prepayment penalties, no monthly maintenance fees, and no account closure fees. An unused line costs nothing to keep.",
      },
      {
        title: "A line that replenishes",
        body: "As you pay down each draw, that available credit comes right back, so the line keeps working instead of being a one-time injection.",
      },
      {
        title: "Credit that grows with the business",
        body: "We structure the line to your current size and revisit it as you grow, rather than capping you at whatever your business looked like the day you applied.",
      },
    ],
    qualifications: [
      "600+ FICO score",
      "6+ months in business",
      "$100,000 in annual revenue",
      "Basic details about you and your business",
      "Bank connection, or your three most recent bank statements",
    ],
    faqs: [
      {
        q: "How large a business line of credit can I get?",
        a: "Credit lines go up to $300,000, structured to your revenue and time in business.",
      },
      {
        q: "How fast can I be approved?",
        a: "Approvals come back in as fast as 20 minutes after you apply online, and funds from a draw reach your bank account within hours.",
      },
      {
        q: "What do I need to qualify for a line of credit in Texas?",
        a: "The baseline is a 600+ FICO score, at least 6 months in business, and $100,000 in revenue. You will need basic business details plus either a bank connection or your three most recent bank statements.",
      },
      {
        q: "Are there fees if I never draw on the line?",
        a: "No. There are no fees to open or maintain the line, and no closure fees, so an open line you have not touched costs you nothing.",
      },
    ],
  },
  {
    slug: "equipment-financing",
    leadPath: "capital",
    nav: "Equipment & Truck Financing",
    h1: "Equipment and commercial truck financing, including credit others decline",
    metaTitle: "Equipment & Commercial Truck Financing | GCS Funding TX",
    metaDescription:
      "Finance long haul trucks, day cabs, trailers, vocational trucks, construction and agriculture equipment. Approvals in 3-4 hours. Second-chance programs for challenged credit.",
    targetKeyword: "commercial truck financing Texas",
    eyebrow: "Hard asset lending",
    intro:
      "GCS Funding is a national direct funding source with more than twenty years financing hard assets. We fund long haul trucks, long haul trailers, day cabs, vocational trucks, construction equipment, and agriculture equipment, for everyone from a first-truck startup to a large fleet. And we built programs specifically for the applicants other lenders stop reading after the credit report.",
    highlights: [
      { label: "Approval turnaround", value: "3 – 4 hours" },
      { label: "Equipment condition", value: "New or used" },
      { label: "Sellers accepted", value: "Dealer, private, auction" },
      { label: "Experience", value: "20+ years in hard assets" },
    ],
    features: [
      {
        title: "Competitive rates and terms",
        body: "Low rates let us structure an affordable payment that fits the revenue the asset actually produces, regardless of where your credit sits today.",
      },
      {
        title: "Any equipment, any seller",
        body: "New or used, and whether it is coming from a private seller, a dealer, a manufacturer, or an auction house, we can finance the equipment your business needs.",
      },
      {
        title: "Fast approvals and documents",
        body: "Our funding process is streamlined for approvals within 3 to 4 hours of receiving a complete application package. Once the borrower accepts, loan documents are expedited straight to the dealer or buyer.",
      },
      {
        title: "Second-chance and challenged credit",
        body: "Startups, thin time in business, bankruptcies, tax liens, judgments, repossessions, and slow pays. These programs usually ask for a little more down, but they keep the payment affordable and get the equipment working. We say yes where others have said no.",
      },
    ],
    faqs: [
      {
        q: "Can I finance a commercial truck with bad credit?",
        a: "Yes. Our second-chance programs are built for bankruptcies, tax liens, judgments, repossessions, slow pays, and startups with limited time in business. These structures typically require a larger down payment, but they get the truck on the road with a payment you can carry.",
      },
      {
        q: "What kinds of equipment do you finance?",
        a: "Long haul trucks, long haul trailers, day cabs, vocational trucks, construction equipment, and agriculture equipment, for applicants ranging from startups to large fleets.",
      },
      {
        q: "Can I buy from a private seller or an auction?",
        a: "Yes. We finance new and used equipment from private sellers, dealers, manufacturers, and auction houses.",
      },
      {
        q: "How long does approval take?",
        a: "Approvals come back within 3 to 4 hours of us receiving a completed application package.",
      },
    ],
  },
  {
    slug: "credit-card-processing",
    leadPath: "processing",
    nav: "Card Processing & Surcharge",
    h1: "Keep 100% of your published prices",
    metaTitle: "Credit Card Surcharge Program Houston | GCS Funding",
    metaDescription:
      "A compliant credit card surcharge program that recoups processing costs so you keep 100% of every sale. PCI-compliant terminals, federal and state compliant, high-risk merchants welcome.",
    targetKeyword: "credit card surcharge program Houston",
    eyebrow: "Compliant surcharge processing",
    intro:
      "For decades merchants absorbed card fees as a cost of doing business. A compliant surcharge program moves that cost to the cardholder who chose to pay by credit, which means the full amount of the sale reaches your account. GCS Funding has been in payments since 2003 and has more than 5,000 merchants processing on our platforms.",
    highlights: [
      { label: "Program fee", value: "3.5% to the cardholder" },
      { label: "You receive", value: "100% of the sale" },
      { label: "Compliance", value: "Federal & state" },
      { label: "Hardware", value: "PCI-DSS compliant" },
    ],
    features: [
      {
        title: "Recoup what processing costs you",
        body: "Instead of watching thousands of dollars a year leave on a statement, you see that revenue stay. The cardholder pays a 3.5% program fee, and 100% of the purchase price is deposited to your account.",
      },
      {
        title: "Devices that calculate it for you",
        body: "Surcharge-enabled terminals and software apply the correct amount only on eligible transactions, which is what keeps an honest mistake from turning into a compliance problem.",
      },
      {
        title: "Built to exceed the rules",
        body: "The program is designed against federal and state surcharge requirements: card brand registration, required customer-facing disclosure signage, a fee that never exceeds 4% and never profits the merchant, and the fee processed together with the sale as a single transaction.",
      },
      {
        title: "Accept payments anywhere",
        body: "Fully integrated terminals, virtual terminals, and gateways from Dejavoo and iPOS Pay, covering mobile 4G, WiFi, Bluetooth, contactless, QR codes, EMV, NFC, and Android POS for retail, restaurant, and service businesses.",
      },
    ],
    faqs: [
      {
        q: "Is credit card surcharging legal in Texas?",
        a: "Yes, when it is done to the rules. The merchant must be registered with the card brands, must disclose the fee with appropriate signage at the location or on the site, the fee must not exceed 4% and must not profit the merchant, and the fee must be processed together with the sale as one transaction. Our program is built to meet each of those requirements, and our terminals apply the fee only to eligible transactions.",
      },
      {
        q: "How much is the surcharge and who pays it?",
        a: "The cardholder pays a 3.5% program fee on credit card transactions. That fee covers your processing cost, and 100% of the purchase price is deposited into your account.",
      },
      {
        q: "Do you work with high-risk merchants?",
        a: "Yes. High-risk placement is a specialty of ours, including businesses that have been declined or dropped elsewhere. We are the strongest fit for merchants processing roughly $10,000 to $100,000 per month in card volume.",
      },
      {
        q: "What equipment will I need?",
        a: "We provide PCI-DSS compliant Dejavoo and iPOS Pay hardware: mobile terminals with 4G, WiFi, Bluetooth, contactless and QR support, desktop terminals with EMV and NFC built in, gateways, and Android POS systems for retail, restaurant, service, and scheduling.",
      },
    ],
  },
  {
    slug: "personal-loans",
    leadPath: "capital",
    nav: "Personal Loans",
    h1: "Personal loans for whatever life brings your way",
    metaTitle: "Personal Loans in Houston, TX | GCS Funding",
    metaDescription:
      "Compare personal loan offers from up to 20 lenders with no impact to your credit score. Fixed rates, 1-5 year terms, no prepayment penalties, funds in as little as one day.",
    targetKeyword: "personal loans Houston",
    eyebrow: "Consumer lending",
    intro:
      "Personal loans have moved well past debt consolidation. They cover the roof, the procedure, the wedding, the transmission, and the semester. Check your rate in minutes with no impact to your credit score, compare offers from as many as 20 lenders, and pick the one that actually fits.",
    highlights: [
      { label: "Funding in as little as", value: "One day" },
      { label: "Fixed terms", value: "1 – 5 years" },
      { label: "Rate check impact", value: "None" },
      { label: "Lender offers", value: "Up to 20" },
    ],
    features: [
      {
        title: "Quick",
        body: "Apply online and have funds deposited into your account in as little as one day.",
      },
      {
        title: "Clear",
        body: "Choose a fixed rate term from one to five years, from multiple lenders, with no prepayment penalties.",
      },
      {
        title: "Easy",
        body: "Check your rates in just minutes with no impact to your credit score.",
      },
      {
        title: "Affordable",
        body: "APRs well below what banks and credit card lenders charge, which can save thousands compared to carrying a card balance.",
      },
    ],
    faqs: [
      {
        q: "Will checking my personal loan rate affect my credit score?",
        a: "No. You can check your rates in minutes with no impact to your credit score, and compare offers from as many as 20 lenders before committing to anything.",
      },
      {
        q: "What can a personal loan be used for?",
        a: "Home improvement, medical expenses, auto repair, education, special occasions such as a wedding, vacations, major purchases, and debt consolidation.",
      },
      {
        q: "Are there prepayment penalties?",
        a: "No. Terms are fixed rate from one to five years with no prepayment penalties, so paying it off early costs you nothing extra.",
      },
    ],
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((service) => service.slug === slug);
