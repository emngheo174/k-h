"use client";

import { useEffect, useState } from "react";
import { invitation, t } from "./data";
import { Reveal } from "./shared";

function diff(target: number) {
  const now = Date.now();
  let ms = Math.max(0, target - now);
  const days = Math.floor(ms / 86400000);
  ms -= days * 86400000;
  const hours = Math.floor(ms / 3600000);
  ms -= hours * 3600000;
  const minutes = Math.floor(ms / 60000);
  ms -= minutes * 60000;
  const seconds = Math.floor(ms / 1000);
  return { days, hours, minutes, seconds };
}

export function Countdown() {
  const target = new Date(
    `${invitation.date}T${invitation.banquetTime}:00+07:00`,
  ).getTime();
  // Start null to avoid hydration mismatch, then tick on the client.
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    const update = () => setTime(diff(target));
    // First paint via rAF (external callback) to avoid a synchronous
    // setState in the effect body; subsequent ticks via the interval.
    const raf = requestAnimationFrame(update);
    const id = setInterval(update, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, [target]);

  const units = [
    { label: t.countdownUnits.days, value: time?.days },
    { label: t.countdownUnits.hours, value: time?.hours },
    { label: t.countdownUnits.minutes, value: time?.minutes },
    { label: t.countdownUnits.seconds, value: time?.seconds },
  ];

  return (
    <section className="relative px-8 py-16 text-center">
      <Reveal>
        <p className="cd-eyebrow">{t.countdown}</p>
      </Reveal>
      <Reveal delay={120}>
        <div className="mt-10 flex items-center justify-center gap-3">
          {units.map((u, i) => (
            <div key={u.label} className="flex items-center gap-3">
              <div className="flex h-20 w-16 flex-col items-center justify-center rounded-sm border border-[var(--cd-gold)]/50 bg-[var(--cd-paper)]/70">
                <span className="text-3xl tabular-nums text-[var(--cd-wine)]">
                  {u.value === undefined
                    ? "--"
                    : String(u.value).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-[var(--cd-brick)]">
                  {u.label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span className="text-xl text-[var(--cd-gold)]">:</span>
              )}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
