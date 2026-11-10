"use client";

import { useEffect, useState } from "react";
import { t, type Side } from "./data";
import { ASSETS, BgDeco } from "./shared";

interface Wish {
  name: string;
  message: string;
}

/** Guestbook ("Sổ lưu bút") with a paper-note backdrop (template `c.tG`).
 *  `side` (groom/bride, from the page URL) is stored with each wish. */
export function Guestbook({ side }: { side: Side }) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  // Load the public guestbook feed on mount.
  useEffect(() => {
    let active = true;
    fetch("/api/wishes")
      .then((r) => r.json())
      .then((d) => {
        if (active && d.ok) setWishes(d.wishes as Wish[]);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const m = message.trim();
    if (!n || !m || status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ side, name: n, message: m }),
      });
      const d = await res.json();
      if (!res.ok || !d.ok) throw new Error(d.error || "Không lưu được lời chúc.");
      setWishes((w) => [{ name: d.wish.name, message: d.wish.message }, ...w]);
      setName("");
      setMessage("");
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Không lưu được lời chúc.");
    }
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
        {/* A real cream "paper" card: fixed, even padding, content always
            contained. No stretched background image (that caused overflow and
            a distorted leaf when the wish list grew). */}
        <div
          className="relative mx-auto max-w-[480px] overflow-hidden rounded-[18px] border shadow-[0_12px_32px_-14px_rgba(124,106,96,0.4)]"
          style={{
            color: "var(--cdn-primary)",
            fontFamily: "var(--cdn-serif)",
            backgroundColor: "var(--cdn-card-fill)",
            borderColor: "rgba(124,106,96,0.2)",
          }}
        >
          {/* Botanical accent — fixed size, faint, decorative only. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.leafBg}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-2 -right-4 w-[36%] max-w-[150px] -rotate-[18deg] select-none opacity-[0.14]"
          />

          <div className="relative z-10 p-6 md:p-8">
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
                disabled={status === "sending"}
                className="mt-3 w-full rounded-full px-5 py-2 text-sm tracking-wide transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "var(--cdn-primary)", color: "var(--cdn-light)" }}
              >
                {status === "sending" ? "Đang gửi…" : t.submitWishText}
              </button>
              {status === "saved" && (
                <p className="cdn-fade-in mt-2 text-center text-xs" style={{ color: "var(--cdn-primary)" }}>
                  {t.wishSavedText}
                </p>
              )}
              {status === "error" && (
                <p className="cdn-fade-in mt-2 text-center text-xs" style={{ color: "#b4524a" }}>
                  {error}
                </p>
              )}
            </form>

            <div className="mt-6 max-h-[320px] space-y-3 overflow-y-auto pr-1 md:max-h-[420px]">
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
