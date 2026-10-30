# Hướng dẫn Deploy — Thiệp cưới Minimalism Đỏ Đậm

Tài liệu tham khảo để deploy app Next.js này lên production.
Trang clone: `/vi/mau-thiep/minimalism-do-dam/demo`

Stack: **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4**.
`next.config.ts` đã bật `output: "standalone"` (gói gọn, chạy nhẹ khi self-host).

---

## 0. Kiểm tra trước khi deploy
```bash
npm run check   # chạy lint + typecheck + build (phải pass hết)
```
Hoặc tách lẻ: `npm run lint` · `npm run typecheck` · `npm run build`.

---

## 1. Vercel — đơn giản nhất (khuyến nghị)

1. Push code lên GitHub (xem mục *Đẩy lên GitHub* bên dưới).
2. Vào <https://vercel.com> → **Add New → Project → Import** repo GitHub.
3. Vercel tự nhận Next.js — giữ nguyên cấu hình mặc định → **Deploy**.
4. Xong: có domain `*.vercel.app` + HTTPS sẵn.
5. Mỗi lần `git push` nhánh chính → **tự build & deploy lại**. Push nhánh khác → tạo *Preview URL*.

> Không cần sửa gì thêm. `output: "standalone"` không ảnh hưởng Vercel.

---

## 2. Docker — self-host trên VPS (có sẵn file)

Repo đã có `Dockerfile` và `docker-compose.yml`.

```bash
# Build + chạy nền
docker compose up -d --build

# Xem log / dừng
docker compose logs -f
docker compose down
```
Mặc định app chạy trong container ở cổng 3000 (xem `docker-compose.yml` để map cổng ra ngoài, ví dụ `80:3000`).
Thường đặt sau **Nginx reverse proxy** để gắn domain + SSL (Let's Encrypt / Certbot).

---

## 3. Node thường — VPS không Docker

```bash
npm ci            # cài dependencies sạch theo package-lock
npm run build     # build production
npm start         # chạy (mặc định cổng 3000) — hoặc: PORT=8080 npm start
```
Giữ tiến trình chạy nền bằng **PM2**:
```bash
npm i -g pm2
pm2 start "npm start" --name thiep-cuoi
pm2 save && pm2 startup
```
Rồi reverse proxy qua Nginx tới `localhost:3000`.

---

## Đẩy lên GitHub

`.gitignore` đã loại `node_modules/` và `.next/`.

```bash
git add -A
git commit -m "Thiệp cưới Minimalism Đỏ Đậm"
git branch -M main
git remote add origin git@github.com:<username>/<repo>.git
git push -u origin main
```

---

## Yêu cầu môi trường
- **Node.js >= 24** (xem `engines` trong `package.json` và `.nvmrc`). Vercel tự lo; VPS cần cài đúng phiên bản.
- Hiện **chưa dùng biến môi trường nào** (chưa có backend). Khi thêm API/DB sẽ cần cấu hình `.env` + khai báo trên Vercel (Settings → Environment Variables).

---

## Những điểm cần hoàn thiện trước khi dùng thật

### 1. Bản quyền assets (quan trọng)
Bản clone đang dùng **ảnh, hình minh họa và nhạc của Chung Đôi / bên thứ ba**:
- `public/sites/chungdoi/gallery/` — ảnh cưới
- `public/sites/chungdoi/theme/` — hình minh họa (hoa, phong bì, lâu đài…)
- `public/sites/chungdoi/audio/music.mp3` — bài hát có bản quyền ("Em Đồng Ý")

→ **Thay bằng tài sản của riêng bạn** trước khi public repo hoặc dùng thương mại.
Phần code / layout / logic là của bạn, giữ nguyên được.

### 2. RSVP & Sổ lưu bút chưa có backend
Hiện form chỉ chạy **front-end** (bấm gửi → hiện cảm ơn, *không lưu đâu cả*).
Muốn nhận được xác nhận của khách, chọn 1 hướng:
- **Next.js Route Handler** (`src/app/api/rsvp/route.ts`) + database (Postgres/Supabase/MongoDB…).
- Hoặc nhẹ nhàng: đẩy vào **Google Sheet / Google Form**, hay dịch vụ như Formspree.
Chỗ cần sửa: hàm `submit` trong `src/components/sites/chungdoi/Rsvp.tsx`.

### 3. Dịch vụ ngoài
- **Bản đồ**: Google Maps embed (cần mạng khi người xem mở; không cần API key cho iframe embed cơ bản).
- **QR chuyển khoản**: `img.vietqr.io` (ảnh QR sinh tự động từ số tài khoản). Cần internet.

### 4. Dữ liệu thiệp
Sửa thông tin cặp đôi / ngày / địa điểm / nhạc / tài khoản… tại một chỗ duy nhất:
`src/components/sites/chungdoi/data.ts`.

---

## Cấu trúc nhanh (để phát triển tiếp)
```
src/app/vi/mau-thiep/minimalism-do-dam/demo/   # route (layout + page)
src/components/sites/chungdoi/                  # toàn bộ component + data + style
  data.ts        # ← dữ liệu thiệp & chữ tiếng Việt
  format.ts      # helper ngày/QR/maps
  theme.css      # màu, nền giấy, animation (scoped .cd-root)
  Invitation.tsx # ghép các section + trạng thái mở thiệp
  ... (Envelope, sections, Countdown, Gallery, Gift, Rsvp, MusicPlayer)
public/sites/chungdoi/                          # ảnh, hình minh họa, nhạc
docs/research/chungdoi/                         # tư liệu reverse-engineer
```
