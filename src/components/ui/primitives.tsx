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
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  id,
}: {
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
      {children}
    </span>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants = {
  primary:
    "bg-ink-900 text-white shadow-[0_8px_24px_-8px_rgb(11_18_32/0.5)] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-10px_rgb(11_18_32/0.55)]",
  brand:
    "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-[0_8px_24px_-8px_rgb(88_148_31/0.6)] hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-10px_rgb(88_148_31/0.7)]",
  outline:
    "border border-ink-200 bg-white text-ink-900 hover:border-ink-900 hover:-translate-y-0.5",
  ghost: "text-ink-700 hover:text-ink-900 hover:bg-ink-50",
} as const;

const sizes = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
} as const;

type ButtonStyleProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function buttonClass({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleProps & { className?: string } = {}) {
  return cn(buttonBase, variants[variant], sizes[size], className);
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonStyleProps & ComponentProps<typeof Link>) {
  return <Link className={buttonClass({ variant, size, className })} {...props} />;
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ButtonStyleProps & ComponentProps<"button">) {
  return (
    <button className={buttonClass({ variant, size, className })} {...props} />
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative rounded-3xl border border-ink-100 bg-white p-7 shadow-[0_1px_2px_rgb(11_18_32/0.04)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-ink-200 hover:shadow-[0_18px_40px_-20px_rgb(11_18_32/0.22)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Section heading with an optional gradient-accented trailing phrase. */
export function Heading({
  eyebrow,
  title,
  accent,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-5 text-3xl font-bold leading-[1.12] text-ink-900 sm:text-4xl md:text-[2.75rem]">
        {title}
        {accent ? <span className="text-gradient"> {accent}</span> : null}
      </h2>
      {subtitle ? (
        <p className="mt-5 text-lg leading-relaxed text-ink-500">{subtitle}</p>
      ) : null}
    </div>
  );
}
