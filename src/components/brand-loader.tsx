"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "@/components/brand-mark";

const MAX_DURATION = 700;
const SESSION_KEY = "gcs-intro-seen";

/**
 * First-visit brand moment.
 *
 * Deliberately constrained so it can never become a performance problem:
 *  - shows once per browser session, never on refresh or internal navigation
 *  - hard-capped at 700ms, and exits early once the document is ready
 *  - skipped entirely when the visitor prefers reduced motion
 *
 * The page content renders underneath the whole time, so the overlay only
 * delays the paint, never the parse or the crawl.
 */
export function BrandLoader() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, "1");

    /*
     * Deliberate setState-in-effect. Whether to show the intro depends on
     * sessionStorage and matchMedia, neither of which exists during SSR, so the
     * decision cannot be made in a state initializer without a hydration
     * mismatch. Running once on mount is the correct behaviour here.
     */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    document.documentElement.style.overflow = "hidden";

    const dismiss = () => {
      setLeaving(true);
      document.documentElement.style.overflow = "";
      window.setTimeout(() => setVisible(false), 420);
    };

    const cap = window.setTimeout(dismiss, MAX_DURATION);

    return () => {
      window.clearTimeout(cap);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      data-leaving={leaving || undefined}
      className="grain fixed inset-0 z-[100] flex items-center justify-center bg-void transition-opacity duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] data-leaving:pointer-events-none data-leaving:opacity-0"
    >
      <div className="relative flex flex-col items-center">
        <BrandMark animated className="h-16 w-16" />
        <span className="intro-rule mt-7 block h-px w-40 bg-accent" />
        <span className="intro-fade mt-5 text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-steel">
          Securing Funding Options
        </span>
      </div>
    </div>
  );
}
