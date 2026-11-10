"use client";

import { useState } from "react";
import { t, type Side } from "./data";

/** RSVP: a primary button that reveals the confirmation form (template `o.V`).
 *  `side` (groom/bride, from the page URL) is stored with each response. */
export function Rsvp({ side }: { side: Side }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [attend, setAttend] = useState<"yes" | "no" | null>(null);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || attend === null || sending) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          side,
          name: name.trim(),
          attending: attend === "yes",
          guests,
          message: message.trim(),
        }),
      });
      const d = await res.json();
      if (!res.ok || !d.ok) throw new Error(d.error || "Không gửi được xác nhận.");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không gửi được xác nhận.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    borderColor: "var(--cdn-primary)",
    color: "var(--cdn-primary)",
    backgroundColor: "transparent",
  } as const;

  return (
    <div className="relative z-10 mt-1 flex w-full flex-col items-center justify-center">
      {!show && !sent && (
        <button
          type="button"
          onClick={() => setShow(true)}
          className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm tracking-wide transition-transform hover:scale-[1.03]"
          style={{
            backgroundColor: "var(--cdn-primary)",
            color: "var(--cdn-light)",
            fontFamily: "var(--cdn-baskerville)",
          }}
        >
          {t.rsvpButton}
        </button>
      )}

      {show && !sent && (
        <form
          onSubmit={submit}
          className="cdn-fade-in mt-2 w-full max-w-[320px] space-y-4 text-left"
          style={{ color: "var(--cdn-primary)", fontFamily: "var(--cdn-baskerville)" }}
        >
          <p className="text-center text-xs leading-relaxed" style={{ color: "var(--cdn-muted)" }}>
            {t.rsvpSubtitle}
          </p>
          <div>
            <label className="mb-1 block text-xs">{t.rsvpNameLabel}</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.rsvpNamePlaceholder}
              required
              className="w-full rounded-[8px] border bg-transparent px-3 py-2 text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <p className="mb-2 text-xs">{t.rsvpAttendQuestion}</p>
            <div className="flex gap-2">
              {([
                ["yes", t.rsvpAttendYes],
                ["no", t.rsvpAttendNo],
              ] as const).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAttend(val)}
                  className="flex-1 rounded-[8px] border px-3 py-2 text-xs transition-colors"
                  style={
                    attend === val
                      ? { backgroundColor: "var(--cdn-primary)", color: "var(--cdn-light)", borderColor: "var(--cdn-primary)" }
                      : inputStyle
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {attend === "yes" && (
            <div className="cdn-fade-in">
              <label className="mb-1 block text-xs">{t.rsvpGuestCountLabel}</label>
              <div className="inline-flex items-center gap-4 rounded-[8px] border px-4 py-1.5" style={inputStyle}>
                <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="text-lg" aria-label="Giảm">
                  −
                </button>
                <span className="w-5 text-center tabular-nums">{guests}</span>
                <button type="button" onClick={() => setGuests((g) => Math.min(10, g + 1))} className="text-lg" aria-label="Tăng">
                  +
                </button>
              </div>
            </div>
          )}
          <div>
            <label className="mb-1 block text-xs">{t.rsvpMessageLabel}</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.rsvpMessagePlaceholder}
              rows={2}
              className="w-full resize-none rounded-[8px] border bg-transparent px-3 py-2 text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <button
            type="submit"
            disabled={sending || !name || attend === null}
            className="w-full rounded-full px-6 py-2.5 text-sm tracking-wide transition-opacity hover:opacity-90 disabled:opacity-40"
            style={{ backgroundColor: "var(--cdn-primary)", color: "var(--cdn-light)" }}
          >
            {sending ? t.rsvpSendingText : t.rsvpSubmitText}
          </button>
          {error && (
            <p className="cdn-fade-in text-center text-xs" style={{ color: "#b4524a" }}>
              {error}
            </p>
          )}
        </form>
      )}

      {sent && (
        <div
          className="cdn-fade-in mt-2 w-full max-w-[320px] rounded-[8px] border px-5 py-6 text-center"
          style={{ borderColor: "rgba(124,106,96,0.6)", backgroundColor: "#f2e8dc", color: "var(--cdn-primary)" }}
        >
          <p className="text-base font-semibold">{t.rsvpThankYouTitle}</p>
          <p className="mt-2 text-sm" style={{ color: "var(--cdn-muted)" }}>
            {attend === "yes"
              ? `${t.rsvpConfirmationReceivedText} ${t.rsvpLookForwardText}`
              : t.rsvpDeclineMessageText}
          </p>
          <button
            type="button"
            onClick={() => {
              setSent(false);
              setShow(false);
              setName("");
              setAttend(null);
              setMessage("");
              setGuests(1);
            }}
            className="mt-4 text-xs underline underline-offset-4"
          >
            {t.rsvpCloseText}
          </button>
        </div>
      )}
    </div>
  );
}
