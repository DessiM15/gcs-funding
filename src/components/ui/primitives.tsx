import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[88rem] px-6 sm:px-10", className)}>
      {children}
    </div>
  );
}

/**
 * Section shell. `tone` sets the ground; dark sections carry the grain layer.
 */
export function Section({
  className,
  children,
  id,
  tone = "light",
  rail,
}: {
  className?: string;
  children: ReactNode;
  id?: string;
  tone?: "light" | "paper" | "dark";
  /** Registers this section with the scroll-spy rail under the given label. */
  rail?: string;
}) {
  const tones = {
    light: "bg-bone text-ink",
    paper: "bg-paper text-ink",
    dark: "bg-void text-white grain",
  } as const;

  return (
    <section
      id={id}
      data-rail={rail}
      className={cn("relative py-24 sm:py-32", tones[tone], className)}
    >
      {children}
    </section>
  );
}

/** Uppercase tracked micro-label with a leading accent tick. */
export function Label({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "label inline-flex items-center gap-3",
        tone === "light" ? "text-mist" : "text-ink-soft",
        className,
      )}
    >
      <span className="h-px w-8 bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}

/** The 01 / 02 / 03 markers that replace icon cards. */
export function SectionNumber({
  value,
  tone = "dark",
}: {
  value: number;
  tone?: "dark" | "light";
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "font-display text-[0.8rem] font-bold tracking-[0.2em]",
        tone === "light" ? "text-accent" : "text-accent-ink",
      )}
    >
      {String(value).padStart(2, "0")}
    </span>
  );
}

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 font-semibold uppercase tracking-[0.12em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-50";

const variants = {
  accent:
    "bg-accent text-void hover:bg-white",
  solid:
    "bg-ink text-white hover:bg-accent hover:text-void",
  outline:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white",
  outlineLight:
    "border border-white/30 text-white hover:border-white hover:bg-white hover:text-void",
  bare: "text-ink hover:text-accent-ink",
} as const;

const sizes = {
  sm: "h-10 px-5 text-[0.7rem]",
  md: "h-12 px-7 text-[0.72rem]",
  lg: "h-14 px-9 text-[0.75rem]",
} as const;

type StyleProps = { variant?: keyof typeof variants; size?: keyof typeof sizes };

export function buttonClass({
  variant = "accent",
  size = "md",
  className,
}: StyleProps & { className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: StyleProps & ComponentProps<typeof Link>) {
  return <Link className={buttonClass({ variant, size, className })} {...props} />;
}

export function Button({
  variant,
  size,
  className,
  ...props
}: StyleProps & ComponentProps<"button">) {
  return <button className={buttonClass({ variant, size, className })} {...props} />;
}

/**
 * Section heading. Always left-aligned — centred headings were the single
 * biggest reason the earlier design read as a template.
 */
export function Heading({
  label,
  title,
  intro,
  tone = "dark",
  className,
}: {
  label?: string;
  title: ReactNode;
  intro?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {label ? <Label tone={tone}>{label}</Label> : null}
      <h2
        className={cn(
          "display-sm mt-7",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            "mt-7 max-w-2xl text-lg leading-relaxed",
            tone === "light" ? "text-mist" : "text-ink-soft",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
