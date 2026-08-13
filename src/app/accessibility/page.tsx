import { LegalPage } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Accessibility | GCS Funding",
  description:
    "How gcsfunding.com is built for accessibility, the standards we target, and how to tell us if something on the site does not work for you.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <LegalPage eyebrow="Commitment" title="Accessibility" updated="August 2026">
      <p>
        We want every business owner to be able to use this site, and we treat
        accessibility as part of building it rather than something bolted on
        afterwards.
      </p>

      <h2>What we target</h2>
      <p>
        We build against the Web Content Accessibility Guidelines (WCAG) 2.1 at
        Level AA.
      </p>

      <h2>What that means here</h2>
      <ul>
        <li>Semantic headings and landmarks, with a skip-to-content link</li>
        <li>Every interactive element reachable and operable by keyboard, with a visible focus ring</li>
        <li>Text and interface colours checked for contrast against their backgrounds</li>
        <li>Form fields with real labels, and errors announced rather than shown by colour alone</li>
        <li>Animation that respects the operating system&rsquo;s reduce-motion setting, including skipping the intro entirely</li>
        <li>FAQ answers rendered in the page rather than hidden behind a control</li>
      </ul>

      <h2>Tell us if something does not work</h2>
      <p>
        If any part of this site is difficult to use, we want to hear about it,
        and we will fix it. Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> with the page and what
        happened, and we will respond within one business day.
      </p>

      <p>
        If you cannot use the form on this site for any reason, contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or{" "}
        <a href={`tel:${site.phoneRaw}`}>{site.phone}</a> and we will help you
        directly.
      </p>
    </LegalPage>
  );
}
