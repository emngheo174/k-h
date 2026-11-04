# Chung Đôi — Minimalism Nâu (minimalism_brown) demo

Source: https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo
Route (local): /vi/mau-thiep/minimalism-nau/demo

A Next.js wedding-invitation SPA. The landing **envelope cover** is server-rendered;
the **inner card** renders client-side after "Mở thiệp" (`?open=1`). All spec below was
extracted from the SSR HTML, the embedded RSC payload, and the real template module in
chunk `35426` (`data-testid="minimalism-brown-template"`). Browser extension was offline,
so values are from source code/markup rather than live rendering.

## Palette (authoritative, from template module)
- primary `#7c6a60` · muted `#918077` · eyebrow `#827771`
- cardFill `#f6eadd` · lightText `#ded9d7` · calendarBg `#7c6a60` · pageBg `#fff7f3`
- Envelope gradient `linear-gradient(to bottom right,#f3e6da,#e8d5c4,#dcc6b2)`, cardBg `rgba(255,250,245,.96)`
- Ambient leaf particle colors: `#c9a97e,#b89b78,#918077,#e6d6c4` (type: leaves)

## Fonts (exact stacks from source)
- base/headings `x` = `"Times New Roman", serif` (uppercase titles, fontWeight 700, 20px, ls .03em)
- `f` = `"Baskerville","Times New Roman", serif` (family info, announcement, ceremony/party details)
- `u` = `"Cormorant Garamond", serif` (hero event-heading eyebrow, birth-order)
- `y` = `"The Nautigal", cursive` (hero "&", mini-calendar month title)
- couple names = `"EB Garamond", serif`; couple-name "&" = `"Ms Madi", cursive`
- envelope body/date/button = `"Lora", serif`; envelope names = `"EB Garamond"`; envelope "&" = Baskerville

## Decorations / animations
- Envelope: heart wax seal (radial `#7c6a60`→`#5e4c42`, `seal-pulse` 2s), two `flower2` corners
  (top-left rotate 25deg; bottom-right mirrored -rotate 25deg, opacity .7), button `shine` sweep 3s,
  ambient falling leaves (`ambient-fall`, random left/size/sway/duration).
- Inner card: full-card `paper` overlay (mix-blend multiply, opacity .4); card sections have a
  `cardFill #f6eadd` backdrop + `paper` img (mix-blend multiply, opacity .5), rounded, soft shadow.
  Faint `leafBg`/`houseBg` background images per section (opacity .08–.12, mix-blend multiply).
  Floating `flower2`/`leafBg` sprigs animate with `mbFloat` (translateY 0↔-10px).
- No scroll-reveal fades in the real template (content is static + float/parallax only).

## Section order (inner card)
1. Header/Hero — event-heading eyebrow (Cormorant), couple names (Times italic, color eyebrow) with Nautigal "&", polaroid photo = hero photo rotated -4.78deg inside `frame-avatar.webp`, floating flower2.
2. Ceremony card — ceremonyInfoTitle; FamilyInfo grid (NHÀ TRAI | divider | NHÀ GÁI); announcement; couple full names (EB Garamond) + birth order; ceremony header/date/time list.
3. Gallery — title "Album ảnh cưới". `layout:"cards"` = 3D coverflow slider (component `eS`):
   auto-advances every 1400ms, pauses on hover, swipeable; side cards translateX 60%·l /
   translateZ -150·o / rotateY 45°·l / scale max(.7,1-.15o) / opacity max(.3,1-.25o); dots below;
   center card opens the lightbox.
4. Party/Reception card — receptionInfoTitle; date/time + **mini month calendar** (bg `#7c6a60`, title Nautigal) + countdown ("Cùng đếm ngược") + "Thêm vào lịch"; RSVP button → form.
5. Venue/Map — venue title + address + Google map iframe (rounded).
6. Dresscode — title + swatches `#001A08,#E1BC7C,#3B5D3B,#F5E6C8`.
7. Timeline — icons gate/cake/water, 5 events.
8. Guestbook — "Sổ lưu bút", paper-note bg, name + wish form + list.
9. Gift/Bank — two VietQR bank cards (tap to reveal QR).
10. Footer — thank-you note; "Chung Đôi" branding.
11. Floating music player (autoplay on open).

## Demo data
- Couple: **Nguyễn Hoàng Nam** (Hoàng Nam) & **Trần Thảo Vy** (Thảo Vy)
- Groom parents: Trần Quốc Hưng / Nguyễn Thị Hồng — Quận 1, TP.HCM
- Bride parents: Lê Văn Thành / Phạm Thị Lan — Quận 3, TP.HCM
- Date 2026-01-03 (Thứ Bảy). Ceremony 09:00 at tư gia. Reception 18:00, đón khách 17:30.
- Venue: Trung Tâm Hội Nghị White Palace, 194 Hoàng Văn Thụ, P.9, Q. Phú Nhuận, TP.HCM
- Timeline: 17:00 Đón khách · 18:00 Khai tiệc · 18:30 Nghi thức cưới · 19:00 Cắt bánh & nâng ly · 20:30 Kết thúc tiệc
- Dresscode: #001A08, #E1BC7C, #3B5D3B, #F5E6C8
- Gift: VCB TRAN TUAN KIET 1023456789 (bin 970436) · TCB LE MINH ANH 9988776655 (bin 970407)
- Music trackId `upbeat-008` (track URL is served from chungdoi's private music API — not resolvable
  statically; a local placeholder track is wired in and disclosed).

## Asset map (source → local public path)
Photos (assets.chungdoi.com/photo-library/design/<hash>.webp, 1448×2048 portrait / 2048×1360 land):
- hero/gallery-1 `1e0986…` → /sites/chungdoi-nau/gallery/hero.webp & gallery-1.webp
- gallery-2 `cea4d5…`, gallery-3 `6c5d0a…` (landscape), gallery-4 `3f8b94…`,
  gallery-5 `6f6851…`, gallery-6 `1c177f…`, gallery-7 `1bbb42…`
Theme (chungdoi.com/images/themes/minimalism-brown/*.webp) → /sites/chungdoi-nau/theme/*.webp:
- paper, house-background, leaf-background, flower2-decoration, frame-avatar, paper-note, gate, cake, water
Audio → /sites/chungdoi-nau/audio/music.mp3 (placeholder for `upbeat-008`).
</content>
</invoke>
