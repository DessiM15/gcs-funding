import { LegalPage } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy | GCS Funding",
  description:
    "How GCS Funding collects, uses, and protects the information you submit through gcsfunding.com, including your rights under Texas and California privacy law.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="August 2026">
      <p>
        This policy explains what {site.legalName} collects when you use
        gcsfunding.com, why we collect it, and what control you have over it.
      </p>

      <h2>What we collect</h2>
      <p>
        We collect only what you give us. When you submit the enquiry form, that
        is your name, business name, email address, an optional phone number, the
        qualifying details you select (such as industry, average ticket, monthly
        card volume, revenue, or time in business), and any message you write.
      </p>
      <p>
        Our server logs the IP address a submission comes from. We use it solely
        to rate-limit the form and reduce automated abuse.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your enquiry and present relevant funding, financing, or processing programs</li>
        <li>To send you a confirmation that we received your request</li>
        <li>To submit an application to lenders or processors, only when you ask us to</li>
        <li>To prevent spam and abuse of the form</li>
      </ul>
      <p>
        <strong>We do not sell your personal information.</strong> We do not share
        it with third parties for their own marketing.
      </p>

      <h2>Who we share it with</h2>
      <p>
        We share information with service providers who help us operate: our email
        delivery provider, which transmits your submission and confirmation, and
        our hosting provider. When you ask us to pursue a specific program, we
        share the information necessary to submit that application to the relevant
        lender or processor, and their own privacy terms then also apply.
      </p>
      <p>
        We may disclose information where required by law or to protect our legal
        rights.
      </p>

      <h2>Credit inquiries</h2>
      <p>
        Submitting the form on this site is not an application for credit and does
        not authorise a credit inquiry. Where a program uses a soft credit pull to
        return offers, that pull does not affect a credit score. A hard inquiry
        occurs only after an applicant selects and accepts a specific offer.
      </p>

      <h2>Retention</h2>
      <p>
        We keep enquiry records for as long as needed to serve you and to meet
        record-keeping obligations. You can ask us to delete yours at any time.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to know what personal
        information we hold about you, request a copy, request correction or
        deletion, and opt out of sale or sharing. We do not sell or share personal
        information as those terms are defined under the California Consumer
        Privacy Act, and Texas residents have comparable rights under the Texas
        Data Privacy and Security Act.
      </p>
      <p>
        To exercise any of these, email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. We will not discriminate
        against you for making a request.
      </p>

      <h2>Security</h2>
      <p>
        The site is served over HTTPS and form submissions are transmitted
        encrypted. No method of transmission or storage is completely secure, and
        we cannot guarantee absolute security.
      </p>

      <h2>Children</h2>
      <p>
        This site is intended for business use and is not directed to anyone under
        18. We do not knowingly collect information from children.
      </p>

      <h2>Changes</h2>
      <p>
        We will update this page when our practices change, and revise the date at
        the top.
      </p>

      <h2>Contact</h2>
      <p>
        {site.legalName}
        <br />
        {site.address.street}
        <br />
        {site.address.city}, {site.address.state} {site.address.zip}
        <br />
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </LegalPage>
  );
}
