"use client";

import { useEffect, useState } from "react";
import { invitation, t } from "./data";

function diff(target: number) {
  let ms = Math.max(0, target - Date.now());
  const days = Math.floor(ms / 86400000);
  ms -= days * 86400000;
  const hours = Math.floor(ms / 3600000);
  ms -= hours * 3600000;
  const minutes = Math.floor(ms / 60000);
  ms -= minutes * 60000;
  const seconds = Math.floor(ms / 1000);
  return { days, hours, minutes, seconds };
}

/** Countdown row shown inside the reception panel ("Cùng đếm ngược"). */
export function Countdown() {
  const target = new Date(
    `${invitation.date}T${invitation.banquetTime}:00+07:00`,
  ).getTime();
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    const update = () => setTime(diff(target));
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
    <div className="w-full">
      <p
        className="text-center text-sm"
        style={{ color: "var(--cdn-muted)", fontFamily: "var(--cdn-baskerville)" }}
      >
        {t.countdown}
      </p>
      <div className="mt-3 flex items-center justify-center gap-2.5">
        {units.map((u) => (
          <div
            key={u.label}
            className="flex min-w-[52px] flex-col items-center rounded-[8px] px-2 py-2"
            style={{ backgroundColor: "rgba(124,106,96,0.08)" }}
          >
            <span
              className="text-2xl tabular-nums"
              style={{ color: "var(--cdn-primary)", fontFamily: "var(--cdn-baskerville)" }}
            >
              {u.value === undefined ? "--" : String(u.value).padStart(2, "0")}
            </span>
            <span
              className="mt-0.5 text-[0.62rem] uppercase tracking-[0.12em]"
              style={{ color: "var(--cdn-muted)" }}
            >
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
