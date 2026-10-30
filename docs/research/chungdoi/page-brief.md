# Page Brief — Chung Đôi · Minimalism Đỏ Đậm (demo)

**Source URL:** https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo
**Route (origin):** `/vi/mau-thiep/[templateId]/demo` — Next.js SSR app, templateId `minimalism_darkred`
**Local route:** `/vi/mau-thiep/minimalism-do-dam/demo` (preserve source pathname; `[templateId]` escaped)
**Type:** Single-page Vietnamese online wedding invitation (demo), locale `vi` only.
**Title:** Mẫu Thiệp Minimalism Đỏ Đậm - Thiệp Cưới Tối Giản Sang Trọng
**Meta desc:** Mẫu thiệp cưới Minimalism tối giản với nền kem, tông đỏ đô, hoa mẫu đơn và dấu triện chữ Hỷ mạ vàng sang trọng. Xem demo thiệp cưới online miễn phí.

## Theme identity
"Minimalism" theme family, **Dark Red (Đỏ Đậm / Bordeaux)** color variant. Cream textured-paper
background, burgundy/wine tones, gold accents, burgundy+cream peony florals, gold wax heart seal.
Fonts: **EB Garamond** (serif headings/body) + **Beau Rivage** (script accent). Both Google Fonts.

### Palette (from theme dresscodeColors — representative theme colors)
- `#511419` — deep burgundy / wine (primary dark)
- `#8C3A3F` — muted brick red (secondary)
- `#C9A24A` — gold (accent)
- `#ECE4D8` — cream (background) ; paper texture overlay

## Couple & event data (from embedded RSC `initialData`)
- Groom: **Đặng Hoàng Long** (short: Hoàng Long). Parents: Đặng Văn Thắng & Bùi Thị Mai. Nhà trai, Quận 1, TP.HCM.
- Bride: **Vũ Bảo Ngọc** (short: Bảo Ngọc). Parents: Vũ Đức Trung & Ngô Thị Hạnh. Nhà gái, Quận 3, TP.HCM.
- Wedding date: **2026-01-03** (3 tháng 1, 2026). Banquet/time 18:00; guest reception 17:30.
- Ceremony: date 2026-01-03, time 09:00 — header "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI TƯ GIA".
- Venue (banquet): **Trung Tâm Hội Nghị White Palace, 194 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP. Hồ Chí Minh**.
- Music: `romantic-011` (background audio, toggle). URL TBD from live network.

### Timeline (showTimeline=true) — "Programme / Lịch trình"
17:00 Đón khách · 18:00 Khai tiệc · 18:30 Nghi thức cưới · 19:00 Cắt bánh & nâng ly · 20:30 Kết thúc tiệc

### Gallery (showGallery=true, layout "cards") — 7 photos + heroPhoto
Stored `public/sites/chungdoi/gallery/hero.webp` + `gallery-1..7.webp` (CDN returned JPEG despite .webp URL).

### Dresscode (showDresscode=true)
4 swatches: #511419, #8C3A3F, #C9A24A, #ECE4D8.

### Wedding gift (giftDisplayMode "envelope", showQRInline=false) — "Mừng Cưới"
VietQR, two accounts:
- Groom (Nhà trai): Vietcombank (VCB, bin 970436), TRAN TUAN KIET, 1023456789
- Bride (Nhà gái): Techcombank (TCB, bin 970407), LE MINH ANH, 9988776655
Envelope display → QR revealed on open (not inline). QR via img.vietqr.io likely.

## Section inventory (confirmed via i18n keys + data; order/labels to verify live)
1. **Cover / Envelope screen** (initialEnvelopeOpen=false): couple short names "Hoàng Long & Bảo Ngọc",
   ❦ divider, "3 tháng 1, 2026", "Thân Mời", button **"Mở thiệp"**. Closed burgundy envelope w/ gold heart seal.
2. **Hero / Save the Date** — "SAVE THE DATE", couple, date, hero photo (polaroid), peony + berry branch.
3. **Announcement / families** — Nhà trai / Nhà gái, parents' names, "Trân trọng kính mời".
4. **Event details** — ceremony/banquet date·time·address, "Add to calendar", map (castle illustration + White Palace).
5. **Countdown** — to 2026-01-03 (Ngày/Giờ/Phút/Giây).
6. **Timeline / Programme** — 5 events (icons: cake, cook/place-setting, etc.).
7. **Photo Gallery** — cards layout, camera illustration header.
8. **Dresscode** — 4 color swatches.
9. **Wedding Gift / Mừng Cưới** — envelope → VietQR for groom & bride.
10. **RSVP / Send a wish** — form: name, attendance (sẽ đến chứ?), message/note; "Gửi lời chúc".
11. **Thank you / footer** — thank-you note, Chung Đôi branding.
+ **Music player** toggle (fixed), **sticky/scroll reveal animations** throughout.

## Assets (downloaded → public/sites/chungdoi/)
- theme/: cake, camera, cook, castle-background, envelope-background, envelope-cover,
  flower2-decoration, papernote-background, paper (.webp, transparent PNGs-as-webp + textures)
- gallery/: hero.webp + gallery-1..7.webp
- Fonts: EB Garamond + Beau Rivage via next/font/google.

## Open items (need live browser)
- Exact Vietnamese section labels & copy, exact section order & layout geometry.
- Scroll/reveal/envelope-open animations, music URL, map embed, QR rendering.
- Responsive (mobile) layout; countdown behavior.
</content>
