import { WEEKDAYS_VI } from "./data";

export interface DateParts {
  day: string; // 03
  dayNum: number; // 3
  month: string; // 01
  monthNum: number; // 1
  year: string; // 2026
  weekday: string; // Thứ Bảy
  /** "3 tháng 1, 2026" — matches the source envelope/date rendering. */
  longVi: string;
}

export function parseDate(iso: string): DateParts {
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  const dt = new Date(Date.UTC(y, m - 1, d));
  const weekday = WEEKDAYS_VI[dt.getUTCDay()];
  return {
    day: String(d).padStart(2, "0"),
    dayNum: d,
    month: String(m).padStart(2, "0"),
    monthNum: m,
    year: String(y),
    weekday,
    longVi: `${d} tháng ${m}, ${y}`,
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

/** VietQR compact image for a bank transfer (matches the source gift QR). */
export function vietQrUrl(bin: string, account: string, name: string): string {
  return `https://img.vietqr.io/image/${bin}-${account}-compact2.png?accountName=${encodeURIComponent(
    name,
  )}`;
}

/** Embeddable Google Maps iframe URL for a coordinate pin or address query. */
export function mapsEmbedUrl(query: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
}

/** "Open in Google Maps" link for a coordinate pin or address query. */
export function mapsLinkUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Days in a month (1-indexed month). */
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/** Weekday index (0=Sun) of the first day of a 1-indexed month. */
export function firstWeekdayOfMonth(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay();
}
