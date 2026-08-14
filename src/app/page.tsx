import { ArrowRight } from "lucide-react";

import { Magnetic } from "@/components/atmosphere";
import { Reveal } from "@/components/motion/reveal";
import { LeadSection } from "@/components/sections/lead-section";
import {
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
  Label,
  Section,
} from "@/components/ui/primitives";
import { industries } from "@/lib/industries";
import { photos } from "@/lib/photos";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Customer Financing & Business Funding in Houston | GCS Funding",
  description:
    "Offer your customers instant financing at the point of sale, or secure a line of credit up to $300K. GCS Funding is a national direct funding source in Cypress, TX with 20+ lenders since 2003.",
  path: "/",
});

const STEPS = [
  {
    title: "One application",
    body: "Your customer applies on any device, in under a minute, without paper and without leaving your business.",
  },
  {
    title: "Live offers in ten seconds",
    body: "A soft credit pull returns real offers from our lender network, with no effect on their score.",
  },
  {
    title: "They choose the payment",
    body: "The conversation moves off the total and onto the monthly number, which is the one they were evaluating all along.",
  },
  {
    title: "You are paid in 24 hours",
    body: "Funds are issued directly to your business. You never carry the balance and never chase the collection.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd schemas={[breadcrumbSchema([{ name: "Home", path: "/" }])]} />

      <PageHero
        tall
        priority
        label={`Houston, Texas · Since ${site.founded}`}
        photo={photos.houstonNight}
        title={
          <>
            Let your customers{" "}
            <br className="hidden sm:inline" />
            say yes. <span className="text-accent">Every time.</span>
          </>
        }
        intro={`Offer instant financing at the point of sale. One application reaches ${site.stats.lenders}+ lenders, approvals come back in about ten seconds, and your business is paid in full within 24 hours.`}
        actions={
          <>
            {/* Anchors to the form further down rather than navigating away —
                the visitor never leaves the page to start. */}
            <Magnetic>
              <ButtonLink href="#get-started" variant="accent" size="lg">
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

      {/* ------------------------------------------- Proof + who we are ----
          The stats and the twenty-year story share one section; they were two
          separate full-height blocks before, saying the same thing twice. */}
      <Section tone="dark" id="proof" rail="Proof" className="py-20 sm:py-24">
        <Container>
          <StatBand />

          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <Reveal>
              <Label tone="light">Why GCS Funding</Label>
              <h2 className="display-sm mt-7 text-white">
                Twenty years of getting deals funded when the bank said no
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="space-y-5 text-lg leading-relaxed text-mist">
                <p>
                  GCS Funding was created in 2003, back when receipts still came
                  off carbon paper. More than{" "}
                  {site.stats.merchants.toLocaleString()} merchants have trusted
                  us with their daily business since.
                </p>
                <p>
                  A broker is only worth what their lender network is worth. Ours
                  covers every credit tier, from perfect credit to owners who have
                  been through a bankruptcy. That is why we say yes on files that
                  get one answer at a bank.
                </p>
              </div>
              <div className="mt-8">
                <ButtonLink href="/about" variant="outlineLight" size="md">
                  More about GCS Funding <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ What we do */}
      <Section tone="light" id="what-we-do" rail="What we do" className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[28rem_1fr] lg:gap-20">
            <Heading
              label="What we do"
              title="Three ways we move money for you"
              intro="A lending and payments brokerage built around the two problems every business owner actually has: customers who cannot pay all at once, and costs that quietly eat the margin."
              className="lg:sticky lg:top-32 lg:self-start"
            />
            <LinkList
              items={services.map((service) => ({
                href: `/services/${service.slug}`,
                title: service.nav,
                meta: service.eyebrow,
              }))}
            />
          </div>
        </Container>
      </Section>

      {/* ------------------------------- Partner story + how it works ------
          The four steps sit inside this section rather than occupying one of
          their own; they are the mechanics of the argument being made here. */}
      <Section tone="paper" id="partner" rail="Partner" className="py-20 sm:py-24">
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
                  Present a monthly payment alongside the total and the
                  conversation changes. Buyers stop evaluating a lump sum and start
                  evaluating a payment. The upgrades survive, and so does your
                  margin.
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

          <div className="mt-20">
            <Label>How it works</Label>
            <div className="mt-8">
              <NumberedList items={STEPS} />
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- Industries */}
      <Section tone="light" id="industries" rail="Industries" className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[28rem_1fr] lg:gap-20">
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

      <LeadSection title="Tell us about the business" />
    </>
  );
}
