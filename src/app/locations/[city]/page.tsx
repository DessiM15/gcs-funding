import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import {
  Blobs,
  Breadcrumbs,
  CtaSection,
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
import { locationBySlug, locations } from "@/lib/locations";
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

      <section className="relative overflow-hidden pb-14 pt-12">
        <Blobs />
        <Container className="relative">
          <Breadcrumbs trail={trail} />

          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>
                <MapPin className="h-3.5 w-3.5" /> {location.city}, Texas
              </Eyebrow>
              <h1 className="mt-6 text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-5xl md:text-[3.3rem]">
                Business funding and customer financing in{" "}
                <span className="text-gradient">{location.city}</span>
              </h1>
              <p className="mt-7 text-lg leading-relaxed text-ink-500">
                {location.context}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" variant="brand" size="lg">
                  Get started <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/partners" variant="outline" size="lg">
                  Partner program
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-14">
            <StatsBand />
          </Reveal>
        </Container>
      </section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal direction="left">
              <Eyebrow>{location.angle.title}</Eyebrow>
              <h2 className="mt-5 text-3xl font-bold leading-[1.14] text-ink-900 sm:text-4xl">
                Why {location.city} businesses call us
              </h2>
              <p className="mt-5 leading-relaxed text-ink-500">
                {location.angle.body}
              </p>
              <p className="mt-5 leading-relaxed text-ink-500">
                We work throughout {location.city}, including{" "}
                {location.areas.slice(0, -1).join(", ")}, and{" "}
                {location.areas.at(-1)}.
              </p>
            </Reveal>

            <Reveal direction="right">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink-400">
                Who we serve in {location.city}
              </p>
              <ul className="mt-4 grid gap-3">
                {location.industries.map((industry) => (
                  <li
                    key={industry}
                    className="rounded-2xl border border-ink-100 bg-canvas px-5 py-4 font-medium text-ink-800"
                  >
                    {industry}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading title={`Funding programs available in ${location.city}`} align="left" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.05}>
                <Link href={`/services/${service.slug}`} className="block h-full">
                  <Card className="h-full">
                    <h3 className="text-base font-bold text-ink-900">
                      {service.nav}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">
                      {service.eyebrow}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <p className="text-sm text-ink-400">
              We also serve{" "}
              {locations
                .filter((item) => item.slug !== location.slug)
                .map((item, index, array) => (
                  <span key={item.slug}>
                    <Link
                      href={`/locations/${item.slug}`}
                      className="font-medium text-brand-700 hover:underline"
                    >
                      {item.city}
                    </Link>
                    {index < array.length - 1 ? ", " : "."}
                  </span>
                ))}
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaSection title={`Let's talk about your ${location.city} business`} />
    </>
  );
}
