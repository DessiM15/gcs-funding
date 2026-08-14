import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/logo";
import { Container } from "@/components/ui/primitives";
import { footerLegal, navGroups } from "@/lib/nav";
import { site } from "@/lib/site";

/** Inline mark: lucide-react no longer ships brand logos. */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative bg-void pt-20 text-white">
      <Container>
        <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />
            <p className="mt-8 max-w-sm leading-relaxed text-steel">
              A national direct funding source in Cypress, Texas. Serving small
              and mid-sized businesses across the Houston area since {site.founded},
              with a network of more than {site.stats.lenders} national lenders.
            </p>

            {/*
              NAP block. These values must match the Google Business Profile and
              every citation exactly. The phone sits here rather than in the
              header per client direction — present so Google can verify the
              entity, not promoted as a contact path.
            */}
            <address className="mt-10 space-y-4 not-italic text-mist">
              <span className="flex items-start gap-4">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-accent" />
                <span className="leading-relaxed">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </span>
              </span>
              <a href={`mailto:${site.email}`} className="flex items-center gap-4 transition-colors hover:text-accent">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                {site.email}
              </a>
              <a href={`tel:${site.phoneRaw}`} className="flex items-center gap-4 transition-colors hover:text-accent">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                {site.phone}
              </a>
            </address>

            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GCS Funding on Facebook"
              className="mt-9 inline-flex h-11 w-11 items-center justify-center border border-white/20 text-mist transition-colors hover:border-accent hover:text-accent"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-12 sm:grid-cols-3">
            {navGroups.slice(0, 3).map((group) => (
              <div key={group.label}>
                <h2 className="label text-accent">{group.label}</h2>
                <ul className="mt-6 space-y-3">
                  {group.items.slice(0, 7).map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.925rem] text-steel transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-steel">
            &copy; {year} {site.legalName} &middot; {site.address.city}, {site.address.state}
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {footerLegal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="label text-steel transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="max-w-4xl pb-14 text-[0.7rem] leading-relaxed text-steel/70">
          GCS Funding, LLC is a lending and payment services broker. All financing
          is subject to credit approval and lender underwriting criteria. Rates,
          terms, approval amounts, and funding times vary by applicant, lender, and
          program, and the figures shown are examples rather than an offer or
          commitment to lend. Surcharge program availability and permitted amounts
          are governed by applicable federal law, state law, and card brand rules.
        </p>
      </Container>
    </footer>
  );
}
