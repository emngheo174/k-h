"use client";

import { invitation, t } from "./data";
import { parseDate } from "./format";
import { HeartMark } from "./shared";

const date = parseDate(invitation.date);

export function Envelope({
  open,
  onOpen,
}: {
  open: boolean;
  onOpen: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center transition-opacity duration-700 ${
        open ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={open}
    >
      <div
        className="relative flex w-full max-w-[30rem] flex-col items-center justify-center px-8"
        style={{
          backgroundColor: "#511419",
          backgroundImage:
            "radial-gradient(120% 70% at 50% 15%, #6b1f26 0%, #511419 55%, #380d11 100%)",
        }}
      >
        {/* top ornament */}
        <div className="cd-divider mb-10 text-[var(--cd-gold)]">
          <HeartMark className="h-3.5 w-3.5" />
        </div>

        <p
          className="cd-script text-5xl text-[var(--cd-gold-soft)]"
          style={{ lineHeight: 1 }}
        >
          {t.envelopeGreeting}
        </p>

        <div className="mt-8 mb-2">
          {/* Closed envelope with gold heart wax seal */}
          <div className="relative mx-auto w-56">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sites/chungdoi/theme/envelope-cover.webp"
              alt="Phong thư mời cưới"
              className="w-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]"
            />
            <button
              type="button"
              onClick={onOpen}
              aria-label={t.envelopeOpenButton}
              className="cd-seal-pulse absolute left-1/2 top-[58%] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
            />
          </div>
        </div>

        <h1 className="mt-6 text-center">
          <span className="cd-script block text-6xl text-[var(--cd-cream)]">
            {invitation.groomShortName}
          </span>
          <span className="my-1 block text-2xl text-[var(--cd-gold)]">&</span>
          <span className="cd-script block text-6xl text-[var(--cd-cream)]">
            {invitation.brideShortName}
          </span>
        </h1>

        <p className="mt-6 text-sm tracking-[0.3em] text-[var(--cd-cream-deep)]">
          {date.day}.{date.month}.{date.year}
        </p>

        <p className="mt-2 max-w-[18rem] text-center text-sm leading-relaxed text-[var(--cd-cream-deep)]/80">
          {t.envelopeInviteMessage}
        </p>

        <button
          type="button"
          onClick={onOpen}
          className="group mt-10 inline-flex items-center gap-2 rounded-full border border-[var(--cd-gold)]/70 px-9 py-3 text-sm uppercase tracking-[0.3em] text-[var(--cd-gold-soft)] transition-colors duration-300 hover:bg-[var(--cd-gold)] hover:text-[#511419]"
        >
          {t.envelopeOpenButton}
          <HeartMark className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
        </button>

        <div className="cd-divider mt-12 text-[var(--cd-gold)]">
          <HeartMark className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
}
