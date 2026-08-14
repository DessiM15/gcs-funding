import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { CtaSection, PageHero } from "@/components/sections/shared";
import { Container, Heading, Section } from "@/components/ui/primitives";
import { photos } from "@/lib/photos";
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

      <PageHero
        priority
        trail={trail}
        label="Insights"
        title="What we tell business owners"
        intro="Twenty years of answering the same questions, written down so you do not have to call to get the answer."
        photo={photos.kitchen}
      />

      <Section tone="light" id="articles" rail="Articles">
        <Container>
          <Heading label="Guides" title="Latest articles" />

          <ul className="mt-16 border-t hairline">
            {posts.map((post, index) => (
              <li key={post.slug} className="border-b hairline">
                <Reveal delay={index * 0.04}>
                  <Link href={`/blog/${post.slug}`} className="group/row block py-10">
                    <div className="grid gap-6 md:grid-cols-[10rem_1fr_2.5rem] md:items-start md:gap-12">
                      <span className="label text-accent-ink">{post.category}</span>

                      <div>
                        <h2 className="font-display text-2xl font-bold leading-tight tracking-[-0.035em] text-ink transition-colors group-hover/row:text-accent-ink sm:text-3xl">
                          {post.title}
                        </h2>
                        <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
                          {post.description}
                        </p>
                        <p className="label mt-5 text-ink-soft">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}{" "}
                          · {post.readingTime} min read
                        </p>
                      </div>

                      <ArrowUpRight className="hidden h-5 w-5 text-accent-ink transition-transform duration-300 group-hover/row:translate-x-1 group-hover/row:-translate-y-1 md:block" />
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
