import Link from "next/link";
import { ArrowRight, Calculator, FileText } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Blobs, Breadcrumbs, CtaSection } from "@/components/sections/shared";
import { Card, Container, Eyebrow, Section } from "@/components/ui/primitives";
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
    body: "Work out your effective processing rate and what a compliant surcharge program would recover each year.",
  },
  {
    href: "/resources/financing-impact-calculator",
    title: "Financing Impact Calculator",
    body: "Model what offering customer financing does to your close rate, your average ticket, and your annual revenue.",
  },
];

export default function ResourcesPage() {
  const posts = getAllPosts().slice(0, 4);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
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
              <Eyebrow>Resources</Eyebrow>
              <h1 className="mt-6 text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-5xl">
                Tools and guides, no email gate
              </h1>
              <p className="mt-7 text-lg leading-relaxed text-ink-500">
                Straight answers on financing, processing costs, and business
                credit. If something here saves you money without ever calling us,
                that is a fine outcome.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <h2 className="text-2xl font-bold text-ink-900">Calculators</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {TOOLS.map((tool, index) => (
              <Reveal key={tool.href} delay={index * 0.06}>
                <Link href={tool.href} className="block h-full">
                  <Card className="h-full">
                    <Calculator className="h-5 w-5 text-azure-500" />
                    <h3 className="mt-4 text-lg font-bold text-ink-900">
                      {tool.title}
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-ink-500">
                      {tool.body}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                      Open calculator <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>

          {posts.length ? (
            <>
              <h2 className="mt-16 text-2xl font-bold text-ink-900">
                Latest guides
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {posts.map((post, index) => (
                  <Reveal key={post.slug} delay={index * 0.05}>
                    <Link href={`/blog/${post.slug}`} className="block h-full">
                      <Card className="h-full">
                        <FileText className="h-5 w-5 text-brand-600" />
                        <h3 className="mt-4 text-lg font-bold text-ink-900">
                          {post.title}
                        </h3>
                        <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-500">
                          {post.description}
                        </p>
                      </Card>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </>
          ) : null}
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
