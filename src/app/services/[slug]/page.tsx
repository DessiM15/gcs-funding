import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Magnetic } from "@/components/atmosphere";
import { Reveal } from "@/components/motion/reveal";
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
  Label,
  Section,
} from "@/components/ui/primitives";
import { photoForService } from "@/lib/photos";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { serviceBySlug, services } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Financing", path: "/services/consumer-financing" },
    { name: service.nav, path: `/services/${service.slug}` },
  ];

  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <JsonLd
        schemas={[
          serviceSchema({
            name: service.nav,
            description: service.metaDescription,
            url: `${SITE_URL}/services/${service.slug}`,
          }),
          faqSchema(service.faqs),
          breadcrumbSchema(trail),
        ]}
      />

      <PageHero
        priority
        trail={trail}
        label={service.eyebrow}
        title={service.h1}
        photo={photoForService(service.slug)}
        actions={
          <Magnetic>
            <ButtonLink href="/contact" variant="accent" size="lg">
              Get started <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Magnetic>
        }
      />

      <Section tone="dark" className="py-0 sm:py-0" id="figures" rail="Figures">
        <Container>
          <HighlightRow highlights={service.highlights} />
        </Container>
      </Section>

      <Section tone="light" id="overview" rail="Overview">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
            <Reveal>
              <Label>Overview</Label>
              <p className="mt-8 font-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-bold leading-[1.15] tracking-[-0.035em] text-ink">
                {service.intro}
              </p>
            </Reveal>

            {service.qualifications ? (
              <Reveal delay={0.1}>
                <Label>What you need to apply</Label>
                <ul className="mt-8 border-t hairline">
                  {service.qualifications.map((item) => (
                    <li
                      key={item}
                      className="border-b hairline py-5 text-lg font-medium text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-7 leading-relaxed text-ink-soft">
                  These are the baselines. Falling short on one is still worth a
                  conversation, because our lender network covers every credit tier
                  and structures around exceptions regularly.
                </p>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section tone="paper" id="details" rail="Details">
        <Container>
          <Heading label="What you get" title="The details that decide the deal" />
          <div className="mt-16">
            <NumberedList items={service.features} />
          </div>
        </Container>
      </Section>

      <FaqSection faqs={service.faqs} />

      {/* Internal linking: passes authority between money pages and keeps
          visitors moving toward the offer that actually fits them. */}
      <Section tone="light" id="more" rail="More">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[30rem_1fr] lg:gap-24">
            <Heading
              label="Also from GCS"
              title="Other ways we can help"
              className="lg:sticky lg:top-32 lg:self-start"
            />
            <LinkList
              items={others.map((item) => ({
                href: `/services/${item.slug}`,
                title: item.nav,
                meta: item.eyebrow,
              }))}
            />
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
