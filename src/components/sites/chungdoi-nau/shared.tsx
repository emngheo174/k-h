import type { ReactNode } from "react";

/** Brown-theme decorative assets (template `d`). */
export const ASSETS = {
  paper: "/sites/chungdoi-nau/theme/paper.webp",
  houseBg: "/sites/chungdoi-nau/theme/house-background.webp",
  leafBg: "/sites/chungdoi-nau/theme/leaf-background.webp",
  flower2: "/sites/chungdoi-nau/theme/flower2-decoration.webp",
  frameAvatar: "/sites/chungdoi-nau/theme/frame-avatar.webp",
  paperNote: "/sites/chungdoi-nau/theme/paper-note.webp",
  gate: "/sites/chungdoi-nau/theme/gate.webp",
  cake: "/sites/chungdoi-nau/theme/cake.webp",
  water: "/sites/chungdoi-nau/theme/water.webp",
} as const;

/** Textured card backdrop used behind every panel (template helper `w`). */
export function CardFill({ radiusClass = "" }: { radiusClass?: string }) {
  return (
    <>
      <div
        aria-hidden
        className={`absolute inset-0 ${radiusClass}`}
        style={{ backgroundColor: "var(--cdn-card-fill)" }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ASSETS.paper}
        alt=""
        aria-hidden
        className={`pointer-events-none absolute inset-0 size-full max-w-none object-cover opacity-50 mix-blend-multiply ${radiusClass}`}
      />
    </>
  );
}

/** Floating decorative sprig (template helper `N`, mbFloat). */
export function FloatDeco({
  src,
  className = "",
  inner = "",
  dur,
  delay,
}: {
  src: string;
  className?: string;
  inner?: string;
  dur: number;
  delay: number;
}) {
  return (
    <span
      aria-hidden
      className={`cdn-float-anim pointer-events-none absolute block ${className}`}
      style={{
        animation: `cdn-float ${dur}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        willChange: "transform",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className={`block w-full max-w-none object-contain drop-shadow-[4px_4px_2px_rgba(0,0,0,0.25)] ${inner}`}
      />
    </span>
  );
}

/** Faint full-bleed background illustration behind a section. */
export function BgDeco({
  src,
  className,
}: {
  src: string;
  className: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden
      className={`pointer-events-none absolute max-w-none object-contain ${className}`}
    />
  );
}

/** Leaf glyph used for the ambient falling particles on the envelope. */
export function LeafGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
    </svg>
  );
}

/** Solid heart used for the envelope wax seal. */
export function HeartGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

/** Shared panel: textured card with soft shadow. */
export function Panel({
  radius = "rounded-[10px]",
  className = "",
  children,
}: {
  radius?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden ${radius} shadow-[4px_4px_8px_rgba(0,0,0,0.18)] ${className}`}
    >
      <CardFill radiusClass={radius} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
