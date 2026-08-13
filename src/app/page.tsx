import Link from "next/link";
import { ArrowRight, Building2, CreditCard, Landmark, Zap } from "lucide-react";

import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import {
  Blobs,
  CtaSection,
  FaqSection,
  StatsBand,
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
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
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

const OFFERS = [
  {
    icon: Zap,
    title: "Customer financing",
    body: "Let your customers pay over time while you are paid in full within 24 hours. One application, 20+ lenders, approvals in seconds.",
    href: "/partners",
    cta: "Partner with us",
  },
  {
    icon: CreditCard,
    title: "Card processing & surcharge",
    body: "A compliant surcharge program that moves processing cost to the cardholder, so you keep 100% of your published prices. High-risk welcome.",
    href: "/services/credit-card-processing",
    cta: "See the program",
  },
  {
    icon: Landmark,
    title: "Capital for your business",
    body: "Revolving lines of credit up to $300,000 with approvals in as fast as 20 minutes, plus equipment and commercial truck financing.",
    href: "/services/business-line-of-credit",
    cta: "Explore funding",
  },
];

const STEPS = [
  {
    title: "One application",
    body: "Your customer applies on any device, in under a minute, without paper and without leaving your business.",
  },
  {
    title: "Live offers in seconds",
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
        schemas={[
          faqSchema(HOME_FAQS),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
        ]}
      />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden pb-16 pt-14 sm:pt-20">
        <Blobs />
        <div
          aria-hidden="true"
          className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)]"
        />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow>Houston&apos;s funding broker since 2003</Eyebrow>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-7 text-[2.6rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink-900 sm:text-6xl md:text-[4.1rem]">
                Let your customers
                <br />
                <span className="text-gradient">say yes.</span> Every time.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-500 sm:text-xl">
                Offer instant financing at the point of sale. One application
                reaches {site.stats.lenders}+ lenders, approvals come back in
                about ten seconds, and your business is paid in full within 24
                hours.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href="/contact" variant="brand" size="lg">
                  Become a partner <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/partners" variant="outline" size="lg">
                  See how it works
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-6 text-sm text-ink-400">
                No setup fees &middot; No monthly fees &middot; Nothing to install
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3} className="mt-16">
            <StatsBand />
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------------- Offers */}
      <Section>
        <Container>
          <Heading
            eyebrow="What we do"
            title="Three ways GCS Funding"
            accent="moves money for you"
            subtitle="A lending and payments brokerage built around the two problems every business owner actually has: customers who cannot pay all at once, and costs that quietly eat the margin."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {OFFERS.map((offer, index) => (
              <Reveal key={offer.title} delay={index * 0.08}>
                <Card className="flex h-full flex-col">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-azure-500 text-white shadow-[0_10px_24px_-12px_rgb(27_150_216/0.9)]">
                    <offer.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-ink-900">
                    {offer.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-500">
                    {offer.body}
                  </p>
                  <Link
                    href={offer.href}
                    className="mt-6 inline-flex items-center gap-1.5 text-[0.925rem] font-semibold text-brand-700 transition-colors hover:text-brand-800"
                  >
                    {offer.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- How it works */}
      <Section className="bg-white">
        <Container>
          <Heading
            eyebrow="How it works"
            title="From estimate to"
            accent="approved, in about a minute"
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.07}>
                <div className="relative h-full rounded-3xl border border-ink-100 bg-canvas p-7">
                  <span className="font-display text-4xl font-extrabold text-brand-200">
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-500">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- Industries */}
      <Section>
        <Container>
          <Heading
            eyebrow="Partner program"
            title="Built for the businesses where"
            accent="price is the only objection left"
            subtitle="Every industry below sells a high-ticket, mostly discretionary purchase. That is exactly where a monthly payment turns a maybe into a signature."
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

      {/* ---------------------------------------------------------- Authority */}
      <Section className="bg-white">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal direction="left">
              <Eyebrow>Why GCS Funding</Eyebrow>
              <h2 className="mt-5 text-3xl font-bold leading-[1.12] text-ink-900 sm:text-4xl md:text-[2.75rem]">
                Twenty years of getting deals funded when the bank said no
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-500">
                GCS Funding was created in 2003, back when receipts still came off
                carbon paper. We have watched the payment industry change from
                imprinters to touchless processing, and more than 5,000 merchants
                have trusted us with their daily business along the way.
              </p>
              <p className="mt-4 leading-relaxed text-ink-500">
                A broker is only worth what their lender network is worth. Ours
                covers every credit tier, from perfect credit to first-time buyers
                with no history to owners who have been through a bankruptcy. That
                is why we can say yes on files that get one answer at a bank.
              </p>
              <div className="mt-9">
                <ButtonLink href="/about" variant="outline" size="md">
                  More about GCS Funding <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { value: site.stats.merchants, suffix: "+", label: "Merchants processing with GCS" },
                  { value: site.stats.lenders, suffix: "+", label: "National lenders, every credit tier" },
                  { value: 500, prefix: "", label: "Approvals down to a 500 FICO" },
                  { value: site.stats.maxConsumerLoan, prefix: "$", label: "Maximum consumer approval" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-ink-100 bg-canvas p-7"
                  >
                    <p className="font-display text-3xl font-extrabold tracking-tight text-ink-900">
                      <CountUp
                        to={stat.value}
                        prefix={stat.prefix ?? ""}
                        suffix={stat.suffix ?? ""}
                      />
                    </p>
                    <p className="mt-2 text-sm leading-snug text-ink-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <FaqSection faqs={HOME_FAQS} title="The questions we get first" />

      <CtaSection />
    </>
  );
}
