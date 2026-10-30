import { WEEKDAYS_VI } from "./data";

export interface DateParts {
  day: string; // 03
  month: string; // 01
  year: string; // 2026
  dayNum: number;
  weekday: string; // Thứ Bảy
  longVi: string; // "Thứ Bảy, ngày 03 tháng 01 năm 2026"
}

export function parseDate(iso: string): DateParts {
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  const dt = new Date(Date.UTC(y, m - 1, d));
  const weekday = WEEKDAYS_VI[dt.getUTCDay()];
  const dd = String(d).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  return {
    day: dd,
    month: mm,
    year: String(y),
    dayNum: d,
    weekday,
    longVi: `${weekday}, ngày ${dd} tháng ${mm} năm ${y}`,
  };
}

/** Builds a Google Calendar "add event" URL. */
export function googleCalendarUrl(
  title: string,
  isoDate: string,
  time: string,
  location: string,
): string {
  const [y, m, d] = isoDate.split("-");
  const [hh, mm] = time.split(":");
  const start = `${y}${m}${d}T${hh}${mm}00`;
  const endH = String((parseInt(hh, 10) + 3) % 24).padStart(2, "0");
  const end = `${y}${m}${d}T${endH}${mm}00`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** VietQR compact image for a bank transfer. */
export function vietQrUrl(bin: string, account: string, name: string): string {
  return `https://img.vietqr.io/image/${bin}-${account}-compact2.png?accountName=${encodeURIComponent(
    name,
  )}`;
}

export function mapsEmbedUrl(address: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`;
}

export function mapsLinkUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
