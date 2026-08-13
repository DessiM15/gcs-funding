import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import {
  ButtonLink,
  Card,
  Container,
  Heading,
  Section,
} from "@/components/ui/primitives";
import { site } from "@/lib/site";

/** Soft brand gradient wash. Purely decorative. */
export function Blobs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <div className="blob -left-24 -top-32 h-[26rem] w-[26rem] bg-brand-300/35" />
      <div className="blob -right-20 top-10 h-[22rem] w-[22rem] bg-azure-300/35" />
    </div>
  );
}

export function StatsBand() {
  const stats = [
    { value: site.stats.yearsInBusiness, suffix: "+", label: "Years in business" },
    { value: site.stats.lenders, suffix: "+", label: "National lenders" },
    { value: site.stats.merchants, suffix: "+", label: "Merchants processing" },
    { value: 24, suffix: "hr", label: "Funding turnaround" },
  ];

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink-100 bg-ink-100 sm:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={stat.label} className="bg-white px-5 py-7 text-center">
          <Reveal delay={index * 0.06}>
            <p className="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
              <CountUp to={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1.5 text-[0.8rem] font-medium text-ink-400">
              {stat.label}
            </p>
          </Reveal>
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
    <Section>
      <Container>
        <Heading eyebrow="FAQ" title={title} align="left" />

        <div className="mt-10 divide-y divide-ink-100 border-t border-ink-100">
          {faqs.map((faq, index) => (
            <Reveal key={faq.q} delay={index * 0.04}>
              {/*
                Rendered as open <details> so the answer text is in the DOM for
                crawlers and screen readers, not hidden behind a click.
              */}
              <details open className="group py-6">
                <summary className="cursor-pointer list-none text-lg font-semibold text-ink-900 marker:hidden">
                  {faq.q}
                </summary>
                <p className="mt-3 max-w-3xl leading-relaxed text-ink-500">
                  {faq.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function CtaSection({
  title = "Let's find out what you qualify for",
  body = "Tell us about the business and we will come back within one business day with the programs that actually fit. No obligation, and no effect on anyone's credit to look.",
  cta = "Get started",
}: {
  title?: string;
  body?: string;
  cta?: string;
}) {
  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-ink-100 bg-white px-7 py-16 text-center sm:px-16">
          <Blobs />
          <div className="relative mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-3xl font-bold leading-[1.12] text-ink-900 sm:text-4xl md:text-[2.75rem]">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
                {body}
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href="/contact" variant="brand" size="lg">
                  {cta} <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/partners" variant="outline" size="lg">
                  Explore the partner program
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function FeatureGrid({
  features,
}: {
  features: { title: string; body: string }[];
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {features.map((feature, index) => (
        <Reveal key={feature.title} delay={index * 0.05}>
          <Card className="h-full">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Check className="h-4.5 w-4.5" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-ink-900">
              {feature.title}
            </h3>
            <p className="mt-2.5 leading-relaxed text-ink-500">{feature.body}</p>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}

export function HighlightRow({
  highlights,
}: {
  highlights: { label: string; value: string }[];
}) {
  return (
    <div className="grid gap-px overflow-hidden rounded-3xl border border-ink-100 bg-ink-100 sm:grid-cols-2 lg:grid-cols-4">
      {highlights.map((item) => (
        <div key={item.label} className="bg-white px-6 py-6">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink-400">
            {item.label}
          </p>
          <p className="mt-2 font-display text-xl font-bold text-ink-900">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export function Breadcrumbs({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-7">
      <ol className="flex flex-wrap items-center gap-2 text-[0.8rem] text-ink-400">
        {trail.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {index === trail.length - 1 ? (
              <span className="text-ink-600">{crumb.name}</span>
            ) : (
              <Link
                href={crumb.path}
                className="transition-colors hover:text-brand-700"
              >
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
