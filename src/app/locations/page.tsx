import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Blobs, Breadcrumbs, CtaSection } from "@/components/sections/shared";
import {
  Card,
  Container,
  Eyebrow,
  Section,
} from "@/components/ui/primitives";
import { locations } from "@/lib/locations";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Areas We Serve | Houston-Area Business Funding | GCS Funding",
  description:
    "GCS Funding serves businesses across the Houston metro, including Cypress, Katy, The Woodlands, Sugar Land, and Spring, with customer financing, lines of credit, and card processing.",
  path: "/locations",
});

export default function LocationsPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Areas We Serve", path: "/locations" },
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
              <Eyebrow>Greater Houston</Eyebrow>
              <h1 className="mt-6 text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-5xl">
                Where we work
              </h1>
              <p className="mt-7 text-lg leading-relaxed text-ink-500">
                GCS Funding has operated out of Cypress, Texas since 2003. We work
                with businesses throughout the Houston metro, and the pages below
                cover what funding looks like in each market.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location, index) => (
              <Reveal key={location.slug} delay={index * 0.05}>
                <Link href={`/locations/${location.slug}`} className="block h-full">
                  <Card className="h-full">
                    <MapPin className="h-5 w-5 text-azure-500" />
                    <h2 className="mt-4 text-lg font-bold text-ink-900">
                      {location.city}, TX
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">
                      {location.angle.title}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                      View {location.city}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
