"use client";

import { useEffect, useState } from "react";
import { Envelope } from "./Envelope";
import { MusicPlayer } from "./MusicPlayer";
import { Countdown } from "./Countdown";
import { Gallery } from "./Gallery";
import { Gift } from "./Gift";
import { Rsvp } from "./Rsvp";
import {
  Hero,
  Announcement,
  Story,
  EventInfo,
  Timeline,
  Dresscode,
  Footer,
} from "./sections";

export function Invitation() {
  const [open, setOpen] = useState(false);

  // Lock scroll while the envelope cover is showing.
  useEffect(() => {
    document.body.style.overflow = open ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="cd-stage">
      <main className="cd-card">
        <Hero />
        <Announcement />
        <Story />
        <EventInfo />
        <Countdown />
        <Timeline />
        <Gallery />
        <Dresscode />
        <Gift />
        <Rsvp />
        <Footer />
      </main>

      <Envelope open={open} onOpen={() => setOpen(true)} />
      <MusicPlayer playing={open} />
    </div>
  );
}
