"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Custom cursor: a small accent dot that trails the pointer, growing into a
 * ring over anything interactive. Desktop pointers only — never on touch, and
 * never when the visitor has asked for reduced motion.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.documentElement.classList.add("cursor-host");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;

      const interactive = (event.target as HTMLElement)?.closest?.(
        'a, button, input, textarea, [role="button"]',
      );
      ring.current?.toggleAttribute("data-active", Boolean(interactive));
    };

    // The ring lags the dot slightly, which is what makes it feel physical.
    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("cursor-host");
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95]">
      <div
        ref={dot}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent"
      />
      <div
        ref={ring}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-accent/50 transition-[width,height,margin,opacity] duration-200 data-active:-ml-7 data-active:-mt-7 data-active:h-14 data-active:w-14 data-active:border-accent"
      />
    </div>
  );
}

/**
 * Magnetic hover. The child drifts toward the pointer while it is nearby, then
 * springs back. Applied to primary calls to action only — everywhere would be
 * noise rather than craft.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const host = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = host.current;
    if (!node || reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      node.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
    };

    const reset = () => {
      node.style.transform = "translate3d(0,0,0)";
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", reset);

    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", reset);
    };
  }, [reduced, strength]);

  return (
    <span
      ref={host}
      className={className}
      style={{ display: "inline-block", transition: "transform 400ms cubic-bezier(0.16,1,0.3,1)" }}
    >
      {children}
    </span>
  );
}

/**
 * Scroll-spy rail. Reads the sections a page registers via `data-rail` and
 * marks the one currently in view.
 */
export function ScrollRail() {
  const [sections, setSections] = useState<{ id: string; label: string }[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-rail]"),
    );
    if (nodes.length < 2) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSections(nodes.map((n) => ({ id: n.id, label: n.dataset.rail ?? "" })));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = nodes.indexOf(entry.target as HTMLElement);
            if (index >= 0) setActive(index);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  if (sections.length < 2) return null;

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 xl:flex"
    >
      {sections.map((section, index) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group/rail flex items-center justify-end gap-3"
        >
          <span className="label text-[0.6rem] text-steel opacity-0 transition-opacity duration-200 group-hover/rail:opacity-100">
            {section.label}
          </span>
          <span
            data-active={index === active || undefined}
            className="block h-px w-5 bg-current text-steel/50 transition-all duration-300 data-active:w-9 data-active:text-accent"
          />
        </a>
      ))}
    </nav>
  );
}
