"use client";

import { t, type CoupleView } from "./data";
import { parseDate } from "./format";
import { AmbientLeaves } from "./AmbientLeaves";
import { ASSETS, HeartGlyph } from "./shared";

export function Envelope({
  open,
  shaking,
  onOpen,
  view,
}: {
  open: boolean;
  shaking: boolean;
  onOpen: () => void;
  view: CoupleView;
}) {
  const date = parseDate(view.date);

  return (
    <div
      aria-hidden={open}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        open ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "linear-gradient(to bottom right, var(--cdn-env-top), var(--cdn-env-mid), var(--cdn-env-bot))",
      }}
    >
      <AmbientLeaves />

      <div
        className={`relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px] ${
          shaking ? "cdn-shake-anim" : ""
        }`}
      >
        {/* Heart wax seal */}
        <div
          className="cdn-seal-anim absolute left-1/2 flex items-center justify-center rounded-full"
          style={{
            top: "50px",
            width: "56px",
            height: "56px",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle at 30% 30%, #7c6a60, rgb(94, 76, 66))",
            boxShadow:
              "0 4px 20px rgba(124, 106, 96, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)",
            zIndex: 30,
            animation: "cdn-seal-pulse 2s ease-in-out infinite",
          }}
        >
          <HeartGlyph className="h-7 w-7 text-white" />
        </div>

        {/* Card */}
        <div
          className="relative rounded-lg"
          style={{
            boxShadow:
              "0 25px 60px -12px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.2), 0 0 40px rgba(124,106,96,0.15)",
          }}
        >
          {/* Inner fill + flower corners */}
          <div
            className="absolute inset-0 overflow-hidden rounded-lg"
            style={{
              background: "var(--cdn-env-card)",
              border: "1px solid rgba(124, 106, 96, 0.15)",
              clipPath: "inset(0 round 8px)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.flower2}
              alt=""
              aria-hidden
              className="pointer-events-none absolute left-[-20px] top-[-3%] h-36 w-auto max-w-none -translate-x-[6%] rotate-[25deg] opacity-70 md:left-[-40px] md:top-[-7%] md:h-80 md:-translate-x-[11%] lg:h-80"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.flower2}
              alt=""
              aria-hidden
              className="pointer-events-none absolute bottom-[-3%] right-[-20px] h-36 w-auto max-w-none -translate-x-[-6%] -rotate-[25deg] opacity-70 md:bottom-[30%] md:right-[-40px] md:h-80 md:-translate-x-[-11%] lg:h-80"
              style={{ transform: "scaleX(-1)" }}
            />
          </div>

          <div className="relative z-10 px-6 pb-14 pt-28 text-center md:pb-8 md:pt-24">
            <h1
              className="mb-2 flex flex-col items-center text-3xl leading-tight sm:text-4xl"
              style={{ color: "var(--cdn-primary)", fontFamily: "var(--cdn-garamond)" }}
            >
              <span className="block w-full text-center">
                {view.first.shortName}
              </span>
              <span
                className="block w-full text-center text-lg leading-none sm:text-xl"
                style={{ fontFamily: "var(--cdn-baskerville)" }}
              >
                &amp;
              </span>
              <span className="block w-full text-center">
                {view.second.shortName}
              </span>
            </h1>

            <div className="mb-2 flex items-center justify-center gap-3">
              <div
                className="h-px w-10"
                style={{
                  background: "linear-gradient(to right, transparent, #7c6a60)",
                }}
              />
              <span
                className="text-sm"
                style={{ color: "var(--cdn-primary)", opacity: 0.7 }}
              >
                ❦
              </span>
              <div
                className="h-px w-10"
                style={{
                  background: "linear-gradient(to left, transparent, #7c6a60)",
                }}
              />
            </div>

            <div
              className="mb-5 flex flex-col items-center text-[18px]"
              style={{
                color: "rgba(124, 106, 96, 0.72)",
                fontFamily: "var(--cdn-lora)",
              }}
            >
              <span>{date.longVi}</span>
            </div>

            <div className="mx-auto mb-6 max-w-[300px] md:max-w-[380px] lg:max-w-[440px]">
              <p
                className="mb-2 text-[18px] font-light"
                style={{
                  color: "rgba(124, 106, 96, 0.72)",
                  fontFamily: "var(--cdn-lora)",
                }}
              >
                {t.envelopeGreeting}
              </p>
            </div>

            <button
              type="button"
              onClick={onOpen}
              className="relative mx-auto flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-full px-8 py-2.5 text-lg font-semibold shadow-lg sm:font-medium"
              style={{
                backgroundColor: "#7c6a60",
                color: "#ffffff",
                boxShadow: "0 4px 14px rgba(124, 106, 96, 0.35)",
                fontFamily: "var(--cdn-lora)",
              }}
            >
              <span>{t.envelopeOpenButton}</span>
              <span
                aria-hidden
                className="cdn-shine-anim pointer-events-none absolute top-0 h-full w-8"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  animation: "cdn-shine 3s ease-in-out infinite",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
