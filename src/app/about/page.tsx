import { ArrowRight } from "lucide-react";

import { Magnetic } from "@/components/atmosphere";
import { Reveal } from "@/components/motion/reveal";
import {
  CtaSection,
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
import { photos } from "@/lib/photos";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About GCS Funding | A Houston Lending Broker Since 2003",
  description:
    "GCS Funding is a national direct funding source founded in 2003 and based in Cypress, TX. Over 20 national lenders, more than 5,000 merchants, and 20+ years placing difficult deals.",
  path: "/about",
});

const PRINCIPLES = [
  {
    title: "A network beats a lender",
    body: "Any single lender has a box, and everything outside that box is a decline. With more than 20 national lenders covering every credit tier, the question stops being whether a file fits and becomes which lender it fits best.",
  },
  {
    title: "Speed is part of the product",
    body: "Approvals in under ten seconds on consumer financing, as fast as 20 minutes on a line of credit, and 3 to 4 hours on equipment. Funding decisions that take two weeks are decisions the customer has already made without you.",
  },
  {
    title: "The hard files are the business",
    body: "Bankruptcies, tax liens, judgments, repossessions, slow pays, startups with no time in business, merchants other processors dropped. That is not the exception here. It is a substantial part of what we do.",
  },
  {
    title: "Compliance is not optional",
    body: "Surcharge programs live or die on the rules: card brand registration, proper disclosure signage, a fee that never exceeds the cap and never profits the merchant, and the fee processed with the sale as one transaction. We build to exceed the requirement, not to skate it.",
  },
];

export default function AboutPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <JsonLd schemas={[breadcrumbSchema(trail)]} />

      <PageHero
        priority
        tall
        trail={trail}
        label={`Since ${site.founded}`}
        title={
          <>
            Twenty years of getting deals
            {" "}
            <br className="hidden sm:inline" />
            funded when the bank <span className="text-accent">said no</span>
          </>
        }
        intro="GCS Funding was created in 2003 and has grown alongside a business funding industry that has changed almost beyond recognition. We started when receipts came off carbon paper. We now place touchless payment technology and instant point-of-sale approvals for merchants across the country."
        photo={photos.houstonTower}
      />

      <Section tone="dark" className="py-0 sm:py-0" id="proof" rail="Proof">
        <Container>
          <StatBand />
        </Container>
      </Section>

      <Section tone="light" id="company" rail="Company">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[30rem_1fr] lg:gap-24">
            <Heading
              label="The company"
              title="A national direct funding source, run out of Cypress, Texas"
              className="lg:sticky lg:top-32 lg:self-start"
            />

            <div>
              <Reveal>
                <div className="space-y-7 text-lg leading-relaxed text-ink-soft">
                  <p>
                    GCS Funding is a national direct funding solution entering our{" "}
                    {site.stats.yearsInBusiness}th year of helping businesses get
                    their buyers approved. We hold relationships with more than{" "}
                    {site.stats.lenders} national lenders spanning every credit
                    criteria, which means we have a solution for buyers with perfect
                    credit, first-time buyers with little or no credit history, and
                    buyers who have had real problems in the past.
                  </p>
                  <p>
                    On the payments side, more than{" "}
                    {site.stats.merchants.toLocaleString()} merchants have trusted
                    their daily business to GCS. We have watched the industry move
                    from carbon copy receipts to contactless processing, and our job
                    has stayed the same throughout: keep our merchants in front of the
                    curve on both technology and regulation.
                  </p>
                  <p>
                    Our road to success for small and mid-sized businesses is to
                    provide the leading technology and compliance so those businesses
                    can keep growing. It is why customers trust us to provide the
                    financial technology to make money, move money, manage employees,
                    and engage their customers.
                  </p>
                </div>
              </Reveal>

              {/*
                NEEDS_SCOTT: replace with Scott's real bio, headshot, credentials,
                and a specific track record figure. A named, photographed expert is
                the single strongest E-E-A-T signal available on a lending site.
              */}
              <Reveal delay={0.1}>
                <div className="mt-14 border-l-2 border-accent bg-paper p-8 sm:p-10">
                  <p className="label text-accent-ink">Reserved for Scott</p>
                  <p className="mt-5 leading-relaxed text-ink-soft">
                    This block is built to hold Scott Reed&apos;s photograph, bio,
                    years in the industry, and a concrete track record. Google treats
                    lending as a &ldquo;Your Money or Your Life&rdquo; topic and weighs
                    demonstrated expertise heavily, so a named broker with a face and a
                    history outranks an anonymous company page. It is ready the moment
                    we have the details.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper" id="how-we-work" rail="How we work">
        <Container>
          <SplitFeature
            flip
            label="What we believe"
            title="Four things we believe about getting a deal done"
            photo={photos.truckNight}
            body={
              <p>
                Twenty years of placing files teaches you which parts of this business
                are negotiable and which are not. These four are not.
              </p>
            }
          />
          <div className="mt-20">
            <NumberedList items={PRINCIPLES} />
          </div>
        </Container>
      </Section>

      <Section tone="light" id="start" rail="Start">
        <Container>
          <Reveal>
            <Label>Get in touch</Label>
            <h2 className="display-sm mt-7 max-w-3xl text-ink">
              If a bank has already told you no, that is usually where we start
            </h2>
            <div className="mt-10">
              <Magnetic>
                <ButtonLink href="/contact" variant="solid" size="lg">
                  Start a conversation <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
