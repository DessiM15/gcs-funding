import { Reveal } from "@/components/motion/reveal";
import { ButtonLink, Container, Label, Section } from "@/components/ui/primitives";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

// Conversion confirmation, deliberately kept out of the index.
export const metadata = buildMetadata({
  title: "Thank you | GCS Funding",
  description: "Your request has been received.",
  path: "/thank-you",
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <Section tone="dark" className="grain flex min-h-[80svh] items-center pt-40">
      <Container>
        <Reveal className="max-w-3xl">
          <Label tone="light">Received</Label>
          <h1 className="display mt-8 text-white">
            Got it.
            {" "}
            <br className="hidden sm:inline" />
            <span className="text-accent">We&apos;re on it.</span>
          </h1>
          <span className="mt-10 block h-0.5 w-28 bg-accent" aria-hidden="true" />

          <p className="mt-10 max-w-xl text-lg leading-relaxed text-mist">
            Your request came through and a confirmation is on its way to your inbox.
            We will come back to you within one business day with the programs that
            fit your business.
          </p>

          <p className="mt-6 text-mist">
            If it is urgent, reach us at{" "}
            <a href={`mailto:${site.email}`} className="text-accent hover:underline">
              {site.email}
            </a>{" "}
            or{" "}
            <a href={`tel:${site.phoneRaw}`} className="text-accent hover:underline">
              {site.phone}
            </a>
            .
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/" variant="accent" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink href="/blog" variant="outlineLight" size="lg">
              Read our guides
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
