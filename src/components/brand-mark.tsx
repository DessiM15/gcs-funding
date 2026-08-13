import { cn } from "@/lib/utils";

/**
 * Vector rebuild of the GCS diamond so it stays crisp at any size and can be
 * animated (the loader draws it stroke-first). The raster logo in
 * /public/brand is still used wherever the full lockup is required.
 */
export function BrandMark({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
    >
      <g transform="rotate(45 60 60)">
        <rect
          x="18"
          y="18"
          width="72"
          height="72"
          rx="12"
          stroke="var(--color-logo-green)"
          strokeWidth="13"
          className={animated ? "brand-mark-stroke" : undefined}
        />
        <rect
          x="30"
          y="30"
          width="72"
          height="72"
          rx="12"
          stroke="var(--color-logo-blue)"
          strokeWidth="13"
          className={animated ? "brand-mark-stroke brand-mark-stroke-2" : undefined}
        />
      </g>
    </svg>
  );
}
