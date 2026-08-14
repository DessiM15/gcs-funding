import { Container, Label, Section } from "@/components/ui/primitives";

/**
 * Shared shell for policy pages.
 *
 * These are working drafts written to cover how the site actually behaves. They
 * are not legal advice and should be reviewed by counsel before launch.
 */
export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Section tone="dark" className="grain pb-20 pt-40 sm:pb-24 sm:pt-48">
        <Container>
          <Label tone="light">{eyebrow}</Label>
          <h1 className="display-sm mt-8 max-w-3xl text-white">{title}</h1>
          <span className="mt-9 block h-0.5 w-24 bg-accent" aria-hidden="true" />
          <p className="label mt-8 text-steel">Last updated {updated}</p>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <div className="post-body max-w-3xl">{children}</div>
        </Container>
      </Section>
    </>
  );
}
