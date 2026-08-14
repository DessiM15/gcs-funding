import { ArrowRight } from "lucide-react";

import { Magnetic } from "@/components/atmosphere";
import {
  CtaSection,
  FaqSection,
  LinkList,
  NumberedList,
  PageHero,
  SplitFeature,
  StatBand,
} from "@/components/sections/shared";
import {
  ButtonLink,
  Container,
  Heading,
  Section,
} from "@/components/ui/primitives";
import { industries } from "@/lib/industries";
import { photos } from "@/lib/photos";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Customer Financing & Business Funding in Houston | GCS Funding",
  description:
    "Offer your customers instant financing at the point of sale, or secure a line of credit up to $300K. GCS Funding is a national direct funding source in Cypress, TX with 20+ lenders since 2003.",
  path: "/",
});

const HOME_FAQS = [
  {
    q: "How does offering customer financing work for my business?",
    a: "Your customer completes one paperless application on any device. We soft-pull their credit and return live offers from more than 20 lenders in about ten seconds, with approvals down to roughly a 500 FICO. They pick the offer that fits, and your business is paid directly within 24 hours. There is no setup fee, no monthly fee, and no equipment to buy.",
  },
  {
    q: "What kinds of businesses do you work with?",
    a: "Small and mid-sized businesses across the Houston area, including pool builders, HVAC and roofing contractors, remodelers, landscapers, medical and dental practices, med spas, auto sales and repair, and retail. For card processing we are the strongest fit for merchants running roughly $10,000 to $100,000 per month in volume.",
  },
  {
    q: "Do you work with businesses that have been declined elsewhere?",
    a: "Yes. High-risk merchant placement and second-chance equipment financing are specialties. Our programs cover bankruptcies, tax liens, judgments, repossessions, slow pays, and startups with limited time in business.",
  },
  {
    q: "How long has GCS Funding been in business?",
    a: `GCS Funding was created in 2003 and is now in its ${site.stats.yearsInBusiness}th year, with more than 5,000 merchants processing on our platforms and a network of over 20 national lenders covering every credit tier.`,
  },
];

const STEPS = [
  {
    title: "One application",
    body: "Your customer applies on any device, in under a minute, without paper and without leaving your business.",
  },
  {
    title: "Live offers in ten seconds",
    body: "A soft credit pull returns real offers from our lender network in about ten seconds, with no effect on their score.",
  },
  {
    title: "They choose the payment",
    body: "The conversation moves off the total and onto the monthly number, which is the one they were evaluating all along.",
  },
  {
    title: "You are paid in 24 hours",
    body: "Funds are issued directly to your business within a day. You never carry the balance and never chase the collection.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        schemas={[faqSchema(HOME_FAQS), breadcrumbSchema([{ name: "Home", path: "/" }])]}
      />

      <PageHero
        tall
        priority
        label={`Houston, Texas · Since ${site.founded}`}
        photo={photos.houstonNight}
        title={
          <>
            Let your customers
            {" "}
            <br className="hidden sm:inline" />
            say yes. <span className="text-accent">Every time.</span>
          </>
        }
        intro={`Offer instant financing at the point of sale. One application reaches ${site.stats.lenders}+ lenders, approvals come back in about ten seconds, and your business is paid in full within 24 hours.`}
        actions={
          <>
            <Magnetic>
              <ButtonLink href="/contact" variant="accent" size="lg">
                Become a partner <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="/partners" variant="outlineLight" size="lg">
              See how it works
            </ButtonLink>
            <span className="label mt-2 text-steel sm:ml-4 sm:mt-0">
              No setup fees · Nothing to install
            </span>
          </>
        }
      />

      {/* ------------------------------------------------------------ Proof */}
      <Section tone="dark" id="proof" rail="Proof" className="py-0 sm:py-0">
        <Container>
          <StatBand />
        </Container>
      </Section>

      {/* ----------------------------------------------------------- Offers */}
      <Section tone="light" id="what-we-do" rail="What we do">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[30rem_1fr] lg:gap-24">
            <Heading
              label="What we do"
              title="Three ways we move money for you"
              intro="A lending and payments brokerage built around the two problems every business owner actually has: customers who cannot pay all at once, and costs that quietly eat the margin."
              className="lg:sticky lg:top-32 lg:self-start"
            />

            <div>
              <LinkList
                items={services.map((service) => ({
                  href: `/services/${service.slug}`,
                  title: service.nav,
                  meta: service.eyebrow,
                }))}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- Partner */}
      <Section tone="paper" id="partner" rail="Partner">
        <Container>
          <SplitFeature
            label="Partner program"
            title="The estimate is not the problem. The total is."
            photo={photos.poolDusk}
            body={
              <>
                <p>
                  A homeowner wants the spa, the tanning ledge, and the water
                  feature. Then the number lands, and the build shrinks to the base
                  package, or dies in the driveway entirely.
                </p>
                <p>
                  Present a monthly payment alongside the total and the conversation
                  changes. Buyers stop evaluating a lump sum and start evaluating a
                  payment, which is the only number most of them were weighing in the
                  first place. The upgrades survive. So does your margin.
                </p>
              </>
            }
          >
            <div className="mt-10">
              <ButtonLink href="/partners" variant="outline" size="md">
                Explore the partner program <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </SplitFeature>
        </Container>
      </Section>

      {/* ----------------------------------------------------- How it works */}
      <Section tone="dark" id="how-it-works" rail="How it works">
        <Container>
          <Heading
            tone="light"
            label="How it works"
            title="From estimate to approved, in about a minute"
          />
          <div className="mt-16">
            <NumberedList items={STEPS} tone="light" />
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------- Industries */}
      <Section tone="light" id="industries" rail="Industries">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[30rem_1fr] lg:gap-24">
            <Heading
              label="Industries"
              title="Built for the businesses where price is the last objection"
              intro="Every industry below sells a high-ticket, largely discretionary purchase. That is exactly where a monthly payment turns a maybe into a signature."
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

      {/* --------------------------------------------------------- Authority */}
      <Section tone="paper" id="about" rail="About">
        <Container>
          <SplitFeature
            flip
            label={`Since ${site.founded}`}
            title="Twenty years of getting deals funded when the bank said no"
            photo={photos.houstonTower}
            body={
              <>
                <p>
                  GCS Funding was created in 2003, back when receipts still came off
                  carbon paper. We have watched the payment industry move from
                  imprinters to touchless processing, and more than{" "}
                  {site.stats.merchants.toLocaleString()} merchants have trusted us
                  with their daily business along the way.
                </p>
                <p>
                  A broker is only worth what their lender network is worth. Ours
                  covers every credit tier, from perfect credit to first-time buyers
                  with no history to owners who have been through a bankruptcy. That
                  is why we can say yes on files that get one answer at a bank.
                </p>
              </>
            }
          >
            <div className="mt-10">
              <ButtonLink href="/about" variant="outline" size="md">
                More about GCS Funding <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </SplitFeature>
        </Container>
      </Section>

      <FaqSection faqs={HOME_FAQS} title="The questions we get first" />

      <CtaSection />
    </>
  );
}
