"use client";

import { useEffect, useState } from "react";
import { Envelope } from "./Envelope";
import { MusicPlayer } from "./MusicPlayer";
import { Gallery } from "./Gallery";
import { Guestbook } from "./Guestbook";
import { Gift } from "./Gift";
import {
  Hero,
  CeremonyCard,
  PartyCard,
  Venue,
  Dresscode,
  Timeline,
  Footer,
} from "./sections";

export function Invitation() {
  const [open, setOpen] = useState(false);
  const [shaking, setShaking] = useState(false);

  // Lock scroll while the envelope cover is showing.
  useEffect(() => {
    document.body.style.overflow = open ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Shake the card briefly, then reveal the invitation.
  const handleOpen = () => {
    if (open || shaking) return;
    setShaking(true);
    window.setTimeout(() => setOpen(true), 650);
  };

  return (
    <div className="cdn-stage">
      <main className="cdn-card" style={{ backgroundColor: "var(--cdn-page-bg)" }}>
        {/* full-card paper texture */}
        <div aria-hidden className="cdn-paper-overlay pointer-events-none absolute inset-0 z-0" />

        <Hero />
        <CeremonyCard />
        <Gallery />
        <PartyCard />
        <Venue />
        {/* <Dresscode /> */}
        {/* <Timeline /> */}
        <Guestbook />
        <Gift />
        <Footer />
      </main>

      <Envelope open={open} shaking={shaking} onOpen={handleOpen} />
      <MusicPlayer playing={open} />
    </div>
  );
}
