import { Blobs } from "@/components/sections/shared";
import { ButtonLink, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-28">
      <Blobs />
      <Container className="relative">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-6xl font-extrabold text-gradient">404</p>
          <h1 className="mt-6 text-3xl font-extrabold tracking-[-0.02em] text-ink-900 sm:text-4xl">
            We could not find that page
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-500">
            The link may be out of date. Everything on the old site has a new home
            here, so try one of these instead.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/" variant="primary" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink href="/partners" variant="outline" size="lg">
              Partner program
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
