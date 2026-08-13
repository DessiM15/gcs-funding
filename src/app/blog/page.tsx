import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Blobs, Breadcrumbs, CtaSection } from "@/components/sections/shared";
import { Card, Container, Eyebrow, Section } from "@/components/ui/primitives";
import { getAllPosts } from "@/lib/posts";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Business Funding Insights & Guides | GCS Funding",
  description:
    "Plain-English guides to customer financing, credit card surcharging, business lines of credit, and equipment funding, written by a Houston lending broker since 2003.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const trail = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/blog" },
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
              <Eyebrow>Insights</Eyebrow>
              <h1 className="mt-6 text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-5xl">
                What we tell business owners
              </h1>
              <p className="mt-7 text-lg leading-relaxed text-ink-500">
                Twenty years of answering the same questions, written down so you
                do not have to call to get the answer.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.05}>
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <Card className="flex h-full flex-col">
                    <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brand-700">
                      {post.category}
                    </span>
                    <h2 className="mt-3 text-xl font-bold leading-snug text-ink-900">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 leading-relaxed text-ink-500">
                      {post.description}
                    </p>
                    <span className="mt-5 flex items-center justify-between text-sm">
                      <span className="text-ink-400">
                        {post.readingTime} min read
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-brand-700">
                        Read <ArrowRight className="h-3.5 w-3.5" />
                      </span>
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
