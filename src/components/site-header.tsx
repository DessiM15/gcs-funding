"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";

import { Logo } from "@/components/logo";
import { buttonClass } from "@/components/ui/primitives";
import { navGroups } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  /**
   * The drawer records the route it was opened on, so navigating closes it
   * without an effect syncing state back to the router.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const menuOpen = openedOn === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /** The logo always returns the visitor to the top of the homepage. */
  const onLogoClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenedOn(null);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled || menuOpen
          ? "border-b border-white/10 bg-void/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-[88rem] items-center justify-between gap-8 px-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-10",
          scrolled || menuOpen ? "h-20" : "h-28 sm:h-32",
        )}
      >
        <Link href="/" onClick={onLogoClick} aria-label="GCS Funding, back to top">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {navGroups.map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => setOpenGroup(group.label)}
              onMouseLeave={() => setOpenGroup(null)}
            >
              <Link
                href={group.href}
                className="label inline-flex items-center py-3 text-white/75 transition-colors hover:text-accent"
              >
                {group.label}
              </Link>

              {openGroup === group.label ? (
                <div className="absolute left-1/2 top-full w-[19rem] -translate-x-1/2 pt-4">
                  <div className="border border-white/10 bg-carbon/95 p-2 backdrop-blur-xl">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group/item block px-4 py-3 transition-colors hover:bg-white/5"
                      >
                        <span className="block text-[0.9rem] font-semibold text-white transition-colors group-hover/item:text-accent">
                          {item.label}
                        </span>
                        {item.description ? (
                          <span className="mt-1 block text-xs leading-snug text-steel">
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
            className="label inline-flex items-center py-3 text-white/75 transition-colors hover:text-accent"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className={buttonClass({
              variant: "accent",
              size: "sm",
              className: "hidden sm:inline-flex",
            })}
          >
            Get Started
          </Link>

          <button
            type="button"
            onClick={() => setOpenedOn(menuOpen ? null : pathname)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-accent hover:text-accent lg:hidden"
          >
            {menuOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="grain max-h-[calc(100svh-5rem)] overflow-y-auto bg-void px-6 pb-16 pt-6 lg:hidden">
          {navGroups.map((group) => (
            <div key={group.label} className="border-b border-white/10 py-6">
              <Link href={group.href} className="label text-steel">
                {group.label}
              </Link>
              <div className="mt-4 grid gap-2.5">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-display text-xl font-bold tracking-[-0.03em] text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link
            href="/about"
            className="block border-b border-white/10 py-6 font-display text-xl font-bold tracking-[-0.03em] text-white"
          >
            About GCS Funding
          </Link>

          <Link
            href="/contact"
            className={buttonClass({ variant: "accent", size: "lg", className: "mt-8 w-full" })}
          >
            Get Started
          </Link>
        </div>
      ) : null}
    </header>
  );
}
