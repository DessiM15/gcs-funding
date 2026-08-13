import { LegalPage } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Cookie Policy | GCS Funding",
  description:
    "What gcsfunding.com stores in your browser, why, and how to control it. We do not use advertising or cross-site tracking cookies.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Cookie Policy" updated="August 2026">
      <p>
        This site is deliberately light on browser storage. We do not use
        advertising cookies and we do not track you across other websites.
      </p>

      <h2>What we store</h2>
      <ul>
        <li>
          <strong>Session storage.</strong> A single flag recording that you have
          already seen the brief intro animation, so it does not replay on every
          page. It is cleared when you close the tab and contains no personal
          information.
        </li>
        <li>
          <strong>Analytics.</strong> If site analytics are enabled, they may set a
          cookie to measure aggregate traffic, such as which pages are read and how
          visitors arrive. This is used to improve the site, not to build an
          advertising profile.
        </li>
      </ul>

      <h2>What we do not do</h2>
      <p>
        No advertising cookies, no cross-site tracking, no selling or sharing of
        browsing data. Fonts are self-hosted, so loading a page does not send a
        request to a third-party font provider.
      </p>

      <h2>Controlling storage</h2>
      <p>
        Every major browser lets you block or clear cookies and site data in its
        settings. Blocking storage will not prevent you from using this site.
      </p>

      <h2>Questions</h2>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
