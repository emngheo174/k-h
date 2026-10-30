"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Reveals children with a fade + rise once they scroll into view. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "figure";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as "div";
  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`cd-reveal ${shown ? "cd-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}

/** A small gold heart glyph (matches the wax-seal motif). */
export function HeartMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      aria-hidden="true"
    >
      <path d="M12 20s-7.5-4.6-9.6-9.1C1 7.6 2.6 4.5 5.8 4.5c2 0 3.4 1.2 4.2 2.5.8-1.3 2.2-2.5 4.2-2.5 3.2 0 4.8 3.1 3.4 6.4C19.5 15.4 12 20 12 20z" />
    </svg>
  );
}

/** Gold divider with a centered heart. */
export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`cd-divider ${className}`}>
      <HeartMark className="h-3.5 w-3.5" />
    </div>
  );
}

/** Small decorative peony sprig image. */
export function Peony({
  className = "",
  flip = false,
  float = false,
}: {
  className?: string;
  flip?: boolean;
  float?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/sites/chungdoi/theme/flower2-decoration.webp"
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none ${float ? "cd-petal-float" : ""} ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    />
  );
}
