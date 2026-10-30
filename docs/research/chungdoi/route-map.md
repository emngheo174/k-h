# Source → Local route map — Chung Đôi · Minimalism Đỏ Đậm

| Source | Local |
|---|---|
| `https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo` | `/vi/mau-thiep/minimalism-do-dam/demo` |

Source route is dynamic `/vi/mau-thiep/[templateId]/demo`; the clone pins the single
requested template as a static nested route (no param escaping needed).

## Files owned by this page
- `src/app/vi/mau-thiep/minimalism-do-dam/demo/layout.tsx` — fonts (EB Garamond + Beau Rivage), metadata
- `src/app/vi/mau-thiep/minimalism-do-dam/demo/page.tsx` — renders `<Invitation />`
- `src/components/sites/chungdoi/`
  - `data.ts` — invitation data + verbatim VI labels (`t`)
  - `format.ts` — date / calendar / VietQR / maps helpers
  - `theme.css` — scoped `.cd-root` palette, paper bg, reveal/motion
  - `shared.tsx` — Reveal, HeartMark, GoldDivider, Peony
  - `Invitation.tsx` — orchestrator (envelope-open state, scroll lock)
  - `Envelope.tsx` — cover screen (closed envelope + gold heart seal)
  - `sections.tsx` — Hero, Announcement, Story, EventInfo, Timeline, Dresscode, Footer
  - `Countdown.tsx`, `Gallery.tsx`, `Gift.tsx`, `Rsvp.tsx`, `MusicPlayer.tsx`
- `public/sites/chungdoi/` — `theme/` (9 decorations + paper), `gallery/` (hero + 7), `audio/music.mp3`

## Section order (clone)
Envelope cover → Hero/Save the Date → Announcement + families → Story/quote →
Event info (ceremony + reception + map) → Countdown → Timeline → Gallery →
Dresscode → Gift (VietQR) → RSVP + guestbook → Footer. + fixed music toggle.

## Checks run
- `npm run lint` ✓  · `npm run typecheck` ✓  · `npm run build` ✓ (route prerendered static)
- Content + assets verified served (HTTP 200) via local dev server.

## NOT verified (no browser available this session)
- Live side-by-side visual comparison vs. source (desktop + mobile).
- Exact source section order/layout geometry, scroll/reveal/envelope-open animations.
- These were reconstructed from the source's data, i18n, compiled CSS, JS bundles,
  and extracted assets — faithful to the design system but not pixel-confirmed.

## External/real-asset notes
- Background music `music.mp3` is the source's real track ("Em Đồng Ý (I Do)" —
  Đức Phúc x 911). Copyrighted; swap for production use.
- Map uses Google Maps embed; VietQR uses img.vietqr.io (live services).
- RSVP/guestbook are front-end only (source posts to an API); no backend wired.
