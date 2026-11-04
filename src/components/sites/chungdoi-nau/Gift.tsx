"use client";

import { useState } from "react";
import { invitation, t } from "./data";
import { vietQrUrl } from "./format";
import { ASSETS, BgDeco } from "./shared";
import type { GiftMethod } from "./data";

function GiftCard({ method, side }: { method: GiftMethod; side: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full max-w-[16rem] flex-col items-center">
      <p className="text-lg" style={{ color: "var(--cdn-primary)", fontFamily: "var(--cdn-cormorant)" }}>
        {side}
      </p>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group relative mt-3 w-full"
      >
        {!open ? (
          <span className="block">
            <span
              className="mx-auto flex h-24 w-full items-center justify-center rounded-[10px] border transition-transform duration-300 group-hover:-translate-y-1"
              style={{ borderColor: "rgba(124,106,96,0.35)", backgroundColor: "rgba(124,106,96,0.06)" }}
            >
              <span className="text-sm font-medium" style={{ color: "var(--cdn-primary)" }}>
                {method.bankName}
              </span>
            </span>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em]" style={{ color: "var(--cdn-muted)" }}>
              {t.tapToOpen}
            </span>
          </span>
        ) : (
          <span
            className="cdn-fade-in block rounded-[10px] border p-4"
            style={{ borderColor: "rgba(124,106,96,0.35)", backgroundColor: "rgba(255,255,255,0.6)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={vietQrUrl(method.bankBin, method.accountNumber, method.accountName)}
              alt={`Mã QR ${method.bankName}`}
              loading="lazy"
              className="mx-auto h-40 w-40 object-contain"
            />
            <span className="mt-3 block text-sm font-medium" style={{ color: "var(--cdn-primary)" }}>
              {method.bankName}
            </span>
            <span className="block text-xs" style={{ color: "var(--cdn-muted)" }}>
              {method.accountName}
            </span>
            <span className="block text-sm tracking-wider" style={{ color: "var(--cdn-primary)" }}>
              {method.accountNumber}
            </span>
            <span className="mt-2 block text-[0.7rem] uppercase tracking-[0.18em]" style={{ color: "var(--cdn-muted)" }}>
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
    <div className="relative z-10 overflow-x-clip">
      <BgDeco
        src={ASSETS.houseBg}
        className="left-1/2 top-[8%] w-[140%] -translate-x-1/2 opacity-[0.08] mix-blend-multiply"
      />
      <div className="relative z-10 flex flex-col items-center px-6 pb-10 pt-8 text-center">
        <h2 className="cdn-title text-[20px]">{t.giftTitle}</h2>
        <p className="mx-auto mt-3 max-w-[20rem] text-sm leading-relaxed" style={{ color: "var(--cdn-muted)", fontFamily: "var(--cdn-baskerville)" }}>
          {t.giftThankYou}
        </p>
        <div className="mt-8 flex w-full flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-6">
          {groom && <GiftCard method={groom} side={t.groomLabel} />}
          {bride && <GiftCard method={bride} side={t.brideLabel} />}
        </div>
      </div>
    </div>
  );
}
