import { notFound } from "next/navigation";

import { CtaSection, LinkList, PageHero } from "@/components/sections/shared";
import { Container, Heading, Section } from "@/components/ui/primitives";
import { photos } from "@/lib/photos";
import { getAllPosts, getPost } from "@/lib/posts";
import { JsonLd, ORG_ID, PERSON_ID, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.metaTitle ?? post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

// Each post opens on the image that matches its subject.
const POST_PHOTOS: Record<string, (typeof photos)[keyof typeof photos]> = {
  "is-credit-card-surcharging-legal-in-texas": photos.cardReader,
  "business-line-of-credit-requirements-texas": photos.houstonTower,
  "customer-financing-increase-average-ticket": photos.kitchen,
  "commercial-truck-financing-bad-credit": photos.truckNight,
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = getAllPosts().filter((item) => item.slug !== post.slug);

  const trail = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd
        schemas={[
          {
            "@type": "Article",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            author: { "@id": PERSON_ID },
            publisher: { "@id": ORG_ID },
            mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
          },
          breadcrumbSchema(trail),
        ]}
      />

      <article>
        <PageHero
          priority
          trail={trail}
          label={post.category}
          title={post.title}
          intro={post.description}
          photo={POST_PHOTOS[post.slug] ?? photos.houstonNight}
        />

        <Section tone="paper">
          <Container>
            <p className="label mb-12 text-ink-soft">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {" · "}
              {post.readingTime} min read
            </p>

            {/*
              Typography is scoped to .post-body so markdown renders consistently
              without leaking styles into the rest of the site.
            */}
            <div
              className="post-body max-w-3xl"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </Container>
        </Section>

        {others.length ? (
          <Section tone="light">
            <Container>
              <div className="grid gap-14 lg:grid-cols-[30rem_1fr] lg:gap-24">
                <Heading
                  label="Keep reading"
                  title="More from GCS Funding"
                  className="lg:sticky lg:top-32 lg:self-start"
                />
                <LinkList
                  items={others.map((item) => ({
                    href: `/blog/${item.slug}`,
                    title: item.title,
                    meta: item.category,
                  }))}
                />
              </div>
            </Container>
          </Section>
        ) : null}
      </article>

      <CtaSection />
    </>
  );
}
