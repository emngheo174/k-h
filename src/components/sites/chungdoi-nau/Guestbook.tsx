"use client";

import { useState } from "react";
import { t } from "./data";
import { ASSETS, BgDeco } from "./shared";

interface Wish {
  name: string;
  message: string;
}

/** Guestbook ("Sổ lưu bút") with a paper-note backdrop (template `c.tG`). */
export function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setWishes((w) => [{ name: name.trim(), message: message.trim() }, ...w]);
    setName("");
    setMessage("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputStyle = {
    borderColor: "rgba(124,106,96,0.3)",
    color: "var(--cdn-primary)",
    backgroundColor: "transparent",
  } as const;

  return (
    <div className="@container relative z-10 overflow-x-clip">
      <BgDeco
        src={ASSETS.leafBg}
        className="left-[-14%] top-[-8%] -z-0 w-[44%] rotate-[38deg] opacity-[0.1]"
      />
      <div className="relative z-10 px-6 pb-10 pt-10 md:pt-12">
        <div
          className="relative mx-auto max-w-[540px]"
          style={{ color: "var(--cdn-primary)", fontFamily: "var(--cdn-serif)" }}
        >
          {/* Paper-note backdrop, stretched to cover the whole card so the
              form + wishes never spill off the bottom edge of the paper. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.paperNote}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-fill opacity-95 drop-shadow-[4px_4px_4px_rgba(0,0,0,0.25)]"
          />

          {/* Padding is a % so it tracks the paper image's built-in margins at
              every width. Left is larger: the leaf sprig pokes onto the lower
              ~19% of the card's left side, so content must clear it. */}
          <div className="relative z-10 pb-11 pl-[19%] pr-[19%] pt-10 md:pb-12 md:pt-12">
            <h2 className="cdn-title text-center text-[20px] font-bold md:text-[24px]">
              {t.guestbook}
            </h2>

            <form onSubmit={submit} className="mt-5">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.guestNamePlaceholder}
                className="mb-3 w-full rounded-[8px] border bg-transparent px-3 py-2 text-sm outline-none"
                style={inputStyle}
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.guestWishPlaceholder}
                className="h-[70px] w-full resize-none rounded-[8px] border bg-transparent px-3 py-2 text-sm outline-none md:h-[120px]"
                style={inputStyle}
              />
              <button
                type="submit"
                className="mt-3 w-full rounded-full px-5 py-2 text-sm tracking-wide transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--cdn-primary)", color: "var(--cdn-light)" }}
              >
                {t.submitWishText}
              </button>
              {saved && (
                <p className="cdn-fade-in mt-2 text-center text-xs" style={{ color: "var(--cdn-primary)" }}>
                  {t.wishSavedText}
                </p>
              )}
            </form>

            <div className="mt-6 space-y-3">
              {wishes.length === 0 ? (
                <p className="text-center text-sm italic" style={{ color: "var(--cdn-muted)" }}>
                  {t.noWishesYet}
                </p>
              ) : (
                wishes.map((w, i) => (
                  <div
                    key={i}
                    className="rounded-[8px] border p-4 text-sm"
                    style={{
                      borderColor: "rgba(124,106,96,0.33)",
                      backgroundColor: "rgba(255,255,255,0.55)",
                    }}
                  >
                    <p className="font-semibold" style={{ color: "var(--cdn-primary)" }}>
                      {w.name}
                    </p>
                    <p className="mt-1" style={{ color: "var(--cdn-muted)" }}>
                      {w.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
