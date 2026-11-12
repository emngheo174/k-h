"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { invitation, t } from "./data";
import { ASSETS, BgDeco } from "./shared";

const AUTO_MS = 1400;
/** Uniform portrait frame so landscape + portrait photos share one card size. */
const FRAME_AR = 0.72;

/** Coverflow "cards" gallery slider (source template component `eS`). */
export function Gallery() {
  const imgs = invitation.galleryImages;
  const count = imgs.length;

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reduced, setReduced] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = useCallback(() => setActive((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setActive((i) => (i - 1 + count) % count), [count]);

  // Shortest signed offset from the active card (wraps around).
  const signed = useCallback(
    (i: number) => {
      const d = i - active;
      if (d > count / 2) return d - count;
      if (d < -count / 2) return d + count;
      return d;
    },
    [active, count],
  );

  // Pause auto-advance briefly after a manual interaction.
  const nudge = useCallback(() => {
    setHovered(true);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setHovered(false), 6000);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    // Defer the initial read so it isn't a synchronous setState in the effect.
    const raf = requestAnimationFrame(apply);
    mq.addEventListener("change", apply);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0, rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (count <= 1 || reduced || !visible || hovered || open) return;
    const id = setInterval(next, AUTO_MS);
    return () => clearInterval(id);
  }, [count, reduced, visible, hovered, open, next]);

  useEffect(() => () => {
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = Math.abs(e.changedTouches[0].clientY - touch.current.y);
    touch.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > dy) {
      if (dx < 0) next();
      else prev();
      nudge();
    }
  };

  // Lightbox keyboard + scroll lock.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, next, prev]);

  return (
    <div className="relative z-10 overflow-x-clip">
      <BgDeco
        src={ASSETS.leafBg}
        className="right-[-18%] top-[-6%] -z-0 w-[46%] rotate-[38deg] opacity-[0.1]"
      />

      <div
        className="relative z-10 flex flex-col items-center px-6 pb-10 pt-10"
        style={{ color: "var(--cdn-primary)" }}
      >
        <h2 className="cdn-title relative z-10 text-center text-[20px]">
          {t.albumTitle}
        </h2>

        <div
          ref={stageRef}
          className="relative z-10 mt-5 w-full max-w-[380px] md:max-w-[600px]"
          onMouseEnter={() => {
            if (pauseTimer.current) clearTimeout(pauseTimer.current);
            setHovered(true);
          }}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            className="relative h-[340px] touch-pan-y md:h-[520px]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {count > 1 && (
              <button
                type="button"
                aria-label="Ảnh trước"
                onClick={() => {
                  nudge();
                  prev();
                }}
                className="absolute left-0 top-1/2 z-[200] hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition-colors md:flex"
                style={{ backgroundColor: "rgba(124,106,96,0.12)" }}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            )}
            {count > 1 && (
              <button
                type="button"
                aria-label="Ảnh kế tiếp"
                onClick={() => {
                  nudge();
                  next();
                }}
                className="absolute right-0 top-1/2 z-[200] hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition-colors md:flex"
                style={{ backgroundColor: "rgba(124,106,96,0.12)" }}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            )}

            <div
              className="relative flex h-full w-full items-center justify-center"
              style={{ perspective: "1000px" }}
            >
              {imgs.map((img, i) => {
                const l = signed(i);
                const o = Math.abs(l);
                const isCenter = l === 0;
                const scale = Math.max(0.7, 1 - 0.15 * o);
                const opacity = Math.max(0.3, 1 - 0.25 * o);
                // The active card stays flat (no 3D transform) so it renders crisp;
                // only side cards get the coverflow tilt/depth.
                const transform = isCenter
                  ? "translateX(0) scale(1)"
                  : `translateX(${60 * l}%) translateZ(${-(150 * o)}px) rotateY(${45 * l}deg) scale(${scale})`;
                return (
                  <div
                    key={`cover-${i}`}
                    onClick={() => {
                      if (isCenter) setOpen(true);
                      else {
                        setActive(i);
                        nudge();
                      }
                    }}
                    className={`absolute h-[92%] cursor-pointer overflow-hidden rounded-2xl shadow-xl transition-all ease-in-out ${
                      isCenter ? "ring-2 ring-white/30" : ""
                    }`}
                    style={{
                      aspectRatio: FRAME_AR,
                      transitionDuration: "1100ms",
                      transform,
                      opacity,
                      zIndex: 100 - o,
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={`Ảnh cưới ${i + 1}`}
                      fill
                      // The portrait frame crops landscape photos (object-cover),
                      // so the shown strip needs ~2x the frame's width in source
                      // pixels. Request a bigger variant than the box width or
                      // wide photos render soft before the lightbox opens.
                      sizes="(min-width: 768px) 720px, 480px"
                      quality={90}
                      className="object-cover"
                      style={{
                        objectPosition: `${img.position.x * 100}% ${img.position.y * 100}%`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {count > 1 &&
            (count <= 7 ? (
              <div className="mt-3 flex justify-center gap-1.5">
                {imgs.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Xem ảnh ${i + 1}`}
                    onClick={() => {
                      setActive(i);
                      nudge();
                    }}
                    className={`rounded-full bg-current transition-all duration-300 ${
                      i === active ? "h-2 w-6 opacity-70" : "h-2 w-2 opacity-25 hover:opacity-40"
                    }`}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-3 flex justify-center">
                <span className="text-sm tabular-nums opacity-60">
                  {active + 1} / {count}
                </span>
              </div>
            ))}
        </div>
      </div>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
        <div
          className="cdn-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            aria-label="Đóng"
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 text-3xl text-white/80 hover:text-white"
          >
            ×
          </button>
          <button
            type="button"
            aria-label="Ảnh trước"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-2xl text-white/90 md:left-8"
          >
            ‹
          </button>
          <div
            className="relative h-[85vh] w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imgs[active].src}
              alt={`Ảnh cưới ${active + 1}`}
              fill
              sizes="90vw"
              quality={90}
              className="object-contain"
            />
          </div>
          <button
            type="button"
            aria-label="Ảnh kế tiếp"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-2xl text-white/90 md:right-8"
          >
            ›
          </button>
        </div>,
          document.body,
        )}
    </div>
  );
}
