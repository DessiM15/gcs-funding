import { ArrowRight, Check } from "lucide-react";

import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import {
  Blobs,
  Breadcrumbs,
  CtaSection,
  StatsBand,
} from "@/components/sections/shared";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Heading,
  Section,
} from "@/components/ui/primitives";
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

      <section className="relative overflow-hidden pb-14 pt-12">
        <Blobs />
        <Container className="relative">
          <Breadcrumbs trail={trail} />

          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Since 2003</Eyebrow>
              <h1 className="mt-6 text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-5xl md:text-[3.4rem]">
                Twenty years of getting deals funded when the bank
                <span className="text-gradient"> said no</span>
              </h1>
              <p className="mt-7 text-lg leading-relaxed text-ink-500 sm:text-xl">
                GCS Funding was created in 2003 and has grown alongside a business
                funding industry that has changed almost beyond recognition. We
                started when receipts came off carbon paper. We are now placing
                touchless payment technology and instant point-of-sale approvals
                for merchants across the country.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-14">
            <StatsBand />
          </Reveal>
        </Container>
      </section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
            <Reveal direction="left">
              <Heading
                eyebrow="The company"
                title="A national direct funding source, run out of Cypress, Texas"
                align="left"
              />
              <div className="mt-7 space-y-5 text-lg leading-relaxed text-ink-500">
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
                  has stayed the same throughout: keep our merchants in front of
                  the curve on both technology and regulation.
                </p>
                <p>
                  Our road to success for small and mid-sized businesses is to
                  provide the leading technology and compliance so those businesses
                  can keep growing. It is why customers trust us to provide the
                  financial technology to make money, move money, manage employees,
                  and engage their customers.
                </p>
              </div>

              {/*
                NEEDS_SCOTT: replace with Scott's real bio, headshot, credentials,
                and a specific track record figure. A named, photographed expert is
                the single strongest E-E-A-T signal available on a lending site.
              */}
              <div className="mt-10 rounded-3xl border border-dashed border-brand-300 bg-brand-50/60 p-7">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brand-700">
                  Reserved for Scott
                </p>
                <p className="mt-3 leading-relaxed text-ink-600">
                  This block is built to hold Scott Reed&apos;s photo, bio, years in
                  the industry, and a concrete track record. Google treats lending
                  as a &ldquo;Your Money or Your Life&rdquo; topic and weighs
                  demonstrated expertise heavily, so a named broker with a face and
                  a history outranks an anonymous company page. It is ready the
                  moment we have the details.
                </p>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="rounded-3xl border border-ink-100 bg-canvas p-8">
                <p className="font-display text-5xl font-extrabold tracking-tight text-ink-900">
                  <CountUp to={site.stats.yearsInBusiness} suffix=" years" />
                </p>
                <p className="mt-2 text-ink-500">
                  in business funding and payments, without changing who we serve:
                  small and mid-sized businesses.
                </p>

                <ul className="mt-8 space-y-3.5 border-t border-ink-100 pt-8">
                  {[
                    "Founded in 2003 in Cypress, Texas",
                    `${site.stats.lenders}+ national lenders, all credit tiers`,
                    `${site.stats.merchants.toLocaleString()}+ merchants processing`,
                    "Consumer approvals from 500 to 800 FICO",
                    "Lines of credit to $300,000",
                    "PCI-DSS compliant payment hardware",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-[0.95rem] font-medium text-ink-700">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href="/contact"
                  variant="brand"
                  size="lg"
                  className="mt-8 w-full"
                >
                  Start a conversation <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading
            eyebrow="How we work"
            title="Four things we believe about"
            accent="getting a deal done"
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {PRINCIPLES.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.06}>
                <div className="h-full rounded-3xl border border-ink-100 bg-white p-7">
                  <h3 className="text-lg font-bold text-ink-900">
                    {principle.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-500">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
