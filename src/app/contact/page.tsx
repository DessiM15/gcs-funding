import { Clock, Mail, MapPin, ShieldCheck } from "lucide-react";

import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/motion/reveal";
import { Blobs, Breadcrumbs } from "@/components/sections/shared";
import { Container, Eyebrow } from "@/components/ui/primitives";
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
    body: "Every enquiry goes straight to us. No queue, no call center, no chatbot in between.",
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

      <section className="relative overflow-hidden pb-24 pt-12">
        <Blobs />
        <Container className="relative">
          <Breadcrumbs trail={trail} />

          <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <Reveal>
                <Eyebrow>Get started</Eyebrow>
                <h1 className="mt-6 text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-5xl">
                  Tell us about the business
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-ink-500">
                  Three quick questions so we know which programs are actually
                  worth putting in front of you. It takes about a minute.
                </p>
              </Reveal>

              <div className="mt-10 space-y-4">
                {ASSURANCES.map((item, index) => (
                  <Reveal key={item.title} delay={index * 0.07}>
                    <div className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                        <item.icon className="h-4.5 w-4.5" />
                      </span>
                      <span>
                        <span className="block font-semibold text-ink-900">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-ink-500">
                          {item.body}
                        </span>
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.25}>
                <div className="mt-10 rounded-2xl border border-ink-100 bg-white p-6">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-400">
                    GCS Funding, LLC
                  </p>
                  <address className="mt-3 space-y-2 text-[0.95rem] not-italic text-ink-600">
                    <span className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      <span>
                        {site.address.street}
                        <br />
                        {site.address.city}, {site.address.state}{" "}
                        {site.address.zip}
                      </span>
                    </span>
                    <a
                      href={`mailto:${site.email}`}
                      className="flex items-center gap-3 hover:text-ink-900"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-brand-600" />
                      {site.email}
                    </a>
                  </address>
                </div>
              </Reveal>
            </div>

            <Reveal direction="right">
              <div className="rounded-[2rem] border border-ink-100 bg-white p-7 shadow-[0_24px_60px_-40px_rgb(11_18_32/0.4)] sm:p-9">
                <LeadForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
