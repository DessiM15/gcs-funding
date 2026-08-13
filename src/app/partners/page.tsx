import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import {
  Blobs,
  Breadcrumbs,
  CtaSection,
  FaqSection,
  HighlightRow,
} from "@/components/sections/shared";
import {
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  Heading,
  Section,
} from "@/components/ui/primitives";
import { industries } from "@/lib/industries";
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from "@/lib/schema";
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
              "Point-of-sale consumer financing program for contractors, medical practices, retailers, and service businesses across the Houston area.",
            url: `${SITE_URL}/partners`,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(trail),
        ]}
      />

      <section className="relative overflow-hidden pb-14 pt-12">
        <Blobs />
        <Container className="relative">
          <Breadcrumbs trail={trail} />

          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Partner program</Eyebrow>
              <h1 className="mt-6 text-[2.4rem] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink-900 sm:text-5xl md:text-[3.6rem]">
                Become the business that
                <span className="text-gradient"> offers financing</span>
              </h1>
              <p className="mt-7 text-lg leading-relaxed text-ink-500 sm:text-xl">
                Your competitors are quoting the same total you are. The
                difference is whether the customer hears a number they cannot pay
                today, or a monthly payment they can. GCS Funding gives you the
                second conversation, at no cost to add and with nothing to
                install.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" variant="brand" size="lg">
                  Become a partner <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink
                  href="/services/consumer-financing"
                  variant="outline"
                  size="lg"
                >
                  Full program details
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-14">
            <HighlightRow highlights={HIGHLIGHTS} />
          </Reveal>
        </Container>
      </section>

      <Section className="bg-white">
        <Container>
          <Heading
            eyebrow="How partnering works"
            title="Four steps, and none of them"
            accent="cost you anything up front"
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {STEPS.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <Card className="h-full">
                  <span className="font-display text-4xl font-extrabold text-brand-200">
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-ink-500">
                    {step.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading
            eyebrow="Industries"
            title="Programs written for"
            accent="your industry, not a template"
            subtitle="Each of these pages covers the specific objection, ticket size, and approval profile that industry actually deals with."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, index) => (
              <Reveal key={industry.slug} delay={index * 0.04}>
                <Link href={`/partners/${industry.slug}`} className="block h-full">
                  <Card className="h-full">
                    <Building2 className="h-5 w-5 text-azure-500" />
                    <h3 className="mt-4 text-base font-bold text-ink-900">
                      {industry.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-ink-400">
                      Typical ticket {industry.typicalTicket}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                      View program
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
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
