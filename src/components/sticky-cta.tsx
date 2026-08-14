"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { buttonClass } from "@/components/ui/primitives";

/**
 * Mobile-only conversion bar. Appears once the visitor has scrolled past the
 * hero, and stays out of the way on the pages that already are the conversion.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contact" || pathname === "/thank-you") return null;

  return (
    <div
      data-visible={visible || undefined}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 translate-y-full border-t border-white/10 bg-void/90 p-4 backdrop-blur-xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] data-visible:pointer-events-auto data-visible:translate-y-0 lg:hidden"
    >
      <Link
        href="/contact"
        className={buttonClass({ variant: "accent", size: "lg", className: "w-full" })}
      >
        Get Started <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
