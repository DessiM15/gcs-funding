import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { navGroups, footerLegal } from "@/lib/nav";
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
    <footer className="border-t border-ink-100 bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Image
              src="/brand/gcs-logo.png"
              alt="GCS Funding"
              width={540}
              height={340}
              className="h-14 w-auto"
            />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-ink-500">
              A national direct funding source based in Cypress, Texas. Serving
              small and mid-sized businesses across the Houston area since{" "}
              {site.founded}, with a network of more than {site.stats.lenders}{" "}
              national lenders.
            </p>

            {/*
              NAP block. These three values must match the Google Business Profile
              and every citation exactly. The phone is kept here rather than in the
              header per client direction -- present for entity verification, not
              promoted as a contact path.
            */}
            <address className="mt-7 space-y-3 text-[0.925rem] not-italic text-ink-600">
              <span className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </span>
              </span>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 transition-colors hover:text-ink-900"
              >
                <Mail className="h-4 w-4 shrink-0 text-brand-600" />
                {site.email}
              </a>
              <a
                href={`tel:${site.phoneRaw}`}
                className="flex items-center gap-3 transition-colors hover:text-ink-900"
              >
                <Phone className="h-4 w-4 shrink-0 text-brand-600" />
                {site.phone}
              </a>
            </address>

            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GCS Funding on Facebook"
              className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-colors hover:border-azure-500 hover:text-azure-600"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {navGroups.slice(0, 3).map((group) => (
              <div key={group.label}>
                <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-ink-900">
                  {group.label}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.items.slice(0, 7).map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.9rem] text-ink-500 transition-colors hover:text-brand-700"
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

        <div className="mt-14 flex flex-col gap-5 border-t border-ink-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-ink-400">
            &copy; {year} {site.legalName}. {site.address.city},{" "}
            {site.address.state}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLegal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-ink-400 transition-colors hover:text-ink-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 max-w-4xl text-[0.7rem] leading-relaxed text-ink-300">
          GCS Funding, LLC is a lending and payment services broker. All financing
          is subject to credit approval and lender underwriting criteria. Rates,
          terms, approval amounts, and funding times vary by applicant, lender,
          and program, and the figures shown are examples rather than an offer or
          commitment to lend. Surcharge program availability and permitted amounts
          are governed by applicable federal law, state law, and card brand rules.
        </p>
      </div>
    </footer>
  );
}
