"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds, for revealing a row of cards in sequence. */
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
};

const OFFSET = 24;

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  const from =
    direction === "up"
      ? { y: OFFSET }
      : direction === "left"
        ? { x: -OFFSET }
        : direction === "right"
          ? { x: OFFSET }
          : {};

  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      // `once` keeps content visible after the first reveal so re-scrolling
      // never re-hides text from a screen reader or a returning reader.
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
