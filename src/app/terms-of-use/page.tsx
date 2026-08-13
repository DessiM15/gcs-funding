import { LegalPage } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms of Use | GCS Funding",
  description:
    "The terms that govern your use of gcsfunding.com, including the scope of information provided and the limits of what appears on this site.",
  path: "/terms-of-use",
});

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Use" updated="August 2026">
      <p>
        By using gcsfunding.com you agree to these terms. If you do not agree,
        please do not use the site.
      </p>

      <h2>What this site is</h2>
      <p>
        {site.legalName} is a lending and payment services broker. This site
        describes programs we can arrange through our lender and processor
        network. It is informational.
      </p>

      <h2>Not an offer of credit</h2>
      <p>
        Nothing on this site is an offer or commitment to lend, or an offer of
        specific terms. All financing is subject to application, credit approval,
        and the underwriting criteria of the applicable lender. Rates, terms,
        approval amounts, qualification thresholds, and funding times vary by
        applicant, lender, program, and asset. Figures shown are examples used to
        illustrate how a program works.
      </p>

      <h2>Calculators and estimates</h2>
      <p>
        The calculators on this site produce estimates from the values you enter,
        using simplified assumptions. They are planning tools, not quotes. Actual
        processing costs depend on your card mix, ticket sizes, and interchange;
        actual financing outcomes depend on approval and on your own business.
      </p>

      <h2>Surcharge compliance</h2>
      <p>
        Surcharge program availability, permitted amounts, and disclosure
        requirements are governed by federal law, applicable state law, and card
        brand rules, and these change. Information here is general and is not legal
        advice. Merchants are responsible for compliance in their own operation.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not use this site unlawfully, attempt to gain unauthorised access to it,
        interfere with its operation, or submit false information or another
        person&rsquo;s information through our forms.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The content, design, and marks on this site belong to {site.legalName} or
        its licensors and may not be reproduced without permission. If you believe
        material here infringes your copyright, contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> with enough detail to
        identify the work and the material, and we will respond promptly.
      </p>

      <h2>Third-party links</h2>
      <p>
        We are not responsible for the content or practices of sites we link to.
      </p>

      <h2>Disclaimer and limitation of liability</h2>
      <p>
        The site is provided on an &ldquo;as is&rdquo; basis without warranties of
        any kind, to the fullest extent permitted by law. To the fullest extent
        permitted by law, {site.legalName} is not liable for indirect, incidental,
        or consequential damages arising from your use of this site.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of Texas.</p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </LegalPage>
  );
}
