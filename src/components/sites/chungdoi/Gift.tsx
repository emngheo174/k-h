"use client";

import { useState } from "react";
import { invitation, t } from "./data";
import { vietQrUrl } from "./format";
import { Reveal, HeartMark } from "./shared";
import type { GiftMethod } from "./data";

function GiftCard({ method, side }: { method: GiftMethod; side: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <p className="cd-script text-3xl text-[var(--cd-wine)]">{side}</p>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="group relative mt-3 w-full max-w-[16rem]"
        aria-expanded={open}
      >
        {!open ? (
          <span className="block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sites/chungdoi/theme/envelope-background.webp"
              alt=""
              aria-hidden="true"
              className="mx-auto w-40 drop-shadow-[0_12px_22px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:-translate-y-1"
            />
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[var(--cd-brick)]">
              <HeartMark className="h-3 w-3" />
              {t.tapToOpen}
            </span>
          </span>
        ) : (
          <span className="cd-fade-in block rounded-sm border border-[var(--cd-gold)]/40 bg-white/70 p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={vietQrUrl(
                method.bankBin,
                method.accountNumber,
                method.accountName,
              )}
              alt={`Mã QR ${method.bankName}`}
              className="mx-auto h-44 w-44 object-contain"
              loading="lazy"
            />
            <span className="mt-3 block text-sm font-medium text-[var(--cd-wine)]">
              {method.bankName}
            </span>
            <span className="block text-xs text-[var(--cd-ink)]/70">
              {method.accountName}
            </span>
            <span className="block text-sm tracking-wider text-[var(--cd-ink)]">
              {method.accountNumber}
            </span>
            <span className="mt-2 block text-[0.7rem] uppercase tracking-[0.2em] text-[var(--cd-brick)]">
              {t.qrScanText}
            </span>
          </span>
        )}
      </button>
    </div>
  );
}

export function Gift() {
  const groom = invitation.giftMethods.find((m) => m.for === "groom");
  const bride = invitation.giftMethods.find((m) => m.for === "bride");

  return (
    <section className="relative px-8 py-16 text-center">
      <Reveal>
        <p className="cd-eyebrow">{t.giftTitle}</p>
        <p className="mx-auto mt-4 max-w-[20rem] text-sm leading-relaxed text-[var(--cd-ink)]/75">
          {t.giftBoxThankYou}
        </p>
      </Reveal>
      <Reveal delay={120}>
        <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:justify-center">
          {groom && <GiftCard method={groom} side={t.groomLabel} />}
          {bride && <GiftCard method={bride} side={t.brideLabel} />}
        </div>
      </Reveal>
    </section>
  );
}
