import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import {
  Blobs,
  Breadcrumbs,
  CtaSection,
  FaqSection,
  FeatureGrid,
  HighlightRow,
} from "@/components/sections/shared";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Heading,
  Section,
} from "@/components/ui/primitives";
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { serviceBySlug, services } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

// Fully static: every service page is generated at build time.
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

      <section className="relative overflow-hidden pb-14 pt-12">
        <Blobs />
        <Container className="relative">
          <Breadcrumbs trail={trail} />

          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>{service.eyebrow}</Eyebrow>
              <h1 className="mt-6 text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-5xl md:text-[3.4rem]">
                {service.h1}
              </h1>
              <p className="mt-7 text-lg leading-relaxed text-ink-500 sm:text-xl">
                {service.intro}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" variant="brand" size="lg">
                  Get started <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/partners" variant="outline" size="lg">
                  See the partner program
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-14">
            <HighlightRow highlights={service.highlights} />
          </Reveal>
        </Container>
      </section>

      <Section className="bg-white">
        <Container>
          <Heading
            eyebrow="What you get"
            title="The details that actually"
            accent="decide the deal"
            align="left"
          />
          <div className="mt-12">
            <FeatureGrid features={service.features} />
          </div>
        </Container>
      </Section>

      {service.qualifications ? (
        <Section>
          <Container>
            <div className="grid gap-12 lg:grid-cols-2">
              <Reveal direction="left">
                <Eyebrow>Qualifying</Eyebrow>
                <h2 className="mt-5 text-3xl font-bold leading-[1.14] text-ink-900 sm:text-4xl">
                  What you need to apply
                </h2>
                <p className="mt-5 leading-relaxed text-ink-500">
                  These are the baselines. If you fall short on one of them it is
                  still worth a conversation, because our lender network covers
                  every credit tier and structures around exceptions regularly.
                </p>
              </Reveal>

              <Reveal direction="right">
                <ul className="space-y-3">
                  {service.qualifications.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-white p-5"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="font-medium text-ink-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </Container>
        </Section>
      ) : null}

      <FaqSection faqs={service.faqs} />

      {/* Internal linking: passes authority between money pages and keeps
          visitors moving toward the offer that actually fits them. */}
      <Section className="bg-white">
        <Container>
          <Heading title="Other ways we can help" align="left" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {others.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.05}>
                <ButtonLink
                  href={`/services/${item.slug}`}
                  variant="outline"
                  className="h-auto w-full justify-between rounded-2xl px-6 py-5 text-left"
                >
                  <span>
                    <span className="block font-bold text-ink-900">
                      {item.nav}
                    </span>
                    <span className="mt-1 block text-sm font-normal text-ink-400">
                      {item.eyebrow}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-ink-300" />
                </ButtonLink>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
