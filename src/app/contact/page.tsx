import { Clock, Mail, MapPin, ShieldCheck } from "lucide-react";

import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/motion/reveal";
import { Container, Label, Section } from "@/components/ui/primitives";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact GCS Funding | Houston Business Funding & Financing",
  description:
    "Tell us about your business and we will come back within one business day with the funding, financing, or processing program that fits. Serving the Houston area since 2003.",
  path: "/contact",
});

const ASSURANCES = [
  {
    icon: Clock,
    title: "A reply within one business day",
    body: "Every enquiry comes straight to us. No queue, no call centre, no chatbot in between.",
  },
  {
    icon: ShieldCheck,
    title: "Looking costs you nothing",
    body: "This is not a credit application. Consumer financing offers are returned on a soft pull, with no effect on anyone's score.",
  },
  {
    icon: Mail,
    title: "Everything in writing",
    body: "We work by email so you have the programs, terms, and numbers in front of you to compare properly.",
  },
];

export default function ContactPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <JsonLd schemas={[breadcrumbSchema(trail)]} />

      {/* The form is the conversion, so it opens the page rather than sitting
          below a hero image. Dark ground keeps it consistent with every other
          page opening. */}
      <Section tone="dark" className="grain pb-24 pt-40 sm:pb-32 sm:pt-48">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
            <div>
              <Reveal>
                <Label tone="light">Get started</Label>
                <h1 className="display mt-8 text-white">
                  Tell us about
                  {" "}
            <br className="hidden sm:inline" />
                  the business
                </h1>
                <span className="mt-10 block h-0.5 w-28 bg-accent" aria-hidden="true" />
                <p className="mt-10 max-w-lg text-lg leading-relaxed text-mist">
                  Three quick questions so we know which programs are actually worth
                  putting in front of you. It takes about a minute.
                </p>
              </Reveal>

              <ul className="mt-14 border-t hairline-dark">
                {ASSURANCES.map((item, index) => (
                  <li key={item.title} className="border-b hairline-dark">
                    <Reveal delay={index * 0.07}>
                      <div className="flex gap-6 py-7">
                        <item.icon className="mt-1 h-5 w-5 shrink-0 text-accent" />
                        <span>
                          <span className="block font-display text-lg font-bold tracking-[-0.03em] text-white">
                            {item.title}
                          </span>
                          <span className="mt-2 block leading-relaxed text-steel">
                            {item.body}
                          </span>
                        </span>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>

              <Reveal delay={0.25}>
                <address className="mt-12 space-y-4 not-italic text-mist">
                  <span className="flex items-start gap-4">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <span className="leading-relaxed">
                      {site.legalName}
                      {" "}
            <br className="hidden sm:inline" />
                      {site.address.street}
                      {" "}
            <br className="hidden sm:inline" />
                      {site.address.city}, {site.address.state} {site.address.zip}
                    </span>
                  </span>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-4 transition-colors hover:text-accent"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-accent" />
                    {site.email}
                  </a>
                </address>
              </Reveal>
            </div>

            <Reveal direction="right">
              <div className="bg-paper p-7 sm:p-10">
                <LeadForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
