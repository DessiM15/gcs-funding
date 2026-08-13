import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { Blobs, Breadcrumbs, CtaSection } from "@/components/sections/shared";
import { Container, Eyebrow } from "@/components/ui/primitives";
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

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = getAllPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

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
        <section className="relative overflow-hidden pb-10 pt-12">
          <Blobs />
          <Container className="relative">
            <Breadcrumbs trail={trail} />
            <div className="max-w-3xl">
              <Reveal>
                <Eyebrow>{post.category}</Eyebrow>
                <h1 className="mt-6 text-[2.1rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink-900 sm:text-[3rem]">
                  {post.title}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-ink-500">
                  {post.description}
                </p>
                <p className="mt-6 text-sm text-ink-400">
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
              </Reveal>
            </div>
          </Container>
        </section>

        <Container className="pb-20">
          {/*
            Typography is scoped here rather than globally so markdown content
            renders consistently without leaking styles into the rest of the site.
          */}
          <div
            className="post-body max-w-3xl"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {others.length ? (
            <div className="mt-16 max-w-3xl border-t border-ink-100 pt-10">
              <h2 className="text-lg font-bold text-ink-900">Keep reading</h2>
              <ul className="mt-5 space-y-3">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="font-medium text-brand-700 hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </article>

      <CtaSection />
    </>
  );
}
