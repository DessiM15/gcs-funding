import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Quote } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import {
  Blobs,
  Breadcrumbs,
  CtaSection,
  FaqSection,
} from "@/components/sections/shared";
import {
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  Heading,
  Section,
} from "@/components/ui/primitives";
import { industries, industryBySlug } from "@/lib/industries";
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return industries.map((industry) => ({ industry: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) return {};

  return buildMetadata({
    title: industry.metaTitle,
    description: industry.metaDescription,
    path: `/partners/${industry.slug}`,
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Partner Program", path: "/partners" },
    { name: industry.name, path: `/partners/${industry.slug}` },
  ];

  const related = industries
    .filter((item) => item.slug !== industry.slug)
    .slice(0, 4);

  return (
    <>
      <JsonLd
        schemas={[
          serviceSchema({
            name: industry.h1,
            description: industry.metaDescription,
            url: `${SITE_URL}/partners/${industry.slug}`,
          }),
          faqSchema(industry.faqs),
          breadcrumbSchema(trail),
        ]}
      />

      <section className="relative overflow-hidden pb-14 pt-12">
        <Blobs />
        <Container className="relative">
          <Breadcrumbs trail={trail} />

          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Partner program &middot; {industry.name}</Eyebrow>
              <h1 className="mt-6 text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-5xl md:text-[3.3rem]">
                {industry.h1}
              </h1>
            </Reveal>

            {/* Opening with the objection, in their language, is what makes a
                long-tail vertical page convert rather than just rank. */}
            <Reveal delay={0.08}>
              <blockquote className="mt-8 flex gap-4 rounded-3xl border-l-4 border-brand-500 bg-white p-6">
                <Quote className="h-5 w-5 shrink-0 text-brand-400" />
                <p className="text-lg font-medium leading-relaxed text-ink-800">
                  {industry.problem}
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-7 text-lg leading-relaxed text-ink-500">
                {industry.intro}
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
                  See program details
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
            <Reveal direction="left">
              <Eyebrow>Typical ticket {industry.typicalTicket}</Eyebrow>
              <h2 className="mt-5 text-3xl font-bold leading-[1.14] text-ink-900 sm:text-4xl">
                What financing changes for {industry.audience}
              </h2>
              <p className="mt-5 leading-relaxed text-ink-500">
                One paperless application reaches more than 20 prime and subprime
                lenders at once. Offers return in about ten seconds on a soft
                pull, and your business is paid directly within 24 hours.
              </p>
              <div className="mt-8 rounded-3xl border border-ink-100 bg-canvas p-6">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink-400">
                  Costs to join
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-ink-900">
                  No setup, application, or monthly fees
                </p>
                <p className="mt-2 text-sm text-ink-500">
                  Nothing to install and no equipment to buy or lease. You pay a
                  discount fee only on funded transactions.
                </p>
              </div>
            </Reveal>

            <Reveal direction="right">
              <ul className="space-y-3">
                {industry.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex items-start gap-3.5 rounded-2xl border border-ink-100 bg-canvas p-5"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-azure-500 text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="leading-relaxed text-ink-700">
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <FaqSection
        faqs={industry.faqs}
        title={`Financing questions from ${industry.audience}`}
      />

      <Section className="bg-white">
        <Container>
          <Heading title="Other industries we partner with" align="left" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.05}>
                <Link href={`/partners/${item.slug}`} className="block h-full">
                  <Card className="h-full">
                    <h3 className="text-base font-bold text-ink-900">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-ink-400">
                      {item.typicalTicket}
                    </p>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection
        title={`Ready to offer financing to your customers?`}
        body="Tell us about your business and your average ticket, and we will come back within one business day with the program that fits."
        cta="Become a partner"
      />
    </>
  );
}
