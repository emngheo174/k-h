// Shared, dependency-free helpers for the /moi-online invitation tool.
// Safe to import from both server and client (no env or fetch access here).

export interface ScheduleOption {
  /** Giờ, e.g. "18 giờ". */
  h: string;
  /** Ngày, e.g. "thứ 6, ngày 27/11/2026". */
  d: string;
}

export interface InviteSettings {
  /** Message template with {tên} {xưng_hô} {tôi} {giờ} {ngày} placeholders. */
  tpl: string;
  /** Index into `opts` used when a guest has no per-guest schedule. */
  def: number;
  /** The selectable schedule options (the tool keeps two). */
  opts: ScheduleOption[];
}

/** One guest, client shape (camelCase, carries its DB id). */
export interface InviteGuest {
  id: string;
  /** Tên khách. */
  name: string;
  /** Cách gọi họ ({xưng_hô}), e.g. "anh". */
  callThem: string;
  /** Cách mình tự xưng ({tôi}), e.g. "em". */
  callSelf: string;
  /** Schedule index, or null to use the default. */
  schedule: number | null;
  /** Messenger username or profile link. */
  messenger: string;
  /** Đã gửi thiệp chưa. */
  sent: boolean;
}

export const DEFAULT_TEMPLATE =
  "💌 THIỆP MỜI ĐÁM CƯỚI 💌\n\n" +
  "Trân trọng mời {xưng_hô} {tên} đến dự bữa cơm thân mật cùng gia đình {tôi}\n\n" +
  "Nhân dịp bố mẹ {tôi} tổ chức đám cưới cho {tôi}, {tôi} rất mong {xưng_hô} sắp xếp thời gian đến chung vui và chứng kiến ngày trọng đại này của {tôi}.\n\n" +
  "🕒 Thời gian: {giờ}, {ngày} (dương lịch)\n" +
  "📍 Địa điểm: tại nhà riêng của {tôi}, 11 Đinh Gia Quế, TP Hưng Yên\n\n" +
  "Sự có mặt của {xưng_hô} là niềm vui và hạnh phúc lớn đối với {tôi} và gia đình.\n" +
  "Rất mong được đón tiếp {xưng_hô} trong ngày đặc biệt này\n" +
  "https://www.kienhanhwedding.io.vn";

export const DEFAULT_OPTS: ScheduleOption[] = [
  { h: "18 giờ", d: "thứ 6, ngày 27/11/2026" },
  { h: "10 giờ 30", d: "chủ nhật, ngày 29/11/2026" },
];

export const DEFAULT_SETTINGS: InviteSettings = {
  tpl: DEFAULT_TEMPLATE,
  def: 0,
  opts: DEFAULT_OPTS,
};

/** Preset (gọi, xưng) pairs for the quick-pick dropdown. */
export const PAIRS: [string, string][] = [
  ["bạn", "tôi"],
  ["em", "anh"],
  ["anh", "em"],
  ["chị", "em"],
  ["cô", "cháu"],
  ["chú", "cháu"],
  ["bác", "cháu"],
  ["thầy", "em"],
];

/** Guess how to self-address given how we call the guest. */
export function selfFor(callThem: string): string {
  const found = PAIRS.find((p) => p[0] === callThem);
  return found ? found[1] : "tôi";
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** The schedule option that applies to a guest (per-guest, else default). */
export function scheduleFor(settings: InviteSettings, guest: InviteGuest): ScheduleOption {
  const idx = guest.schedule == null ? settings.def : guest.schedule;
  return settings.opts[idx] ?? settings.opts[0] ?? { h: "", d: "" };
}

/** Render the personalized invitation message for a guest. */
export function buildMessage(settings: InviteSettings, guest: InviteGuest): string {
  const s = scheduleFor(settings, guest);
  return settings.tpl
    .split("{Xưng_hô}").join(capitalize(guest.callThem))
    .split("{xưng_hô}").join(guest.callThem)
    .split("{Tôi}").join(capitalize(guest.callSelf))
    .split("{tôi}").join(guest.callSelf)
    .split("{tên}").join(guest.name)
    .split("{giờ}").join(s.h)
    .split("{ngày}").join(s.d);
}

/** Normalize a Messenger username/link into a facebook.com/messages URL. */
export function messengerLink(raw: string): string {
  const m = (raw || "").trim();
  if (!m) return "";
  let id: string | undefined;
  let r: RegExpMatchArray | null;
  if (
    (r = m.match(/messages\/(?:e2ee\/)?t\/([^/?#\s]+)/i)) ||
    (r = m.match(/profile\.php\?id=(\d+)/)) ||
    (r = m.match(/(?:facebook|fb|m|messenger)\.(?:com|me)\/(?:t\/)?([^/?#\s]+)/i))
  ) {
    id = r[1];
  } else if (/^https?:/i.test(m)) {
    return m;
  } else {
    id = m.replace(/^@/, "");
  }
  const e2ee = /messages\/e2ee\//i.test(m) ? "e2ee/" : "";
  return `https://www.facebook.com/messages/${e2ee}t/${id}`;
}
