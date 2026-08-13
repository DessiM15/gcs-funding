"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { navGroups } from "@/lib/nav";
import { buttonClass } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  /**
   * The drawer records which route it was opened on rather than a plain boolean.
   * Navigating changes the pathname, which closes it automatically -- no effect
   * syncing state to the router, and no chance of a drawer surviving a route change.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const mobileOpen = openedOn === pathname;
  const setMobileOpen = (open: boolean) => setOpenedOn(open ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /**
   * Clicking the logo always returns the visitor to the top of the homepage --
   * from any other page it navigates home, and from the homepage it scrolls up
   * rather than behaving like a dead link.
   */
  const onLogoClick = (event: React.MouseEvent) => {
    if (pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      event.preventDefault();
      router.push("/");
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled
          ? "border-b border-ink-100/80 bg-canvas/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          onClick={onLogoClick}
          aria-label="GCS Funding, back to top"
          className="shrink-0"
        >
          <Image
            src="/brand/gcs-logo.png"
            alt="GCS Funding"
            width={540}
            height={340}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navGroups.map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => setOpenGroup(group.label)}
              onMouseLeave={() => setOpenGroup(null)}
            >
              <Link
                href={group.href}
                className="flex items-center gap-1 rounded-full px-4 py-2 text-[0.925rem] font-medium text-ink-700 transition-colors hover:bg-ink-50 hover:text-ink-900"
                aria-expanded={openGroup === group.label}
              >
                {group.label}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    openGroup === group.label && "rotate-180",
                  )}
                />
              </Link>

              {openGroup === group.label ? (
                <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3">
                  <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white p-2 shadow-[0_24px_60px_-24px_rgb(11_18_32/0.3)]">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-brand-50"
                      >
                        <span className="block text-[0.9rem] font-semibold text-ink-900">
                          {item.label}
                        </span>
                        {item.description ? (
                          <span className="mt-0.5 block text-xs leading-snug text-ink-400">
                            {item.description}
                          </span>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}

          <Link
            href="/about"
            className="rounded-full px-4 py-2 text-[0.925rem] font-medium text-ink-700 transition-colors hover:bg-ink-50 hover:text-ink-900"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={buttonClass({
              variant: "brand",
              size: "sm",
              className: "hidden sm:inline-flex",
            })}
          >
            Get Started
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-900 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-ink-100 bg-canvas px-5 pb-10 pt-4 lg:hidden">
          {navGroups.map((group) => (
            <div key={group.label} className="border-b border-ink-100 py-4">
              <Link
                href={group.href}
                className="text-sm font-bold uppercase tracking-[0.12em] text-ink-400"
              >
                {group.label}
              </Link>
              <div className="mt-3 grid gap-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg py-2 text-[1.05rem] font-medium text-ink-900"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link
            href="/about"
            className="block border-b border-ink-100 py-4 text-[1.05rem] font-medium text-ink-900"
          >
            About GCS Funding
          </Link>

          <Link
            href="/contact"
            className={buttonClass({
              variant: "brand",
              size: "lg",
              className: "mt-6 w-full",
            })}
          >
            Get Started
          </Link>
        </div>
      ) : null}
    </header>
  );
}
