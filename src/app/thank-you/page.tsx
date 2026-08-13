import { CheckCircle2 } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Blobs } from "@/components/sections/shared";
import { ButtonLink, Container } from "@/components/ui/primitives";
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
    <section className="relative overflow-hidden py-28">
      <Blobs />
      <Container className="relative">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-azure-500 text-white">
            <CheckCircle2 className="h-7 w-7" />
          </span>

          <h1 className="mt-8 text-[2.2rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink-900 sm:text-5xl">
            Got it. We&apos;re on it.
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-ink-500">
            Your request came through and a confirmation is on its way to your
            inbox. We will come back to you within one business day with the
            programs that fit your business.
          </p>

          <p className="mt-4 text-[0.95rem] text-ink-400">
            If it is urgent, reach us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-brand-700 hover:underline"
            >
              {site.email}
            </a>{" "}
            or{" "}
            <a
              href={`tel:${site.phoneRaw}`}
              className="font-semibold text-brand-700 hover:underline"
            >
              {site.phone}
            </a>
            .
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/" variant="primary" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink href="/blog" variant="outline" size="lg">
              Read our guides
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
