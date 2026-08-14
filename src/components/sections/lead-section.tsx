import { Clock, Mail, ShieldCheck } from "lucide-react";

import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/motion/reveal";
import { Container, Label, Section } from "@/components/ui/primitives";
import type { LeadPath } from "@/lib/lead-schema";

const ASSURANCES = [
  { icon: Clock, text: "A reply within one business day, straight from us." },
  { icon: ShieldCheck, text: "Not a credit application. Looking affects nobody's score." },
  { icon: Mail, text: "Everything in writing, so you can compare it properly." },
];

/**
 * The enquiry form embedded directly in the page rather than sitting behind a
 * call to action. The first step is itself a qualifying question, so putting it
 * inline means the visitor starts answering before deciding to "get in touch" —
 * which removes the navigation step where most of the drop-off happened.
 */
export function LeadSection({
  id = "get-started",
  label = "Get started",
  title = "Tell us about the business",
  body = "Three quick questions so we know which programs are worth putting in front of you. It takes about a minute, and there is nothing to sign.",
  defaultPath,
  defaultIndustry,
}: {
  id?: string;
  label?: string;
  title: string;
  body?: string;
  defaultPath?: LeadPath;
  defaultIndustry?: string;
}) {
  return (
    <Section tone="dark" id={id} rail="Get started">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <Reveal>
              <Label tone="light">{label}</Label>
              <h2 className="display-sm mt-8 text-white">{title}</h2>
              <span className="mt-9 block h-0.5 w-24 bg-accent" aria-hidden="true" />
              <p className="mt-9 max-w-lg text-lg leading-relaxed text-mist">
                {body}
              </p>
            </Reveal>

            <ul className="mt-12 border-t hairline-dark">
              {ASSURANCES.map((item, index) => (
                <li key={item.text} className="border-b hairline-dark">
                  <Reveal delay={index * 0.06}>
                    <div className="flex items-start gap-5 py-5">
                      <item.icon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent" />
                      <span className="leading-relaxed text-steel">{item.text}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <Reveal direction="right">
            <div className="bg-paper p-7 sm:p-10">
              <LeadForm defaultPath={defaultPath} defaultIndustry={defaultIndustry} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
