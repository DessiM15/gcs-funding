import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/atmosphere";
import {
  ButtonLink,
  Container,
  Heading,
  Label,
  Section,
  SectionNumber,
} from "@/components/ui/primitives";
import type { Photo } from "@/lib/photos";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Full-bleed dark hero used at the top of every page, so the transparent header
 * always sits over photography and the site keeps one voice throughout.
 */
export function PageHero({
  label,
  title,
  intro,
  photo,
  priority = false,
  actions,
  trail,
  tall = false,
  children,
}: {
  label: string;
  title: React.ReactNode;
  intro?: string;
  photo: Photo;
  priority?: boolean;
  actions?: React.ReactNode;
  trail?: { name: string; path: string }[];
  tall?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative grain isolate flex items-end overflow-hidden bg-void",
        tall ? "min-h-[92svh]" : "min-h-[62svh] sm:min-h-[70svh]",
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="scrim absolute inset-0 -z-10" aria-hidden="true" />

      <Container className="relative pb-16 pt-40 sm:pb-24 sm:pt-48">
        {trail ? (
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="label flex flex-wrap items-center gap-2.5 text-steel">
              {trail.map((crumb, index) => (
                <li key={crumb.path} className="flex items-center gap-2.5">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  {index === trail.length - 1 ? (
                    <span className="text-mist">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path} className="transition-colors hover:text-accent">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Reveal>
          <Label tone="light">{label}</Label>
        </Reveal>

        <Reveal delay={0.08}>
          <h1
            className={cn(
              "mt-8 max-w-5xl text-white",
              tall ? "display" : "display-sm",
            )}
          >
            {title}
          </h1>
        </Reveal>

        {/* The green rule beneath the headline is the brand's signature mark. */}
        <Reveal delay={0.14}>
          <span className="mt-10 block h-0.5 w-28 bg-accent" aria-hidden="true" />
        </Reveal>

        {intro ? (
          <Reveal delay={0.18}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl">
              {intro}
            </p>
          </Reveal>
        ) : null}

        {actions ? (
          <Reveal delay={0.24}>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              {actions}
            </div>
          </Reveal>
        ) : null}

        {children}
      </Container>

      {tall ? (
        <span
          aria-hidden="true"
          className="label absolute bottom-8 right-6 hidden items-center gap-3 text-steel sm:right-10 sm:flex"
        >
          Scroll
          <span className="block h-10 w-px bg-steel/50" />
        </span>
      ) : null}
    </section>
  );
}

/**
 * Numbered editorial rows. Replaces the icon-card grid — hairline dividers,
 * a leading index, and generous space instead of borders and shadows.
 */
export function NumberedList({
  items,
  tone = "dark",
  startAt = 1,
}: {
  items: { title: string; body: string }[];
  tone?: "dark" | "light";
  startAt?: number;
}) {
  return (
    <ul
      className={cn(
        "border-t",
        tone === "light" ? "hairline-dark" : "hairline",
      )}
    >
      {items.map((item, index) => (
        <li
          key={item.title}
          className={cn(
            "border-b",
            tone === "light" ? "hairline-dark" : "hairline",
          )}
        >
          <Reveal delay={index * 0.04}>
            <div className="grid gap-4 py-9 md:grid-cols-[5rem_1fr_1.15fr] md:gap-10">
              <SectionNumber value={startAt + index} tone={tone} />
              <h3
                className={cn(
                  "font-display text-xl font-bold leading-tight tracking-[-0.03em]",
                  tone === "light" ? "text-white" : "text-ink",
                )}
              >
                {item.title}
              </h3>
              <p
                className={cn(
                  "leading-relaxed",
                  tone === "light" ? "text-mist" : "text-ink-soft",
                )}
              >
                {item.body}
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/** Enormous numbers on near-black. The proof section. */
export function StatBand({
  stats,
}: {
  stats?: { value: number; prefix?: string; suffix?: string; label: string }[];
}) {
  const data = stats ?? [
    { value: site.stats.yearsInBusiness, suffix: "+", label: "Years in business" },
    { value: site.stats.lenders, suffix: "+", label: "National lenders" },
    { value: site.stats.merchants, suffix: "+", label: "Merchants processing" },
    { value: 24, suffix: "hr", label: "To funding" },
  ];

  return (
    <div className="grid border-t hairline-dark sm:grid-cols-2 lg:grid-cols-4">
      {data.map((stat, index) => (
        <div
          key={stat.label}
          className="border-b border-r hairline-dark px-2 py-10 last:border-r-0 sm:px-6 lg:py-14"
        >
          <Reveal delay={index * 0.06}>
            <p className="font-display text-[clamp(2.75rem,5.5vw,4.5rem)] font-extrabold leading-none tracking-[-0.05em] text-white">
              <CountUp to={stat.value} prefix={stat.prefix ?? ""} suffix={stat.suffix ?? ""} />
            </p>
            <p className="label mt-5 text-steel">{stat.label}</p>
          </Reveal>
        </div>
      ))}
    </div>
  );
}

/** Key figures for a service, set as a hairline-ruled row rather than cards. */
export function HighlightRow({
  highlights,
  tone = "light",
}: {
  highlights: { label: string; value: string }[];
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "grid border-t sm:grid-cols-2 lg:grid-cols-4",
        tone === "light" ? "hairline-dark" : "hairline",
      )}
    >
      {highlights.map((item) => (
        <div
          key={item.label}
          className={cn(
            "border-b border-r px-2 py-8 last:border-r-0 sm:px-6",
            tone === "light" ? "hairline-dark" : "hairline",
          )}
        >
          <p className={cn("label", tone === "light" ? "text-steel" : "text-ink-soft")}>
            {item.label}
          </p>
          <p
            className={cn(
              "mt-4 font-display text-2xl font-bold tracking-[-0.03em]",
              tone === "light" ? "text-white" : "text-ink",
            )}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export function FaqSection({
  faqs,
  title = "Questions worth asking",
}: {
  faqs: { q: string; a: string }[];
  title?: string;
}) {
  return (
    <Section tone="paper" id="faq">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[26rem_1fr]">
          <Heading label="FAQ" title={title} className="lg:sticky lg:top-32 lg:self-start" />

          <ul className="border-t hairline">
            {faqs.map((faq, index) => (
              <li key={faq.q} className="border-b hairline">
                <Reveal delay={index * 0.04}>
                  {/*
                    Open by default: the answer is in the DOM for crawlers and
                    screen readers rather than hidden behind an interaction.
                  */}
                  <details open className="py-8">
                    <summary className="cursor-pointer list-none font-display text-xl font-bold tracking-[-0.03em] text-ink marker:hidden">
                      {faq.q}
                    </summary>
                    <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
                      {faq.a}
                    </p>
                  </details>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

export function CtaSection({
  title = "Let's find out what you qualify for",
  body = "Tell us about the business and we will come back within one business day with the programs that actually fit. No obligation, and no effect on anyone's credit to look.",
  cta = "Start the conversation",
}: {
  title?: string;
  body?: string;
  cta?: string;
}) {
  return (
    <Section tone="dark">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <Label tone="light">Get started</Label>
            <h2 className="display mt-8 max-w-3xl text-white">{title}</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-mist">{body}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Magnetic>
                <ButtonLink href="/contact" variant="accent" size="lg">
                  {cta} <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </Magnetic>
              <ButtonLink href="/partners" variant="outlineLight" size="lg">
                Partner program
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Large editorial link row — used for related services, industries, and cities.
 * A ruled list of oversized links reads far more expensive than a card grid.
 */
export function LinkList({
  items,
  tone = "dark",
}: {
  items: { href: string; title: string; meta?: string }[];
  tone?: "dark" | "light";
}) {
  return (
    <ul className={cn("border-t", tone === "light" ? "hairline-dark" : "hairline")}>
      {items.map((item, index) => (
        <li key={item.href} className={cn("border-b", tone === "light" ? "hairline-dark" : "hairline")}>
          <Reveal delay={index * 0.03}>
            <Link
              href={item.href}
              className="group/row flex items-baseline justify-between gap-6 py-7 transition-colors"
            >
              <span
                className={cn(
                  "font-display text-2xl font-bold tracking-[-0.035em] transition-colors sm:text-3xl",
                  tone === "light"
                    ? "text-white group-hover/row:text-accent"
                    : "text-ink group-hover/row:text-accent-ink",
                )}
              >
                {item.title}
              </span>
              <span className="flex shrink-0 items-center gap-5">
                {item.meta ? (
                  <span className={cn("label hidden sm:block", tone === "light" ? "text-steel" : "text-ink-soft")}>
                    {item.meta}
                  </span>
                ) : null}
                <ArrowUpRight
                  className={cn(
                    "h-5 w-5 transition-transform duration-300 group-hover/row:translate-x-1 group-hover/row:-translate-y-1",
                    tone === "light" ? "text-accent" : "text-accent-ink",
                  )}
                />
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/**
 * Asymmetric image + copy block. The workhorse layout that replaces the
 * repeated centred card grids.
 */
export function SplitFeature({
  label,
  title,
  body,
  photo,
  flip = false,
  children,
}: {
  label: string;
  title: string;
  body: React.ReactNode;
  photo: Photo;
  flip?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <Reveal direction={flip ? "right" : "left"} className={flip ? "lg:order-2" : undefined}>
        <Label>{label}</Label>
        <h2 className="display-sm mt-7 text-ink">{title}</h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
          {body}
        </div>
        {children}
      </Reveal>

      <Reveal direction={flip ? "left" : "right"} className={flip ? "lg:order-1" : undefined}>
        <div className="relative aspect-4/5 overflow-hidden bg-graphite sm:aspect-3/2 lg:aspect-4/5">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </div>
  );
}
