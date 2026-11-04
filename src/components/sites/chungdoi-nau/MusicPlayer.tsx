"use client";

import { useEffect, useRef, useState } from "react";
import { invitation } from "./data";

/** Floating autoplay music toggle (template component `s.T`, themeColor primary). */
export function MusicPlayer({ playing }: { playing: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playing) return;
    audio.volume = 0.5;
    audio
      .play()
      .then(() => setOn(true))
      .catch(() => setOn(false));
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
        className="fixed bottom-40 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg backdrop-blur sm:bottom-24 sm:right-6"
        style={{ backgroundColor: "#7c6a60" }}
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 cdn-spin ${on ? "" : "cdn-paused"}`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
        </svg>
      </button>
    </>
  );
}
