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
    borderColor: "var(--cdn-primary)",
    color: "var(--cdn-primary)",
    backgroundColor: "transparent",
  } as const;

  return (
    <div className="@container relative z-10 overflow-x-clip">
      <BgDeco
        src={ASSETS.leafBg}
        className="left-[-14%] top-[-8%] -z-0 w-[44%] rotate-[38deg] opacity-[0.1]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ASSETS.paperNote}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[70px] w-[100%] max-w-[650px] -translate-x-1/2 object-contain opacity-95 drop-shadow-[4px_4px_4px_rgba(0,0,0,0.25)] md:top-[85px]"
      />

      <div
        className="relative z-10 px-6 pb-8 pt-[68px] md:pt-[130px]"
        style={{ color: "var(--cdn-primary)", fontFamily: "var(--cdn-serif)" }}
      >
        <h2 className="cdn-title relative text-center text-[20px] font-bold md:text-[24px]">
          {t.guestbook}
        </h2>

        <form onSubmit={submit} className="mx-auto mt-5 max-w-[300px] rounded-[8px] p-4 md:max-w-[400px]">
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
            className="h-[60px] w-full resize-none rounded-[8px] border bg-transparent px-3 py-2 text-sm outline-none md:h-[130px]"
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

        <div className="mx-auto mt-6 max-w-[300px] space-y-3 md:max-w-[400px]">
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
  );
}
