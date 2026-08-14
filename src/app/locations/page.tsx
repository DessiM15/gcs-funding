import { CtaSection, LinkList, PageHero } from "@/components/sections/shared";
import { Container, Heading, Section } from "@/components/ui/primitives";
import { locations } from "@/lib/locations";
import { photos } from "@/lib/photos";
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

      <PageHero
        priority
        trail={trail}
        label="Greater Houston"
        title="Where we work"
        intro="GCS Funding has operated out of Cypress, Texas since 2003. We work with businesses throughout the Houston metro, and the pages below cover what funding looks like in each market."
        photo={photos.houstonNight}
      />

      <Section tone="light" id="areas" rail="Areas">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[30rem_1fr] lg:gap-24">
            <Heading
              label="Areas we serve"
              title="Six markets, six different funding conversations"
              className="lg:sticky lg:top-32 lg:self-start"
            />
            <LinkList
              items={locations.map((location) => ({
                href: `/locations/${location.slug}`,
                title: `${location.city}, TX`,
                meta: location.angle.title,
              }))}
            />
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
