import { FinancingImpactCalculator } from "@/components/calculators";
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
  title: "Customer Financing ROI Calculator for Contractors | GCS Funding",
  description:
    "See what offering customer financing would do to your revenue. Model close rate and average ticket lift for contractors, practices, and retailers. Free calculator.",
  path: "/resources/financing-impact-calculator",
});

const FAQS = [
  {
    q: "Why would offering financing raise my average ticket?",
    a: "Because the buyer stops evaluating a lump sum and starts evaluating a monthly payment. The difference between a good system and a better one, or a base package and the full scope, is often small per month and large in total. That is where upgrades survive instead of getting cut.",
  },
  {
    q: "What close rate lift is realistic?",
    a: "It depends entirely on how many of your lost deals were lost on price rather than on fit, timing, or trust. Set the slider using your own experience. If you rarely lose on price, keep it low. If you hear 'we need to think about the cost' constantly, it is higher than you would guess.",
  },
  {
    q: "What does the program cost my business?",
    a: "No setup fee, no application fee, no monthly fee, and no equipment to buy or lease. You pay a discount fee only on funded transactions, quoted against the promotional terms you want to offer.",
  },
];

export default function FinancingImpactCalculatorPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    {
      name: "Financing Impact Calculator",
      path: "/resources/financing-impact-calculator",
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
                What would financing be worth to your business?
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-500">
                Two things change when you offer financing at the point of sale:
                you close deals that price would have killed, and the jobs you do
                close get bigger. Put your own numbers in and see what that adds up
                to over a year.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-14">
            <FinancingImpactCalculator />
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={FAQS} title="About the assumptions" />
      <CtaSection
        title="Turn the model into a real program"
        body="Tell us your industry and average ticket and we will come back within one business day with the promotional terms and lender mix that fit."
        cta="Become a partner"
      />
    </>
  );
}
