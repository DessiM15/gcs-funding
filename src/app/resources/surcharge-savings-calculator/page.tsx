import { SurchargeCalculator } from "@/components/calculators";
import { Reveal } from "@/components/motion/reveal";
import {
  Blobs,
  Breadcrumbs,
  CtaSection,
  FaqSection,
} from "@/components/sections/shared";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Credit Card Surcharge Savings Calculator | GCS Funding",
  description:
    "Estimate what credit card processing costs your business each year, and how much a compliant surcharge program would recover. Free calculator from GCS Funding.",
  path: "/resources/surcharge-savings-calculator",
});

const FAQS = [
  {
    q: "How do I find my effective processing rate?",
    a: "Take the total fees on your monthly statement and divide them by your total processed volume. That number is almost always higher than the rate you were quoted, because the quote usually covers only one part of the cost.",
  },
  {
    q: "Why does the calculator ask what share is credit versus debit?",
    a: "Debit transactions cannot be surcharged. Only credit card volume can carry a program fee, so the split materially changes what a surcharge program recovers.",
  },
  {
    q: "Is surcharging allowed in Texas?",
    a: "Yes, subject to the rules: the merchant must be registered with the card brands, must disclose the fee with proper signage, the fee must not exceed 4% and must not profit the merchant, and the fee must be processed with the sale as one transaction. Our terminals apply the fee only to eligible transactions.",
  },
];

export default function SurchargeCalculatorPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    {
      name: "Surcharge Savings Calculator",
      path: "/resources/surcharge-savings-calculator",
    },
  ];

  return (
    <>
      <JsonLd schemas={[faqSchema(FAQS), breadcrumbSchema(trail)]} />

      <section className="relative overflow-hidden pb-16 pt-12">
        <Blobs />
        <Container className="relative">
          <Breadcrumbs trail={trail} />

          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Free tool</Eyebrow>
              <h1 className="mt-6 text-[2.2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-5xl">
                What are card fees actually costing you?
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-500">
                Most merchants know their quoted rate and have never worked out
                their effective one. Move the sliders to see what processing takes
                out of the business each year, and what a compliant surcharge
                program would put back.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-14">
            <SurchargeCalculator />
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={FAQS} title="How to read the numbers" />
      <CtaSection
        title="Send us a statement and we'll do it properly"
        body="A calculator gets you the shape of the answer. A real statement review gets you the number, including your interchange mix and what your business would actually keep."
        cta="Request a statement review"
      />
    </>
  );
}
