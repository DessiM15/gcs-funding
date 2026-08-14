import { BrandMark } from "@/components/brand-mark";
import { cn } from "@/lib/utils";

/**
 * Lockup: the vector diamond plus a set wordmark.
 *
 * The supplied raster logo has near-black lettering, which disappears on the
 * dark grounds this site uses. Rebuilding the wordmark in type keeps the mark's
 * colour intact, stays crisp at any size, and reads sharper than a PNG.
 */
export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <BrandMark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.05rem] font-extrabold tracking-[-0.02em]",
            tone === "light" ? "text-white" : "text-ink",
          )}
        >
          GCS FUNDING
        </span>
        <span
          className={cn(
            "mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.28em]",
            tone === "light" ? "text-steel" : "text-ink-soft",
          )}
        >
          Securing Funding Options
        </span>
      </span>
    </span>
  );
}
