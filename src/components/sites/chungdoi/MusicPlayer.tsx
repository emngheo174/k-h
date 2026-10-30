"use client";

import { useEffect, useRef, useState } from "react";
import { invitation } from "./data";

export function MusicPlayer({ playing }: { playing: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);

  // When the invitation opens, try to start the track.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.volume = 0.6;
      audio
        .play()
        .then(() => setOn(true))
        .catch(() => setOn(false));
    }
  }, [playing]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (on) {
      audio.pause();
      setOn(false);
    } else {
      audio.play().then(() => setOn(true)).catch(() => {});
    }
  };

  if (!playing) return null;

  return (
    <>
      <audio ref={audioRef} src={invitation.music.url} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={on ? "Tắt nhạc" : "Bật nhạc"}
        title={`${invitation.music.title} — ${invitation.music.artist}`}
        className="fixed right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--cd-gold)]/60 bg-[#511419]/85 text-[var(--cd-gold-soft)] shadow-lg backdrop-blur"
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 cd-spin ${on ? "" : "cd-paused"}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
        </svg>
      </button>
    </>
  );
}
