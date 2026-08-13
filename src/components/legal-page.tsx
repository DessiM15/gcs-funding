import { Blobs, Breadcrumbs } from "@/components/sections/shared";
import { Container, Eyebrow } from "@/components/ui/primitives";

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
      <section className="relative overflow-hidden pb-8 pt-12">
        <Blobs />
        <Container className="relative">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: title, path: "#" },
            ]}
          />
          <div className="max-w-3xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-6 text-[2.1rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink-900 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-sm text-ink-400">Last updated {updated}</p>
          </div>
        </Container>
      </section>

      <Container className="pb-24">
        <div className="post-body max-w-3xl">{children}</div>
      </Container>
    </>
  );
}
