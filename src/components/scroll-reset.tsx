"use client";

import { useEffect } from "react";

/**
 * Browsers restore the previous scroll offset on reload, which drops a returning
 * visitor into the middle of a page with no context. Client direction is that a
 * refresh should always land at the top, so we take manual control.
 *
 * Next's App Router already scrolls to top on route changes, so this only needs
 * to cover the initial load / reload case.
 */
export function ScrollReset() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Skip the reset when the URL targets an anchor, so shared deep links work.
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
