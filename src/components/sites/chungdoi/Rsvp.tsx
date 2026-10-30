"use client";

import { useState } from "react";
import { t } from "./data";
import { Reveal, HeartMark, GoldDivider } from "./shared";

export function Rsvp() {
  // RSVP form state (demo-only: no backend, mirrors source UX)
  const [name, setName] = useState("");
  const [attend, setAttend] = useState<"yes" | "no" | null>(null);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || attend === null) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 700);
  };

  return (
    <section
      className="relative px-8 py-16 text-center"
      style={{ backgroundColor: "rgba(81,20,25,0.04)" }}
    >
      <Reveal>
        <p className="cd-eyebrow">RSVP</p>
        <p className="cd-script mt-3 text-4xl text-[var(--cd-wine)]">
          {t.rsvpTitle}
        </p>
        <p className="mx-auto mt-4 max-w-[21rem] text-sm leading-relaxed text-[var(--cd-ink)]/75">
          {t.rsvpSubtitle}
        </p>
      </Reveal>

      <Reveal delay={120}>
        {sent ? (
          <div className="cd-fade-in mx-auto mt-10 max-w-[22rem] rounded-sm border border-[var(--cd-gold)]/40 bg-white/70 px-6 py-10">
            <HeartMark className="mx-auto h-8 w-8 text-[var(--cd-gold)]" />
            <p className="mt-4 text-lg text-[var(--cd-wine)]">
              {t.rsvpThankYouTitle}
            </p>
            <p className="mt-2 text-sm text-[var(--cd-ink)]/75">
              {attend === "yes"
                ? `${t.rsvpConfirmationReceivedText} ${t.rsvpLookForwardText}`
                : t.rsvpDeclineMessageText}
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setName("");
                setAttend(null);
                setMessage("");
                setGuests(1);
              }}
              className="mt-6 text-xs uppercase tracking-[0.25em] text-[var(--cd-brick)] underline underline-offset-4"
            >
              {t.rsvpCloseText}
            </button>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="mx-auto mt-10 max-w-[22rem] space-y-5 text-left"
          >
            <div>
              <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-[var(--cd-brick)]">
                {t.rsvpNameLabel}
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.rsvpNamePlaceholder}
                required
                className="w-full rounded-sm border border-[var(--cd-wine)]/25 bg-white/60 px-4 py-2.5 text-[var(--cd-ink)] outline-none placeholder:text-[var(--cd-ink)]/35 focus:border-[var(--cd-gold)]"
              />
            </div>

            <div>
              <p className="mb-2 block text-xs uppercase tracking-[0.2em] text-[var(--cd-brick)]">
                {t.rsvpAttendQuestion}
              </p>
              <div className="flex gap-3">
                {([
                  ["yes", t.rsvpAttendYes],
                  ["no", t.rsvpAttendNo],
                ] as const).map(([val, label]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAttend(val)}
                    className={`flex-1 rounded-sm border px-3 py-2.5 text-sm transition-colors ${
                      attend === val
                        ? "border-[var(--cd-wine)] bg-[var(--cd-wine)] text-[var(--cd-cream)]"
                        : "border-[var(--cd-wine)]/25 bg-white/50 text-[var(--cd-ink)] hover:border-[var(--cd-gold)]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {attend === "yes" && (
              <div className="cd-fade-in">
                <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-[var(--cd-brick)]">
                  {t.rsvpGuestCountLabel}
                </label>
                <div className="inline-flex items-center gap-4 rounded-sm border border-[var(--cd-wine)]/25 bg-white/60 px-4 py-2">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="text-xl text-[var(--cd-wine)]"
                    aria-label="Giảm"
                  >
                    −
                  </button>
                  <span className="w-6 text-center tabular-nums text-[var(--cd-ink)]">
                    {guests}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(10, g + 1))}
                    className="text-xl text-[var(--cd-wine)]"
                    aria-label="Tăng"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-[var(--cd-brick)]">
                {t.rsvpMessageLabel}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.rsvpMessagePlaceholder}
                rows={3}
                className="w-full resize-none rounded-sm border border-[var(--cd-wine)]/25 bg-white/60 px-4 py-2.5 text-[var(--cd-ink)] outline-none placeholder:text-[var(--cd-ink)]/35 focus:border-[var(--cd-gold)]"
              />
            </div>

            <button
              type="submit"
              disabled={sending || !name || attend === null}
              className="w-full rounded-full bg-[var(--cd-wine)] px-6 py-3 text-sm uppercase tracking-[0.3em] text-[var(--cd-cream)] transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {sending ? t.rsvpSendingText : t.rsvpSubmitText}
            </button>
          </form>
        )}
      </Reveal>

      <Reveal delay={60}>
        <div className="mx-auto mt-14 max-w-[22rem]">
          <GoldDivider />
          <p className="cd-eyebrow mt-8">{t.guestbook}</p>
          <p className="mt-6 text-sm italic text-[var(--cd-ink)]/55">
            {t.noWishesYet}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
