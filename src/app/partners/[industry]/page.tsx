import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import { Magnetic } from "@/components/atmosphere";
import { Reveal } from "@/components/motion/reveal";
import {
  CtaSection,
  FaqSection,
  LinkList,
  PageHero,
} from "@/components/sections/shared";
import {
  ButtonLink,
  Container,
  Heading,
  Label,
  Section,
} from "@/components/ui/primitives";
import { industries, industryBySlug } from "@/lib/industries";
import { photoForIndustry } from "@/lib/photos";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
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

  const related = industries.filter((item) => item.slug !== industry.slug);

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

      <PageHero
        priority
        trail={trail}
        label={`Partner program · ${industry.name}`}
        title={industry.h1}
        photo={photoForIndustry(industry.slug)}
        actions={
          <>
            <Magnetic>
              <ButtonLink href="/contact" variant="accent" size="lg">
                Become a partner <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </Magnetic>
            <span className="label mt-2 text-steel sm:ml-4 sm:mt-0">
              Typical ticket {industry.typicalTicket}
            </span>
          </>
        }
      />

      {/*
        Opening with the objection in their own language is what makes a
        long-tail vertical page convert rather than merely rank.
      */}
      <Section tone="dark" id="the-problem" rail="The problem" className="border-t hairline-dark">
        <Container>
          <Reveal>
            <Label tone="light">The moment it goes wrong</Label>
            <blockquote className="mt-10 max-w-4xl border-l-2 border-accent pl-8 font-display text-[clamp(1.6rem,3.4vw,2.9rem)] font-bold leading-[1.12] tracking-[-0.04em] text-white sm:pl-12">
              {industry.problem}
            </blockquote>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-12 max-w-2xl text-lg leading-relaxed text-mist">
              {industry.intro}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="light" id="what-changes" rail="What changes">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[30rem_1fr] lg:gap-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Heading
                label={`Typical ticket ${industry.typicalTicket}`}
                title={`What financing changes for ${industry.audience}`}
                intro="One paperless application reaches more than 20 prime and subprime lenders at once. Offers return in about ten seconds on a soft pull, and your business is paid directly within 24 hours."
              />

              <div className="mt-12 border-t hairline pt-8">
                <p className="label text-ink-soft">Cost to join</p>
                <p className="mt-4 font-display text-2xl font-bold tracking-[-0.035em] text-ink">
                  No setup, application, or monthly fees
                </p>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  Nothing to install and no equipment to buy or lease. You pay a
                  discount fee only on funded transactions.
                </p>
              </div>
            </div>

            <ul className="border-t hairline">
              {industry.outcomes.map((outcome, index) => (
                <li key={outcome} className="border-b hairline">
                  <Reveal delay={index * 0.05}>
                    <div className="flex items-start gap-6 py-7">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-accent-ink" />
                      <span className="text-lg leading-relaxed text-ink">
                        {outcome}
                      </span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <FaqSection
        faqs={industry.faqs}
        title={`Financing questions from ${industry.audience}`}
      />

      <Section tone="light" id="industries" rail="Industries">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[30rem_1fr] lg:gap-24">
            <Heading
              label="Partner program"
              title="Other industries we work with"
              className="lg:sticky lg:top-32 lg:self-start"
            />
            <LinkList
              items={related.map((item) => ({
                href: `/partners/${item.slug}`,
                title: item.name,
                meta: item.typicalTicket,
              }))}
            />
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Ready to offer financing to your customers?"
        body="Tell us about your business and your average ticket, and we will come back within one business day with the program that fits."
        cta="Become a partner"
      />
    </>
  );
}
