"use client";

import { useState } from "react";
import { invitation, t } from "./data";
import { Reveal, HeartMark } from "./shared";

export function Gallery() {
  const imgs = invitation.galleryImages;
  const [active, setActive] = useState(0);

  const go = (dir: number) =>
    setActive((a) => (a + dir + imgs.length) % imgs.length);

  return (
    <section className="relative px-8 py-16 text-center">
      <Reveal>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sites/chungdoi/theme/camera.webp"
          alt=""
          aria-hidden="true"
          className="mx-auto mb-4 w-20 opacity-90"
        />
        <p className="cd-eyebrow">{t.albumTitle}</p>
      </Reveal>

      <Reveal delay={120}>
        {/* Stacked "cards" layout */}
        <div className="relative mx-auto mt-10 h-[26rem] w-[74%] max-w-[20rem]">
          {imgs.map((img, i) => {
            const offset = (i - active + imgs.length) % imgs.length;
            const show = offset <= 2;
            return (
              <figure
                key={img.src}
                className="absolute inset-0 rounded-[2px] bg-white p-2.5 pb-7 shadow-[0_22px_40px_-20px_rgba(58,35,38,0.7)] transition-all duration-500"
                style={{
                  transform: `translateY(${offset * -14}px) scale(${
                    1 - offset * 0.05
                  }) rotate(${offset === 0 ? 0 : offset % 2 ? 2.5 : -2.5}deg)`,
                  opacity: show ? 1 : 0,
                  zIndex: imgs.length - offset,
                  pointerEvents: offset === 0 ? "auto" : "none",
                }}
              >
                <div className="h-full w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={`Ảnh cưới ${i + 1}`}
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition: `${img.position.x * 100}% ${img.position.y * 100}%`,
                    }}
                    loading="lazy"
                  />
                </div>
              </figure>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Ảnh trước"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--cd-wine)]/30 text-[var(--cd-wine)] transition-colors hover:bg-[var(--cd-wine)] hover:text-[var(--cd-cream)]"
          >
            ‹
          </button>
          <span className="flex items-center gap-1.5">
            {imgs.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === active
                    ? "w-5 bg-[var(--cd-wine)]"
                    : "w-1.5 bg-[var(--cd-wine)]/25"
                }`}
              />
            ))}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Ảnh kế tiếp"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--cd-wine)]/30 text-[var(--cd-wine)] transition-colors hover:bg-[var(--cd-wine)] hover:text-[var(--cd-cream)]"
          >
            ›
          </button>
        </div>
        <HeartMark className="mx-auto mt-6 h-4 w-4 text-[var(--cd-gold)]" />
      </Reveal>
    </section>
  );
}
