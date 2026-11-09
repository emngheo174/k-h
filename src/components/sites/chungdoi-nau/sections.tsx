import { invitation, t, type CoupleView } from "./data";
import {
  parseDate,
  googleCalendarUrl,
  mapsEmbedUrl,
  mapsLinkUrl,
} from "./format";
import { ASSETS, BgDeco, FloatDeco, Panel } from "./shared";
import { Countdown } from "./Countdown";
import { MiniCalendar } from "./MiniCalendar";
import { Rsvp } from "./Rsvp";

/* ------------------------------------------------------------- Hero --- */

export function Hero({ view }: { view: CoupleView }) {
  return (
    <header className="relative z-10 flex flex-col items-center px-4 pb-20 pt-12 text-center md:pb-32">
      <BgDeco
        src={ASSETS.leafBg}
        className="left-[-24%] top-[2%] w-[52%] opacity-[0.12]"
      />
      <BgDeco
        src={ASSETS.houseBg}
        className="left-1/2 top-[30%] w-[130%] -translate-x-1/2 opacity-[0.08] mix-blend-multiply"
      />

      <p
        className="relative z-10 whitespace-pre-line text-[13px] uppercase md:text-[16px]"
        style={{
          fontFamily: "var(--cdn-cormorant)",
          color: "var(--cdn-eyebrow)",
          letterSpacing: "0.16em",
          fontWeight: 600,
        }}
      >
        {t.eventHeading}
      </p>

      <div className="relative z-10 mt-3 flex items-center justify-center gap-2 md:mt-4 md:gap-3">
        <span
          className="text-[clamp(30px,8.4vw,37px)] italic md:text-[46px]"
          style={{ fontFamily: "var(--cdn-serif)", color: "var(--cdn-eyebrow)" }}
        >
          {view.first.shortName}
        </span>
        <span
          className="text-[42px] leading-none md:text-[54px]"
          style={{ fontFamily: "var(--cdn-nautigal)", color: "var(--cdn-muted)" }}
        >
          &
        </span>
        <span
          className="text-[clamp(30px,8.4vw,37px)] italic md:text-[46px]"
          style={{ fontFamily: "var(--cdn-serif)", color: "var(--cdn-eyebrow)" }}
        >
          {view.second.shortName}
        </span>
      </div>

      <div className="relative z-10 mt-6 aspect-[1094/1554] w-[88%] max-w-[400px] md:mt-8 md:max-w-[520px]">
        <div className="absolute left-[11.5%] top-[8%] z-10 h-[77%] w-[72%] rotate-[-4.78deg] overflow-hidden bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={invitation.heroPhoto}
            alt={`${view.first.shortName} & ${view.second.shortName}`}
            className="h-full w-full"
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ASSETS.frameAvatar}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 size-full max-w-none drop-shadow-[4px_4px_4px_rgba(0,0,0,0.2)]"
        />
        <FloatDeco
          src={ASSETS.flower2}
          className="bottom-[-6%] left-[-5%] z-30 w-[34%]"
          dur={5}
          delay={0}
        />
      </div>
    </header>
  );
}

/* --------------------------------------------------------- Family --- */

function FamilySide({
  label,
  father,
  mother,
  address,
}: {
  label: string;
  father: string;
  mother: string;
  address: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-[12px]" style={{ color: "var(--cdn-muted)" }}>
        {label}
      </p>
      <p className="mt-1 text-[12px] font-semibold [overflow-wrap:anywhere]" style={{ color: "var(--cdn-primary)" }}>
        {t.parentFather}&nbsp;&nbsp;{father}
      </p>
      <p className="text-[12px] font-semibold [overflow-wrap:anywhere]" style={{ color: "var(--cdn-primary)" }}>
        {t.parentMother}&nbsp;&nbsp;{mother}
      </p>
      <p className="mt-1 whitespace-pre-line text-[10px] leading-tight" style={{ color: "var(--cdn-muted)" }}>
        {address}
      </p>
    </div>
  );
}

/* ------------------------------------------------------- Ceremony --- */

export function CeremonyCard({ view }: { view: CoupleView }) {
  const date = parseDate(view.date);
  const prettyDate = `${date.day}.${date.month}.${date.year}`;

  return (
    <section className="relative z-10 mx-auto w-[88%] max-w-[420px] md:max-w-[560px]">
      <FloatDeco src={ASSETS.flower2} className="bottom-[-6%] right-[-17%] z-20 w-[32%]" inner="-scale-x-100" dur={5.5} delay={0.6} />
      <FloatDeco src={ASSETS.leafBg} className="left-[-16%] top-[33%] z-20 w-[28%]" inner="rotate-[10.57deg]" dur={6} delay={0.3} />

      <Panel radius="rounded-[13px]" className="px-5 pb-10 pt-9 text-center">
        <div className="flex flex-col items-center gap-6" style={{ fontFamily: "var(--cdn-baskerville)" }}>
          <h2 className="cdn-title text-[20px]">{t.ceremonyInfoTitle}</h2>

          <div className="flex w-full items-stretch justify-center gap-3.5" style={{ fontFamily: "var(--cdn-baskerville)" }}>
            <div className="flex-1">
              <FamilySide label={view.first.sideLabel} father={view.first.father} mother={view.first.mother} address={view.first.address} />
            </div>
            <div className="w-px shrink-0 self-center" style={{ height: "50px", backgroundColor: "rgba(124,106,96,0.33)" }} />
            <div className="flex-1">
              <FamilySide label={view.second.sideLabel} father={view.second.father} mother={view.second.mother} address={view.second.address} />
            </div>
          </div>

          <p className="flex flex-col gap-1 whitespace-pre-line text-[16px] md:text-[20px]" style={{ fontFamily: "var(--cdn-baskerville)", color: "var(--cdn-primary)" }}>
            {t.announcement}
          </p>

          <div className="flex flex-col items-center gap-4">
            <CoupleName shortName={view.first.shortName} fullName={view.first.fullName} birthOrder={view.first.birthOrder} />
            <div className="text-[35px]" style={{ color: "var(--cdn-primary)", fontFamily: "var(--cdn-msmadi)" }}>
              &
            </div>
            <CoupleName shortName={view.second.shortName} fullName={view.second.fullName} birthOrder={view.second.birthOrder} />
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="whitespace-pre-line text-[14px] leading-7" style={{ color: "var(--cdn-primary)", fontFamily: "var(--cdn-baskerville)" }}>
              {invitation.ceremonyHeader}
            </p>
            <div className="flex items-center justify-center gap-3 text-[15px]" style={{ fontFamily: "var(--cdn-baskerville)" }}>
              <span style={{ color: "var(--cdn-primary)" }}>{prettyDate}</span>
              <span className="text-[24px] leading-none" style={{ color: "rgba(124,106,96,0.4)" }}>
                |
              </span>
              <span style={{ color: "var(--cdn-muted)" }}>{view.banquetTime}</span>
            </div>
          </div>
        </div>
      </Panel>
    </section>
  );
}

function CoupleName({ fullName, birthOrder }: { shortName: string; fullName: string; birthOrder: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[43px] leading-[52px] md:text-[46px] md:leading-[60px]" style={{ fontFamily: "var(--cdn-garamond)", color: "var(--cdn-primary)" }}>
        {fullName}
      </span>
      {/* <span className="text-[10px] uppercase" style={{ color: "var(--cdn-muted)", fontFamily: "var(--cdn-cormorant)", letterSpacing: "0.14em" }}>
        {birthOrder}
      </span> */}
    </div>
  );
}

/* ------------------------------------------------------- Reception --- */

export function PartyCard({ view }: { view: CoupleView }) {
  const date = parseDate(view.date);
  const prettyDate = `${date.day}.${date.month}.${date.year}`;
  const calUrl = googleCalendarUrl(
    `Lễ cưới ${view.first.shortName} & ${view.second.shortName}`,
    view.date,
    view.banquetTime,
    view.hostAddress,
  );
  return (
    <section className="relative z-10 mx-auto mb-4 w-[88%] max-w-[420px] md:max-w-[560px]">
      <FloatDeco src={ASSETS.leafBg} className="right-[-16%] top-[15%] z-20 w-[28%]" inner="-scale-y-100 rotate-[169.43deg]" dur={5.5} delay={0.9} />
      <FloatDeco src={ASSETS.flower2} className="bottom-[-6%] left-[-21%] z-20 w-[32%]" dur={6} delay={0.2} />

      <Panel radius="rounded-[10px]" className="px-5 py-9 text-center">
        <div className="flex flex-col items-center gap-6" style={{ fontFamily: "var(--cdn-baskerville)" }}>
          <h2 className="cdn-title text-[20px]">{t.receptionInfoTitle}</h2>

          <div className="flex items-center justify-center gap-4 text-[15px]">
            <div className="flex flex-col items-center">
              <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--cdn-muted)" }}>
                {t.atTime}
              </span>
              <span className="mt-1 text-2xl" style={{ color: "var(--cdn-primary)" }}>
                {view.banquetTime}
              </span>
            </div>
            <div className="h-6 w-[2px]" style={{ backgroundColor: "var(--cdn-primary)" }} />
            <div className="flex flex-col items-center">
              <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--cdn-muted)" }}>
                {t.countdownUnits.days}
              </span>
              <span className="mt-1 text-2xl" style={{ color: "var(--cdn-primary)" }}>
                {prettyDate}
              </span>
            </div>
          </div>

          <MiniCalendar view={view} />
          <Countdown view={view} />

          <a
            href={calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-sm underline underline-offset-4"
            style={{ color: "var(--cdn-primary)", fontFamily: "var(--cdn-serif)" }}
          >
            {t.addToCalendar}
          </a>

          <Rsvp />
        </div>
      </Panel>
    </section>
  );
}

/* ----------------------------------------------------------- Venue --- */

export function Venue({ view }: { view: CoupleView }) {
  return (
    <div className="relative z-10 overflow-x-clip">
      <BgDeco src={ASSETS.houseBg} className="left-1/2 top-[-10%] w-[135%] -translate-x-1/2 opacity-[0.08] mix-blend-multiply" />
      <div className="relative z-10 flex w-full flex-col items-center px-6 pb-8 pt-8 text-center">
        <p className="mx-auto mt-2 max-w-[280px] text-[12px] leading-relaxed md:max-w-[440px] md:text-[14px]" style={{ color: "var(--cdn-muted)", fontFamily: "var(--cdn-baskerville)" }}>
          {view.hostAddress}
        </p>
        <div className="mt-3 h-[268px] w-full max-w-[338px] overflow-hidden rounded-[15px] md:h-[380px] md:max-w-[560px]" style={{ border: "1px solid var(--cdn-primary)" }}>
          <iframe
            title="Bản đồ địa điểm tiệc cưới"
            src={mapsEmbedUrl(view.mapQuery)}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          href={mapsLinkUrl(view.mapQuery)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-xs uppercase tracking-[0.2em] underline underline-offset-4"
          style={{ color: "var(--cdn-primary)" }}
        >
          {t.viewDirections}
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- Dresscode --- */

export function Dresscode() {
  return (
    <div className="relative z-10 flex flex-col items-center px-6 py-8 text-center">
      <h2 className="cdn-title text-[20px]" style={{ fontFamily: "var(--cdn-serif)" }}>
        {t.dresscodeTitle}
      </h2>
      <p className="mt-2 text-sm italic" style={{ color: "var(--cdn-muted)" }}>
        {t.dresscodeSubtitle}
      </p>
      <div className="mt-6 flex items-center justify-center gap-4">
        {invitation.dresscodeColors.map((c) => (
          <span
            key={c}
            className="h-12 w-12 rounded-full border border-black/5 shadow-inner"
            style={{ backgroundColor: c }}
            title={c}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------- Timeline --- */

const TIMELINE_ICONS = [ASSETS.gate, ASSETS.cake, ASSETS.water];

export function Timeline() {
  return (
    <section className="relative z-10 mx-auto my-4 w-[88%] max-w-[420px] md:max-w-[560px]">
      <FloatDeco src={ASSETS.flower2} className="right-[-17%] top-[-13%] z-20 w-[27%]" inner="-scale-x-100 rotate-[-6.94deg]" dur={5} delay={0.7} />
      <Panel radius="rounded-[10px]" className="px-6 py-9">
        <div className="relative z-10 flex flex-col gap-4 px-2">
          <h2 className="cdn-title text-center text-[20px]" style={{ fontFamily: "var(--cdn-serif)" }}>
            {t.timelineTitle}
          </h2>
          {invitation.timelineEvents.map((ev, i) => (
            <div key={ev.id} className="flex items-center gap-[30px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={TIMELINE_ICONS[i % TIMELINE_ICONS.length]}
                alt=""
                aria-hidden
                className="block h-9 w-9 shrink-0 object-contain"
              />
              <div className="flex flex-1 items-baseline justify-between text-[13px] md:text-[15px]">
                <span style={{ color: "var(--cdn-primary)", fontFamily: "var(--cdn-serif)" }}>
                  {ev.label}
                </span>
                <span style={{ color: "var(--cdn-muted)", fontFamily: "var(--cdn-serif)" }}>
                  {ev.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

/* ---------------------------------------------------------- Footer --- */

export function Footer() {
  return (
    <>
      <footer className="relative z-10 flex flex-col items-center px-6 pb-10 text-center">
        <p className="text-[12px] md:text-[13px]" style={{ color: "var(--cdn-primary)", fontFamily: "var(--cdn-serif)" }}>
          {t.thankYouNote}
        </p>
      </footer>
    </>
  );
}
