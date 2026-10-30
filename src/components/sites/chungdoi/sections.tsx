"use client";

import { invitation, t } from "./data";
import { parseDate, googleCalendarUrl, mapsEmbedUrl, mapsLinkUrl } from "./format";
import { Reveal, GoldDivider, HeartMark, Peony } from "./shared";

const date = parseDate(invitation.date);

/* ---------------------------------------------------------------- Hero --- */

export function Hero() {
  return (
    <section className="relative px-7 pt-16 pb-20 text-center">
      <Peony className="absolute -right-10 -top-6 w-28 opacity-90" />
      <Peony
        flip
        className="absolute -left-12 top-40 w-24 opacity-80"
      />

      <Reveal>
        <p className="cd-eyebrow">{t.saveTheDate}</p>
      </Reveal>

      <Reveal delay={120}>
        <h1 className="mt-8">
          <span className="cd-script block text-7xl leading-[0.9] text-[var(--cd-wine)]">
            {invitation.groomShortName}
          </span>
          <span className="my-2 block text-3xl text-[var(--cd-gold)]">&</span>
          <span className="cd-script block text-7xl leading-[0.9] text-[var(--cd-wine)]">
            {invitation.brideShortName}
          </span>
        </h1>
      </Reveal>

      <Reveal delay={200}>
        <div className="mx-auto mt-10 w-[78%] max-w-[22rem]">
          <div className="relative rounded-[2px] bg-white p-3 pb-10 shadow-[0_22px_45px_-18px_rgba(58,35,38,0.6)]">
            <div className="relative aspect-[3/4] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={invitation.heroPhoto}
                alt={`${invitation.groomShortName} & ${invitation.brideShortName}`}
                className="cd-kenburns h-full w-full object-cover"
              />
            </div>
            <p className="cd-script absolute bottom-1 left-1/2 -translate-x-1/2 text-3xl text-[var(--cd-wine)]">
              Save the date
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={260}>
        <div className="mt-10 flex items-center justify-center gap-5 text-[var(--cd-wine)]">
          <span className="text-sm uppercase tracking-[0.25em]">
            {date.weekday}
          </span>
          <span className="flex flex-col items-center">
            <span className="text-5xl leading-none">{date.day}</span>
          </span>
          <span className="text-sm uppercase tracking-[0.25em]">
            Tháng {date.month} · {date.year}
          </span>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------- Announcement --- */

function FamilyBlock({
  title,
  father,
  mother,
  childTitle,
  childName,
  address,
}: {
  title: string;
  father: string;
  mother: string;
  childTitle: string;
  childName: string;
  address: string;
}) {
  return (
    <div className="text-center">
      <p className="cd-eyebrow !tracking-[0.3em]">{title}</p>
      <p className="mt-4 text-lg text-[var(--cd-ink)]">
        Ông&nbsp;&nbsp;{father}
      </p>
      <p className="text-lg text-[var(--cd-ink)]">Bà&nbsp;&nbsp;{mother}</p>
      <p className="mt-3 text-sm italic text-[var(--cd-brick)]">
        {childTitle}
      </p>
      <p className="cd-script mt-1 text-4xl text-[var(--cd-wine)]">
        {childName}
      </p>
      <p className="mt-2 text-xs tracking-wide text-[var(--cd-ink)]/60">
        {address}
      </p>
    </div>
  );
}

export function Announcement() {
  return (
    <section className="relative px-8 py-16">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--cd-gold)]/60 to-transparent" />
      <Reveal>
        <p className="whitespace-pre-line text-center text-sm leading-7 tracking-[0.2em] text-[var(--cd-wine)]">
          {t.announcement}
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-12 space-y-10">
          <FamilyBlock
            title="NHÀ TRAI"
            father={invitation.groomFather}
            mother={invitation.groomMother}
            childTitle={t.groomBirthOrder}
            childName={invitation.groomFullName}
            address={invitation.groomAddress}
          />
          <GoldDivider />
          <FamilyBlock
            title="NHÀ GÁI"
            father={invitation.brideFather}
            mother={invitation.brideMother}
            childTitle={t.brideBirthOrder}
            childName={invitation.brideFullName}
            address={invitation.brideAddress}
          />
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------------------------------------------- Story --- */

export function Story() {
  return (
    <section className="relative px-8 py-16 text-center">
      <Peony flip className="absolute -left-10 top-4 w-24 opacity-80" />
      <Reveal>
        <p className="cd-eyebrow">{t.storyTitle}</p>
      </Reveal>
      <Reveal delay={120}>
        <HeartMark className="mx-auto mt-6 h-6 w-6 text-[var(--cd-gold)]" />
        <p className="cd-script mx-auto mt-6 max-w-[20rem] text-3xl leading-tight text-[var(--cd-wine)]">
          “{t.quote}”
        </p>
      </Reveal>
    </section>
  );
}

/* ---------------------------------------------------------- Event info --- */

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs uppercase tracking-[0.3em] text-[var(--cd-brick)]">
        {label}
      </span>
      <span className="text-lg text-[var(--cd-ink)]">{value}</span>
    </div>
  );
}

export function EventInfo() {
  const calUrl = googleCalendarUrl(
    `Lễ cưới ${invitation.groomShortName} & ${invitation.brideShortName}`,
    invitation.date,
    invitation.banquetTime,
    invitation.address,
  );

  return (
    <section
      className="relative px-8 py-16 text-center"
      style={{ backgroundColor: "rgba(81,20,25,0.04)" }}
    >
      {/* Venue illustration */}
      <Reveal>
        <div className="cd-divider mb-8 text-[var(--cd-gold)]">
          <HeartMark className="h-3 w-3" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sites/chungdoi/theme/castle-background.webp"
          alt=""
          aria-hidden="true"
          className="mx-auto w-64 opacity-90"
        />
      </Reveal>

      <Reveal delay={100}>
        <p className="cd-eyebrow mt-4">{t.ceremonyInfoTitle}</p>
        <p className="mt-5 whitespace-pre-line text-sm leading-7 tracking-wide text-[var(--cd-wine)]">
          {invitation.ceremonyHeader}
        </p>

        <div className="mx-auto my-8 h-10 w-px bg-gradient-to-b from-[var(--cd-gold)] to-transparent" />

        <p className="cd-eyebrow">{t.receptionInfoTitle}</p>
        <p className="mt-5 text-sm text-[var(--cd-ink)]/80">{t.receptionAt}</p>

        <div className="mt-6 inline-flex items-center gap-6">
          <InfoRow label="Giờ" value={invitation.banquetTime} />
          <div className="h-10 w-px bg-[var(--cd-gold)]/50" />
          <InfoRow label="Ngày" value={`${date.day}.${date.month}.${date.year}`} />
        </div>

        <p className="mt-8 text-sm uppercase tracking-[0.3em] text-[var(--cd-brick)]">
          {t.partyVenueTitle}
        </p>
        <p className="mx-auto mt-3 max-w-[22rem] text-base leading-relaxed text-[var(--cd-ink)]">
          {invitation.address}
        </p>

        <a
          href={calUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--cd-wine)]/40 px-7 py-2.5 text-xs uppercase tracking-[0.28em] text-[var(--cd-wine)] transition-colors hover:bg-[var(--cd-wine)] hover:text-[var(--cd-cream)]"
        >
          <HeartMark className="h-3.5 w-3.5" />
          {t.addToCalendar}
        </a>
      </Reveal>

      {/* Map */}
      <Reveal delay={120}>
        <p className="cd-eyebrow mt-14">{t.mapTitle}</p>
        <div className="mx-auto mt-6 overflow-hidden rounded-sm border-4 border-white shadow-[0_14px_30px_-16px_rgba(58,35,38,0.6)]">
          <iframe
            title="Bản đồ địa điểm tiệc cưới"
            src={mapsEmbedUrl(invitation.address)}
            className="h-56 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          href={mapsLinkUrl(invitation.address)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-xs uppercase tracking-[0.25em] text-[var(--cd-brick)] underline underline-offset-4"
        >
          Xem chỉ đường
        </a>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------ Timeline --- */

const TIMELINE_ICONS = [
  "/sites/chungdoi/theme/envelope-background.webp",
  "/sites/chungdoi/theme/cook.webp",
  "/sites/chungdoi/theme/camera.webp",
  "/sites/chungdoi/theme/cake.webp",
  "/sites/chungdoi/theme/flower2-decoration.webp",
];

export function Timeline() {
  return (
    <section className="relative px-8 py-16 text-center">
      <Reveal>
        <p className="cd-eyebrow">{t.timelineTitle}</p>
      </Reveal>

      <ol className="relative mx-auto mt-12 max-w-[20rem]">
        <span className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-[var(--cd-gold)]/40" />
        {invitation.timelineEvents.map((ev, i) => (
          <Reveal as="li" key={ev.id} delay={i * 80}>
            <div
              className={`relative flex items-center gap-4 py-4 ${
                i % 2 === 0 ? "flex-row" : "flex-row-reverse text-right"
              }`}
            >
              <div className="flex-1">
                <p className="text-xl text-[var(--cd-wine)]">{ev.time}</p>
                <p className="text-sm text-[var(--cd-ink)]/80">{ev.label}</p>
              </div>
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--cd-gold)]/60 bg-[var(--cd-paper)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={TIMELINE_ICONS[i % TIMELINE_ICONS.length]}
                  alt=""
                  aria-hidden="true"
                  className="h-9 w-9 object-contain"
                />
              </span>
              <div className="flex-1" />
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ----------------------------------------------------------- Dresscode --- */

export function Dresscode() {
  return (
    <section
      className="relative px-8 py-16 text-center"
      style={{ backgroundColor: "rgba(81,20,25,0.04)" }}
    >
      <Reveal>
        <p className="cd-eyebrow">{t.dresscodeTitle}</p>
        <p className="mt-3 text-sm italic text-[var(--cd-brick)]">
          {t.dresscodeSubtitle}
        </p>
      </Reveal>
      <Reveal delay={120}>
        <div className="mt-8 flex items-center justify-center gap-4">
          {invitation.dresscodeColors.map((c) => (
            <span
              key={c}
              className="h-14 w-14 rounded-full border border-black/5 shadow-inner"
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------- Footer --- */

export function Footer() {
  return (
    <footer
      className="relative px-8 pt-20 pb-16 text-center"
      style={{
        backgroundColor: "#511419",
        backgroundImage:
          "radial-gradient(120% 80% at 50% 100%, #6b1f26 0%, #511419 60%, #380d11 100%)",
      }}
    >
      <Peony className="pointer-events-none absolute -right-8 -top-10 w-24 opacity-80" />
      <HeartMark className="mx-auto h-7 w-7 text-[var(--cd-gold)]" />
      <h2 className="mt-6">
        <span className="cd-script block text-6xl text-[var(--cd-cream)]">
          {invitation.groomShortName}
        </span>
        <span className="my-1 block text-2xl text-[var(--cd-gold)]">&</span>
        <span className="cd-script block text-6xl text-[var(--cd-cream)]">
          {invitation.brideShortName}
        </span>
      </h2>
      <p className="mx-auto mt-8 max-w-[20rem] text-sm leading-relaxed text-[var(--cd-cream-deep)]/85">
        {t.thankYouNote}
      </p>
      <p className="mt-10 text-xs uppercase tracking-[0.3em] text-[var(--cd-gold-soft)]/70">
        {date.day}.{date.month}.{date.year}
      </p>
      <p className="mt-6 text-[0.7rem] uppercase tracking-[0.3em] text-[var(--cd-cream-deep)]/40">
        Chung Đôi
      </p>
    </footer>
  );
}
