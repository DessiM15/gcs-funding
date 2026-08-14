import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Magnetic } from "@/components/atmosphere";
import { Reveal } from "@/components/motion/reveal";
import {
  CtaSection,
  LinkList,
  PageHero,
  StatBand,
} from "@/components/sections/shared";
import {
  ButtonLink,
  Container,
  Heading,
  Label,
  Section,
} from "@/components/ui/primitives";
import { locationBySlug, locations } from "@/lib/locations";
import { photoForLocation } from "@/lib/photos";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return locations.map((location) => ({ city: location.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const location = locationBySlug(city);
  if (!location) return {};

  return buildMetadata({
    title: location.metaTitle,
    description: location.metaDescription,
    path: `/locations/${location.slug}`,
  });
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const location = locationBySlug(city);
  if (!location) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Areas We Serve", path: "/locations" },
    { name: location.city, path: `/locations/${location.slug}` },
  ];

  return (
    <>
      <JsonLd
        schemas={[
          serviceSchema({
            name: `Business funding and customer financing in ${location.city}, TX`,
            description: location.metaDescription,
            url: `${SITE_URL}/locations/${location.slug}`,
          }),
          breadcrumbSchema(trail),
        ]}
      />

      <PageHero
        priority
        trail={trail}
        label={`${location.city}, Texas`}
        title={
          <>
            Business funding in{" "}
            <span className="text-accent">{location.city}</span>
          </>
        }
        intro={location.context}
        photo={photoForLocation(location.slug)}
        actions={
          <Magnetic>
            <ButtonLink href="/contact" variant="accent" size="lg">
              Get started <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Magnetic>
        }
      />

      <Section tone="dark" className="py-0 sm:py-0" id="proof" rail="Proof">
        <Container>
          <StatBand />
        </Container>
      </Section>

      <Section tone="light" id="local" rail="Local">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
            <Reveal>
              <Label>{location.angle.title}</Label>
              <h2 className="display-sm mt-7 text-ink">
                Why {location.city} businesses call us
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-ink-soft">
                {location.angle.body}
              </p>
              <p className="mt-6 leading-relaxed text-ink-soft">
                We work throughout {location.city}, including{" "}
                {location.areas.slice(0, -1).join(", ")}, and {location.areas.at(-1)}.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <Label>Who we serve here</Label>
              <ul className="mt-8 border-t hairline">
                {location.industries.map((industry) => (
                  <li
                    key={industry}
                    className="border-b hairline py-5 font-display text-xl font-bold tracking-[-0.03em] text-ink"
                  >
                    {industry}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="paper" id="programs" rail="Programs">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[30rem_1fr] lg:gap-24">
            <Heading
              label="Programs"
              title={`What's available in ${location.city}`}
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
              <p className="mt-12 leading-relaxed text-ink-soft">
                We also serve{" "}
                {locations
                  .filter((item) => item.slug !== location.slug)
                  .map((item, index, array) => (
                    <span key={item.slug}>
                      <a
                        href={`/locations/${item.slug}`}
                        className="font-medium text-accent-ink underline underline-offset-4"
                      >
                        {item.city}
                      </a>
                      {index < array.length - 1 ? ", " : "."}
                    </span>
                  ))}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <CtaSection title={`Let's talk about your ${location.city} business`} />
    </>
  );
}
