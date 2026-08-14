/**
 * B2B partner verticals.
 *
 * Each entry becomes a /partners/[slug] landing page targeting a long-tail
 * commercial query ("customer financing for pool companies"). Volume is low but
 * intent is extremely high, and almost no competitor writes for these terms.
 *
 * The industry list mirrors the verticals GCS already names on its live site
 * (home contractor, construction, landscape, HVAC, medical, cosmetic, dental,
 * auto, retail), so nothing here claims an industry the business does not serve.
 */

export type Industry = {
  slug: string;
  name: string;
  /** Plural noun used in body copy: "pool builders", "HVAC contractors". */
  audience: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;
  /** Must match a chip label in the form's industry list so it pre-selects. */
  formIndustry: string;
  /** The objection that kills their deals. Opens the page. */
  problem: string;
  intro: string;
  typicalTicket: string;
  /** What financing unlocks, in their language. */
  outcomes: string[];
  faqs: { q: string; a: string }[];
};

export const industries: Industry[] = [
  {
    slug: "pool-companies",
    formIndustry: "Pool builder / outdoor living",
    name: "Pool Builders & Service",
    audience: "pool builders",
    h1: "Customer financing for pool builders",
    metaTitle: "Customer Financing for Pool Companies | GCS Funding",
    metaDescription:
      "Offer pool financing at the point of sale. Approvals to $100,000, down to a 500 FICO, decisions in seconds. Help Houston homeowners build the pool they actually want.",
    targetKeyword: "customer financing for pool companies",
    problem:
      "The homeowner wants the spa, the tanning ledge, and the water feature. Then the number lands, and the build shrinks to the base package, or dies in the driveway entirely.",
    intro:
      "A pool is one of the largest discretionary purchases a homeowner ever makes, and almost nobody writes a check for it. When financing is presented as part of the proposal, the conversation stops being about the total and starts being about the monthly payment, which is the only number most buyers were ever really evaluating.",
    typicalTicket: "$25,000 – $100,000",
    outcomes: [
      "Present the full build with the spa and hardscape instead of leading with a stripped base package",
      "Give buyers a real answer at the kitchen table instead of losing two weeks to their bank",
      "Approve homeowners with credit that a single prime lender would decline outright",
      "Keep the deposit schedule intact -- you are paid directly, within 24 hours of funding",
    ],
    faqs: [
      {
        q: "How much can a homeowner finance for a pool?",
        a: "Up to $100,000 through our lender network, with terms running from 6 to 84 months so the monthly payment can be brought down to something the homeowner is comfortable with.",
      },
      {
        q: "Can you approve homeowners with lower credit scores?",
        a: "Yes. One application reaches more than 20 prime and subprime lenders at once, with approvals down to roughly a 500 FICO. That is the difference between a decline and a signed contract on a meaningful share of your proposals.",
      },
      {
        q: "What does it cost my pool company to offer financing?",
        a: "No setup fee, no application fee, no monthly fee, and no equipment to buy. You pay a discount fee only on funded transactions.",
      },
    ],
  },
  {
    slug: "hvac-contractors",
    formIndustry: "HVAC",
    name: "HVAC Contractors",
    audience: "HVAC contractors",
    h1: "Customer financing for HVAC contractors",
    metaTitle: "Customer Financing for HVAC Companies | GCS Funding",
    metaDescription:
      "Stop losing full-system replacements to repair-only decisions. Instant HVAC customer financing, approvals down to 500 FICO, funded in 24 hours. Houston-based since 2003.",
    targetKeyword: "customer financing for HVAC companies",
    problem:
      "It is 104 degrees, the twenty-year-old system just died, and the homeowner did not wake up with eight thousand dollars. So they ask you to patch it one more time.",
    intro:
      "HVAC is the clearest case for point-of-sale financing in the trades, because the purchase is urgent, unplanned, and expensive all at once. A technician who can offer an approved monthly payment from the truck converts an emergency repair into a full system replacement, and does it without a callback in six weeks.",
    typicalTicket: "$5,000 – $25,000",
    outcomes: [
      "Convert repair calls into full system replacements at the moment of decision",
      "Let technicians present approved payment options from the driveway on any phone",
      "Sell the higher-SEER system on payment difference instead of sticker difference",
      "Capture the emergency call instead of losing it to whoever answers next",
    ],
    faqs: [
      {
        q: "Can my technicians offer financing in the field?",
        a: "Yes. The application is 100% paperless and works on any mobile device, and the customer can apply privately from their own phone. Live offers come back in about ten seconds.",
      },
      {
        q: "How fast does my company get paid on a financed job?",
        a: "Funding is issued within 24 hours, paid directly to your business, so a financed replacement does not sit in receivables.",
      },
      {
        q: "What if the homeowner has damaged credit?",
        a: "Our lender pool approves down to roughly a 500 FICO. A single soft-pull application reaches prime and subprime lenders simultaneously, so a homeowner who fails one lender's box still sees offers.",
      },
    ],
  },
  {
    slug: "roofing-companies",
    formIndustry: "Roofing",
    name: "Roofing Contractors",
    audience: "roofing contractors",
    h1: "Customer financing for roofing companies",
    metaTitle: "Customer Financing for Roofing Companies | GCS Funding",
    metaDescription:
      "Close roofing jobs that insurance will not cover. Financing to $100,000, approvals in seconds down to 500 FICO, paid to your business in 24 hours.",
    targetKeyword: "customer financing for roofing companies",
    problem:
      "The adjuster approved half of what the roof actually needs, and the homeowner has to cover a five-figure gap they did not plan for. That gap is where most roofing deals die.",
    intro:
      "Storm season in the Houston area produces a predictable pattern: a wave of inspections, a wave of partial claims, and a wave of homeowners who cannot bridge the difference between the check and the estimate. Financing turns that deductible-and-gap conversation into a payment conversation, and it does it before your competitor knocks on the same door.",
    typicalTicket: "$8,000 – $40,000",
    outcomes: [
      "Bridge the gap between the insurance check and the real scope of work",
      "Cover deductibles without discounting the job to make the numbers work",
      "Sell the upgrade -- impact-resistant shingle, full decking -- on monthly difference",
      "Approve storm-season homeowners fast, while they are still deciding",
    ],
    faqs: [
      {
        q: "Can financing cover an insurance deductible or claim shortfall?",
        a: "Yes. Approved amounts run up to $100,000, which covers a deductible, a coverage gap, or a full out-of-pocket replacement, with terms out to 84 months to keep the payment manageable.",
      },
      {
        q: "How quickly can a homeowner be approved?",
        a: "A soft-pull application returns live offers in about ten seconds with no effect on their credit, and funding is issued within 24 hours once they accept.",
      },
      {
        q: "Is there a cost to add financing to my roofing business?",
        a: "There are no setup, application, or monthly fees, and no equipment to purchase or lease. You pay a discount fee only when a transaction funds.",
      },
    ],
  },
  {
    slug: "home-remodeling",
    formIndustry: "Remodeling / home improvement",
    name: "Remodeling & Home Improvement",
    audience: "remodelers",
    h1: "Customer financing for remodeling contractors",
    metaTitle: "Customer Financing for Remodeling Contractors | GCS Funding",
    metaDescription:
      "Offer home improvement financing at the point of sale. Up to $100,000, terms to 84 months, approvals down to 500 FICO, funded in 24 hours. Houston-based.",
    targetKeyword: "customer financing for remodeling contractors",
    problem:
      "You scoped the whole kitchen. They approved the countertops. The other forty thousand dollars of work went back on the shelf because of one number on one page.",
    intro:
      "Remodeling estimates almost always get value-engineered downward, and it is rarely because the homeowner stopped wanting the work. Presenting a monthly payment alongside the total keeps the original scope on the table, which protects both your margin and the finished result you actually want photographed.",
    typicalTicket: "$10,000 – $100,000",
    outcomes: [
      "Protect the original scope instead of watching it get cut line by line",
      "Move homeowners off HELOC timelines that stall projects for months",
      "Sell phase two while you are still standing in phase one",
      "Get paid directly within 24 hours rather than financing the job yourself",
    ],
    faqs: [
      {
        q: "How large a remodel can be financed?",
        a: "Up to $100,000 per approved customer, with terms from 6 to 84 months and same-as-cash promotional programs available at 6, 12, 18, 24, 36, and 48 months.",
      },
      {
        q: "Is this better than sending homeowners to a HELOC?",
        a: "It is faster. A home equity line typically takes weeks and an appraisal. Our application returns live offers in about ten seconds on a soft pull, and funds within 24 hours of acceptance.",
      },
      {
        q: "Can I brand the financing program as my own?",
        a: "Yes. White-label reporting is available, so the program and the back-office analytics carry your business name rather than ours.",
      },
    ],
  },
  {
    slug: "medical-and-med-spa",
    formIndustry: "Medical / med spa",
    name: "Medical & Med Spa",
    audience: "medical and aesthetic practices",
    h1: "Patient financing for medical and med spa practices",
    metaTitle: "Patient Financing for Medical & Med Spas | GCS Funding",
    metaDescription:
      "Offer patient financing for elective and cosmetic procedures. Soft-pull approvals in seconds, down to 500 FICO, up to $100,000, paid to your practice in 24 hours.",
    targetKeyword: "patient financing for med spas",
    problem:
      "The consultation went beautifully. They love the plan. Then they say they need to think about it, and you never hear from them again.",
    intro:
      "Elective and cosmetic work is bought on desire and lost on price, usually within the same appointment. Financing presented during the consultation, on the patient's own phone and without a hard credit pull, converts enthusiasm into a booked procedure before the feeling fades.",
    typicalTicket: "$1,500 – $30,000",
    outcomes: [
      "Convert consultations into bookings in the same visit",
      "Move patients from a single treatment to the full protocol or package",
      "Let patients apply privately from their own phone, which matters in this category",
      "Fill the calendar without discounting your price list to do it",
    ],
    faqs: [
      {
        q: "Which practices can offer patient financing?",
        a: "The program covers medical practices broadly, including cosmetic, aesthetic, dental, and veterinary, as well as elective procedures that insurance does not reach.",
      },
      {
        q: "Is the application private for the patient?",
        a: "Yes. It is 100% paperless and works on any mobile device, so patients apply privately from their own phone rather than at your front desk.",
      },
      {
        q: "How much can a patient finance?",
        a: "From $500 up to $100,000, with terms from 6 to 84 months and same-as-cash promotional options available.",
      },
    ],
  },
  {
    slug: "dental-practices",
    formIndustry: "Dental",
    name: "Dental Practices",
    audience: "dental practices",
    h1: "Patient financing for dental practices",
    metaTitle: "Patient Financing for Dental Practices | GCS Funding",
    metaDescription:
      "Get more treatment plans accepted. Dental patient financing with soft-pull approvals in seconds, down to 500 FICO, up to $100,000, funded to your practice in 24 hours.",
    targetKeyword: "patient financing for dental practices",
    problem:
      "You presented a comprehensive treatment plan. Insurance covered a fraction of it. The patient booked the cleaning and deferred everything that actually mattered.",
    intro:
      "Case acceptance is the single biggest lever in a dental practice, and the most common reason a plan is declined is not clinical disagreement, it is the out-of-pocket number. Offering a payment option at the treatment coordinator's desk keeps comprehensive care on the schedule rather than in the recall file.",
    typicalTicket: "$1,500 – $25,000",
    outcomes: [
      "Raise case acceptance on comprehensive and restorative plans",
      "Cover the gap that insurance leaves without writing it off",
      "Approve patients across every credit tier from one soft-pull application",
      "Collect in full within 24 hours instead of running in-house payment plans",
    ],
    faqs: [
      {
        q: "Can this replace our in-house payment plans?",
        a: "Yes, and it removes the collection risk. Your practice is paid directly within 24 hours of funding, rather than carrying the balance and chasing it.",
      },
      {
        q: "What credit scores are approved?",
        a: "One application reaches over 20 lenders across prime and subprime tiers, with approvals down to roughly a 500 FICO.",
      },
      {
        q: "Does the patient's credit get pulled at the front desk?",
        a: "Only a soft inquiry, which does not affect their score. A hard pull happens only after they choose an offer they want to accept.",
      },
    ],
  },
  {
    slug: "auto-repair-and-sales",
    formIndustry: "Auto sales or repair",
    name: "Auto Repair & Sales",
    audience: "auto repair shops and dealers",
    h1: "Customer financing for auto repair shops and dealers",
    metaTitle: "Customer Financing for Auto Repair Shops | GCS Funding",
    metaDescription:
      "Approve customers for repairs they cannot pay for today. Financing from $500 to $100,000, decisions in seconds, down to 500 FICO, paid to your shop in 24 hours.",
    targetKeyword: "customer financing for auto repair shops",
    problem:
      "The transmission quote is thirty-eight hundred dollars. The customer has maybe six hundred. So the car sits on your lot, or leaves on a tow truck.",
    intro:
      "Vehicle repair is the definition of an unplanned expense, and a declined repair is not a deferred sale, it is a lost one plus an occupied bay. Financing lets the shop authorize the correct repair rather than the cheapest one, and gets the vehicle out the door the same week.",
    typicalTicket: "$500 – $15,000",
    outcomes: [
      "Authorize the full repair instead of the partial fix that comes back",
      "Free up bays that would otherwise hold unpaid vehicles",
      "Serve auto sales, repair, motorcycle, and boating customers on one platform",
      "Approve down to a 500 FICO, which fits this customer base far better than a bank",
    ],
    faqs: [
      {
        q: "Is there a minimum repair amount to finance?",
        a: "Loans start at $500, which covers most repair tickets, and run up to $100,000 for sales and larger work.",
      },
      {
        q: "Does this work for auto sales as well as repair?",
        a: "Yes. The program serves auto sales, repair, motorcycle, and boating businesses.",
      },
      {
        q: "How fast is the approval?",
        a: "Live offers return in about ten seconds from a soft-pull application, and funding is issued within 24 hours.",
      },
    ],
  },
  {
    slug: "landscaping-and-outdoor-living",
    formIndustry: "Landscaping",
    name: "Landscaping & Outdoor Living",
    audience: "landscape and outdoor living contractors",
    h1: "Customer financing for landscaping and outdoor living companies",
    metaTitle: "Customer Financing for Landscaping Companies | GCS Funding",
    metaDescription:
      "Finance outdoor kitchens, hardscape, irrigation, and full landscape builds. Up to $100,000, approvals down to 500 FICO in seconds, paid to you in 24 hours.",
    targetKeyword: "customer financing for landscaping companies",
    problem:
      "The design has an outdoor kitchen, a pergola, and full hardscape. The signed contract has sod and a sprinkler zone.",
    intro:
      "Outdoor living projects are almost entirely discretionary, which makes them the first thing cut and the easiest thing to sell on a monthly payment. Presenting financing with the design keeps the rendering intact, and turns a phased five-year plan into a single build season.",
    typicalTicket: "$5,000 – $75,000",
    outcomes: [
      "Sell the full design rather than watching it get phased into oblivion",
      "Add outdoor kitchens, pergolas, and hardscape to jobs already sold",
      "Book work in the shoulder season when cash is tighter for homeowners",
      "Get paid directly within 24 hours of the customer's funding",
    ],
    faqs: [
      {
        q: "What outdoor projects can be financed?",
        a: "Full landscape builds, hardscape, irrigation, outdoor kitchens, pergolas, lighting, and drainage, up to $100,000 per approved customer.",
      },
      {
        q: "Can I offer promotional same-as-cash terms?",
        a: "Yes. Same-as-cash programs are available at 6, 12, 18, 24, 36, and 48 months, and can be set differently from one customer to the next.",
      },
      {
        q: "How do I add financing to my proposals?",
        a: "There is nothing to install and nothing to buy. The application is paperless and mobile, so you can present payment options alongside the design and approve the customer on the spot.",
      },
    ],
  },
];

export const industryBySlug = (slug: string) =>
  industries.find((industry) => industry.slug === slug);
