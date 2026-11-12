// Invitation data for the Chung Đôi "Minimalism Nâu" (minimalism_brown) demo clone.
// Extracted verbatim from the source page's embedded RSC payload and template module.
// Source: https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo

export interface GiftMethod {
  id: string;
  for: "groom" | "bride";
  bankBin: string;
  bankCode: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  label: string;
}

export interface GalleryImage {
  src: string;
  position: { x: number; y: number };
}

export interface InvitationData {
  groomFullName: string;
  groomShortName: string;
  groomFather: string;
  groomMother: string;
  groomAddress: string;
  brideFullName: string;
  brideShortName: string;
  brideFather: string;
  brideMother: string;
  brideAddress: string;
  groomDate: string; // ISO YYYY-MM-DD
  brideDate: string; // ISO YYYY-MM-DD
  groomBanquetTime: string; // HH:mm
  brideBanquetTime: string; // HH:mm
  guestReceptionTime: string; // HH:mm
  ceremonyTime: string; // HH:mm
  ceremonyHeader: string;
  address: string;
  heroPhoto: string;
  galleryImages: GalleryImage[];
  timelineEvents: TimelineEvent[];
  dresscodeColors: string[];
  giftMethods: GiftMethod[];
  music: { url: string; title: string; artist: string };
}

export const invitation: InvitationData = {
  groomFullName: "Mai Trung Kiên",
  groomShortName: "Trung Kiên",
  groomFather: "Mai Thanh Sơn",
  groomMother: "Bùi Thị Nga",
  groomAddress: "Số 11 đường Đinh Gia Quế, phường Sơn Nam, Hưng Yên",
  brideFullName: "Đào Hồng Hạnh",
  brideShortName: "Hồng Hạnh",
  brideFather: "Đào Văn Quý",
  brideMother: "Hoàng Thị Chiên",
  brideAddress: "Xã Kim Bình, Tuyên Quang",
  groomDate: "2026-11-29",
  brideDate: "2026-11-28",
  groomBanquetTime: "10:30",
  brideBanquetTime: "16:00",
  guestReceptionTime: "10:30",
  ceremonyTime: "10:30",
  ceremonyHeader: "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ GIA",
  address:
    "Số 11 đường Đinh Gia Quế, phường Sơn Nam, Hưng Yên",
  heroPhoto: "/sites/chungdoi-nau/gallery/_ATU5191.jpg",
  galleryImages: [
    { src: "/sites/chungdoi-nau/gallery/_ATU4907.jpg", position: { x: 0.5, y: 0.5 } },
    { src: "/sites/chungdoi-nau/gallery/_ATU5268.jpg", position: { x: 0.5, y: 0.5 } },
    { src: "/sites/chungdoi-nau/gallery/_ATU5459.jpg", position: { x: 0.5, y: 0.5 } },
    { src: "/sites/chungdoi-nau/gallery/_ATU5451.jpg", position: { x: 0.5, y: 0.5 } },
    { src: "/sites/chungdoi-nau/gallery/TUA01485.jpg", position: { x: 0.5, y: 0.5 } },
    { src: "/sites/chungdoi-nau/gallery/_ATU5668.jpg", position: { x: 0.5, y: 0.5 } },
    { src: "/sites/chungdoi-nau/gallery/_ATU5588.jpg", position: { x: 0.5, y: 0.5 } },
    { src: "/sites/chungdoi-nau/gallery/_ATU5069.jpg", position: { x: 0.5, y: 0.5 } },
    { src: "/sites/chungdoi-nau/gallery/TUA02035.jpg", position: { x: 0.5, y: 0.5 } },
    { src: "/sites/chungdoi-nau/gallery/_ATU5865.jpg", position: { x: 0.5, y: 0.5 } },
    { src: "/sites/chungdoi-nau/gallery/_ATU5624.jpg", position: { x: 0.5, y: 0.5 } },
  ],
  timelineEvents: [
    { id: "t1", time: "17:00", label: "Đón khách" },
    { id: "t2", time: "18:00", label: "Khai tiệc" },
    { id: "t3", time: "18:30", label: "Nghi thức cưới" },
    { id: "t4", time: "19:00", label: "Cắt bánh & nâng ly" },
    { id: "t5", time: "20:30", label: "Kết thúc tiệc" },
  ],
  dresscodeColors: ["#001A08", "#E1BC7C", "#3B5D3B", "#F5E6C8"],
  giftMethods: [
    {
      id: "g1",
      for: "groom",
      bankBin: "970416",
      bankCode: "ACB",
      bankName: "ACB",
      accountName: "MAI TRUNG KIEN",
      accountNumber: "13037281",
    },
    {
      id: "g2",
      for: "bride",
      bankBin: "970407",
      bankCode: "TCB",
      bankName: "Techcombank",
      accountName: "DAO HONG HANH",
      accountNumber: "1907 0054 3710 11",
    },
  ],
  music: {
    // Source trackId "upbeat-008" is served from Chung Đôi's private music API and
    // isn't resolvable to a static URL; a local placeholder track is wired in.
    url: "/sites/chungdoi-nau/audio/music.mp3",
    title: "Nhạc nền",
    artist: "upbeat-008",
  },
};

// UI strings (verbatim Vietnamese labels from the source i18n bundle).
export const t = {
  envelopeGreeting: "Thân Mời",
  envelopeOpenButton: "Mở thiệp",
  eventHeading: "SAVE THE DATE",
  announcement: "TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI",
  groomSide: "NHÀ TRAI",
  brideSide: "NHÀ GÁI",
  groomBirthOrder: "Trưởng Nam",
  brideBirthOrder: "Trưởng Nữ",
  groomLabel: "Chú Rể",
  brideLabel: "Cô Dâu",
  parentFather: "Ông",
  parentMother: "Bà",
  ceremonyInfoTitle: "THÔNG TIN LỄ CƯỚI",
  receptionInfoTitle: "THÔNG TIN TIỆC CƯỚI",
  atTime: "VÀO LÚC",
  mapTitle: "BẢN ĐỒ",
  addToCalendar: "Thêm vào lịch",
  viewDirections: "Xem chỉ đường",
  countdown: "Cùng đếm ngược",
  countdownUnits: { days: "Ngày", hours: "Giờ", minutes: "Phút", seconds: "Giây" },
  timelineTitle: "LỊCH TRÌNH NGÀY CƯỚI",
  albumTitle: "Album ảnh cưới",
  dresscodeTitle: "DRESS CODE",
  dresscodeSubtitle: "Trang phục dự tiệc",
  giftTitle: "MỪNG CƯỚI",
  giftThankYou:
    "Cảm ơn bạn đã đồng hành cùng chúng mình trong ngày trọng đại!",
  tapToOpen: "Nhấn để mở",
  qrScanText: "Quét mã để gửi mừng cưới",
  rsvpTitle: "Xác nhận tham dự",
  rsvpSubtitle:
    "Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi. Xin xác nhận để chúng tôi chuẩn bị chu đáo nhất.",
  rsvpButton: "Xác nhận tham dự",
  rsvpNameLabel: "Tên của bạn",
  rsvpNamePlaceholder: "Nhập tên của bạn",
  rsvpAttendQuestion: "Bạn sẽ đến chứ?",
  rsvpAttendYes: "Tôi sẽ đến",
  rsvpAttendNo: "Rất tiếc, tôi không thể đến",
  rsvpGuestCountLabel: "Số lượng khách (bao gồm bạn)",
  rsvpMessageLabel: "Lời nhắn cho cô dâu chú rể",
  rsvpMessagePlaceholder: "Để lại lời nhắn (không bắt buộc)",
  rsvpSubmitText: "Gửi xác nhận",
  rsvpSendingText: "Đang gửi...",
  rsvpThankYouTitle: "Cảm ơn bạn!",
  rsvpConfirmationReceivedText: "Chúng tôi đã nhận được xác nhận của bạn.",
  rsvpLookForwardText: "Rất mong được gặp bạn trong ngày trọng đại!",
  rsvpDeclineMessageText:
    "Cảm ơn bạn đã hồi âm. Chúc bạn thật nhiều niềm vui và sức khỏe!",
  rsvpCloseText: "Đóng",
  guestbook: "SỔ LƯU BÚT",
  submitWishText: "Gửi lời chúc",
  noWishesYet: "Hãy dành lời chúc cho cô dâu & chú rể nhé!",
  guestNamePlaceholder: "Nhập tên*",
  guestWishPlaceholder: "Nhập lời chúc*",
  wishSavedText: "Cảm ơn bạn! Lời chúc đã được lưu.",
  thankYouNote:
    "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!",
  brand: "Chung Đôi",
};

// --------------------------------------------------------------- Sides ---
// The invitation is hosted by one family at a time. The groom's card ("nhà
// trai", /chu-re — the default) lists the groom first and shows the groom's
// home as the venue; the bride's card ("nhà gái", /co-dau) lists the bride
// first and shows the bride's home. Everything else is shared.

export type Side = "groom" | "bride";

export interface Person {
  shortName: string;
  fullName: string;
  father: string;
  mother: string;
  address: string;
  /** Precise venue pin for this family's home (its own location). */
  mapQuery: string;
  birthOrder: string;
  sideLabel: string; // NHÀ TRAI / NHÀ GÁI
  roleLabel: string; // Chú Rể / Cô Dâu
  giftFor: GiftMethod["for"];
}

export interface CoupleView {
  side: Side;
  /** The hosting family's wedding date and banquet time. */
  date: string;
  banquetTime: string;
  /** The hosting family, shown first on the card. */
  first: Person;
  /** The other family. */
  second: Person;
  /** Venue address for the hosting family (map + "add to calendar"). */
  hostAddress: string;
  /** Precise pin for the hosting family's venue map embed. */
  mapQuery: string;
}

// Each family hosts at its own home, so each side has its own precise map pin.
// Prefer exact coordinates (lat/lng) over a name search — a commune name alone
// drops the pin on the whole area, not the house.
// Groom's venue (nhà trai) — fixed pin carried over from the source template.
export const GROOM_MAP_QUERY = "20°40'24.0\"N 106°03'20.5\"E";
// Bride's venue (nhà gái) — replace with the bride home's exact coordinates.
// Placeholder falls back to the address string until real coordinates are set.
export const BRIDE_MAP_QUERY = "Phòng Khám Đa Khoa Khu Vực Kim Bình, Xã Kim Bình, Tuyên Quang, Việt Nam";

const groomPerson: Person = {
  shortName: invitation.groomShortName,
  fullName: invitation.groomFullName,
  father: invitation.groomFather,
  mother: invitation.groomMother,
  address: invitation.groomAddress,
  mapQuery: GROOM_MAP_QUERY,
  birthOrder: t.groomBirthOrder,
  sideLabel: t.groomSide,
  roleLabel: t.groomLabel,
  giftFor: "groom",
};

const bridePerson: Person = {
  shortName: invitation.brideShortName,
  fullName: invitation.brideFullName,
  father: invitation.brideFather,
  mother: invitation.brideMother,
  address: invitation.brideAddress,
  mapQuery: BRIDE_MAP_QUERY,
  birthOrder: t.brideBirthOrder,
  sideLabel: t.brideSide,
  roleLabel: t.brideLabel,
  giftFor: "bride",
};

export function getCoupleView(side: Side): CoupleView {
  const [first, second] =
    side === "bride" ? [bridePerson, groomPerson] : [groomPerson, bridePerson];
  return {
    side: side === "bride" ? "bride" : "groom",
    date: side === "bride" ? invitation.brideDate : invitation.groomDate,
    banquetTime:
      side === "bride"
        ? invitation.brideBanquetTime
        : invitation.groomBanquetTime,
    first,
    second,
    hostAddress: first.address,
    mapQuery: first.mapQuery,
  };
}

export const WEEKDAYS_VI = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];

// Mini-calendar weekday headers (Mon-first, matching the source party calendar).
export const CAL_WEEKDAYS_VI = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
