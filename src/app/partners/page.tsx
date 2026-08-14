import { ArrowRight } from "lucide-react";

import { Magnetic } from "@/components/atmosphere";
import {
  CtaSection,
  FaqSection,
  HighlightRow,
  LinkList,
  NumberedList,
  PageHero,
} from "@/components/sections/shared";
import {
  ButtonLink,
  Container,
  Heading,
  Section,
} from "@/components/ui/primitives";
import { industries } from "@/lib/industries";
import { photos } from "@/lib/photos";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Offer Customer Financing to Your Customers | GCS Funding Partners",
  description:
    "Join the GCS Funding partner program and offer financing at the point of sale. One application, 20+ lenders, approvals down to 500 FICO, paid to your business in 24 hours.",
  path: "/partners",
});

const FAQS = [
  {
    q: "How do I start offering financing to my customers?",
    a: "Tell us your industry and your average ticket and we will set up the program that fits. There is nothing to install and no equipment to buy. Your customers apply on any device, and you can be presenting payment options within days.",
  },
  {
    q: "What does the partner program cost?",
    a: "There are no setup fees, no application fees, and no monthly fees. Merchants pay a discount fee on funded transactions only, quoted based on the promotional terms you want to offer.",
  },
  {
    q: "Which of my customers will actually get approved?",
    a: "One application reaches more than 20 lenders spanning prime to subprime, with approvals from roughly a 500 FICO up to 800. Because the application hits every tier at once, customers who would fail a single lender's box still receive live offers.",
  },
  {
    q: "How and when does my business get paid?",
    a: "Funding is issued directly to your business within 24 hours of the customer accepting an offer. You are not carrying the balance, and you are not responsible for collection.",
  },
  {
    q: "Can the program carry my branding?",
    a: "Yes. White-label reporting is available, and the back office provides detailed analytics and custom reporting under your business name.",
  },
];

const HIGHLIGHTS = [
  { label: "Lender network", value: "20+ lenders" },
  { label: "Approval range", value: "500 – 800 FICO" },
  { label: "Financing amounts", value: "$500 – $100,000" },
  { label: "Terms available", value: "6 – 84 months" },
];

const STEPS = [
  {
    title: "We match you to the right program",
    body: "Your industry and average ticket determine which promotional structures and lender mix make sense. A $2,000 repair ticket and a $70,000 pool build are not the same program.",
  },
  {
    title: "Your customer applies in under a minute",
    body: "100% paperless, on any mobile device, privately if they prefer. One soft-pull application reaches every credit tier at once.",
  },
  {
    title: "Live offers, no credit impact",
    body: "They see real offers in about ten seconds with no effect on their score. A hard inquiry only happens after they choose the offer they want.",
  },
  {
    title: "You are paid within 24 hours",
    body: "Funds are issued directly to your business. Your reporting lives in a back office with full analytics, available white-label.",
  },
];

export default function PartnersPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Partner Program", path: "/partners" },
  ];

  return (
    <>
      <JsonLd
        schemas={[
          serviceSchema({
            name: "Customer financing partner program",
            description:
              "Point-of-sale consumer financing for contractors, medical practices, retailers, and service businesses across the Houston area.",
            url: `${SITE_URL}/partners`,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(trail),
        ]}
      />

      <PageHero
        priority
        tall
        trail={trail}
        label="Partner program"
        title={
          <>
            Become the business that
            {" "}
            <br className="hidden sm:inline" />
            <span className="text-accent">offers financing</span>
          </>
        }
        intro="Your competitors are quoting the same total you are. The difference is whether the customer hears a number they cannot pay today, or a monthly payment they can."
        photo={photos.poolDusk}
        actions={
          <>
            <Magnetic>
              <ButtonLink href="/contact" variant="accent" size="lg">
                Become a partner <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="/services/consumer-financing" variant="outlineLight" size="lg">
              Full program details
            </ButtonLink>
          </>
        }
      />

      <Section tone="dark" className="py-0 sm:py-0" id="figures" rail="Figures">
        <Container>
          <HighlightRow highlights={HIGHLIGHTS} />
        </Container>
      </Section>

      <Section tone="light" id="how-it-works" rail="How it works">
        <Container>
          <Heading
            label="How partnering works"
            title="Four steps, and none of them cost you anything up front"
          />
          <div className="mt-16">
            <NumberedList items={STEPS} />
          </div>
        </Container>
      </Section>

      <Section tone="paper" id="industries" rail="Industries">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[30rem_1fr] lg:gap-24">
            <Heading
              label="Industries"
              title="Programs written for your industry, not a template"
              intro="Each page covers the specific objection, ticket size, and approval profile that industry actually deals with."
              className="lg:sticky lg:top-32 lg:self-start"
            />
            <LinkList
              items={industries.map((industry) => ({
                href: `/partners/${industry.slug}`,
                title: industry.name,
                meta: industry.typicalTicket,
              }))}
            />
          </div>
        </Container>
      </Section>

      <FaqSection faqs={FAQS} title="Partner program questions" />

      <CtaSection
        title="Let's get your program set up"
        body="Tell us your industry and average ticket. We will come back within one business day with the promotional terms and lender mix that fit your business."
        cta="Become a partner"
      />
    </>
  );
}
