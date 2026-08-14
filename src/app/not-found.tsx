import { ButtonLink, Container, Label, Section } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Section tone="dark" className="grain flex min-h-[80svh] items-center pt-40">
      <Container>
        <div className="max-w-3xl">
          <Label tone="light">Error 404</Label>
          <h1 className="display mt-8 text-white">
            We could not
            {" "}
            <br className="hidden sm:inline" />
            find that page
          </h1>
          <span className="mt-10 block h-0.5 w-28 bg-accent" aria-hidden="true" />
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-mist">
            The link may be out of date. Everything from the old site has a new home
            here, so try one of these instead.
          </p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/" variant="accent" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink href="/partners" variant="outlineLight" size="lg">
              Partner program
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
