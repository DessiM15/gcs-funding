import { CtaSection, LinkList, PageHero } from "@/components/sections/shared";
import { Container, Heading, Section } from "@/components/ui/primitives";
import { photos } from "@/lib/photos";
import { getAllPosts } from "@/lib/posts";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resources & Calculators | GCS Funding",
  description:
    "Free calculators and plain-English guides on customer financing, credit card surcharging, business lines of credit, and equipment funding for Houston-area businesses.",
  path: "/resources",
});

const TOOLS = [
  {
    href: "/resources/surcharge-savings-calculator",
    title: "Surcharge Savings Calculator",
    meta: "What card fees really cost",
  },
  {
    href: "/resources/financing-impact-calculator",
    title: "Financing Impact Calculator",
    meta: "Model the revenue lift",
  },
];

export default function ResourcesPage() {
  const posts = getAllPosts();
  const trail = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
  ];

  return (
    <>
      <JsonLd schemas={[breadcrumbSchema(trail)]} />

      <PageHero
        priority
        trail={trail}
        label="Resources"
        title="Tools and guides, no email gate"
        intro="Straight answers on financing, processing costs, and business credit. If something here saves you money without ever calling us, that is a fine outcome."
        photo={photos.cardReader}
      />

      <Section tone="light" id="calculators" rail="Calculators">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[30rem_1fr] lg:gap-24">
            <Heading
              label="Calculators"
              title="Run your own numbers"
              className="lg:sticky lg:top-32 lg:self-start"
            />
            <LinkList items={TOOLS} />
          </div>
        </Container>
      </Section>

      {posts.length ? (
        <Section tone="paper" id="guides" rail="Guides">
          <Container>
            <div className="grid gap-14 lg:grid-cols-[30rem_1fr] lg:gap-24">
              <Heading
                label="Guides"
                title="Written from twenty years of the same questions"
                className="lg:sticky lg:top-32 lg:self-start"
              />
              <LinkList
                items={posts.map((post) => ({
                  href: `/blog/${post.slug}`,
                  title: post.title,
                  meta: post.category,
                }))}
              />
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaSection />
    </>
  );
}
