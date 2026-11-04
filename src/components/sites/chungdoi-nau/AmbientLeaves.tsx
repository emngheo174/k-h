import { LeafGlyph } from "./shared";

// Particle palette from the source template config.
const LEAF_COLORS = ["#c9a97e", "#b89b78", "#918077", "#e6d6c4"];

// Small deterministic PRNG so the server and client render identical leaves
// (no hydration mismatch). Values mirror the source's ambient-fall ranges.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LEAVES = (() => {
  const rnd = mulberry32(20260103);
  return Array.from({ length: 16 }, () => {
    const r = rnd;
    return {
      left: r() * 100,
      size: 14 + r() * 12, // 14–26px
      color: LEAF_COLORS[Math.floor(r() * LEAF_COLORS.length)],
      sway: (r() * 2 - 1) * 14, // -14..14px
      duration: 18 + r() * 10, // 18–28s
      delay: -(r() * 24), // negative so they're mid-fall on load
      opacity: 0.55 + r() * 0.4,
    };
  });
})();

/** Ambient falling-leaf layer for the envelope cover. */
export function AmbientLeaves() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {LEAVES.map((l, i) => (
        <div
          key={i}
          className="cdn-leaf-anim absolute"
          style={{
            left: `${l.left}%`,
            top: "-30px",
            color: l.color,
            fontSize: `${l.size}px`,
            // consumed by the cdn-ambient-fall keyframes
            ["--sway" as string]: `${l.sway}px`,
            ["--leaf-opacity" as string]: l.opacity,
            animation: `cdn-ambient-fall ${l.duration}s ease-in-out ${l.delay}s infinite`,
            willChange: "transform",
          }}
        >
          <LeafGlyph className="h-[1em] w-[1em]" />
        </div>
      ))}
    </div>
  );
}
