"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Thin top-of-page progress bar for internal navigation.
 *
 * The App Router gives no global navigation events, so we start the bar on any
 * same-origin link click and finish it when the pathname actually changes.
 */
export function NavProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const previous = useRef(pathname);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey) return;

      const anchor = (event.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href?.startsWith("/") || anchor.target === "_blank") return;
      if (href === window.location.pathname) return;

      setActive(true);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;

    const done = window.setTimeout(() => setActive(false), 220);
    return () => window.clearTimeout(done);
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-0.5"
    >
      <div
        data-active={active || undefined}
        className="h-full w-full origin-left scale-x-0 bg-accent opacity-0 transition-[transform,opacity] duration-500 ease-out data-active:scale-x-100 data-active:opacity-100"
      />
    </div>
  );
}
