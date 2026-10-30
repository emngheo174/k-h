// Invitation data for the Chung Đôi "Minimalism Đỏ Đậm" demo clone.
// Extracted verbatim from the source page's embedded RSC payload.
// Source: https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo

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
  date: string; // ISO YYYY-MM-DD
  banquetTime: string; // HH:mm
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
  groomFullName: "Đặng Hoàng Long",
  groomShortName: "Hoàng Long",
  groomFather: "Đặng Văn Thắng",
  groomMother: "Bùi Thị Mai",
  groomAddress: "Quận 1, TP. Hồ Chí Minh",
  brideFullName: "Vũ Bảo Ngọc",
  brideShortName: "Bảo Ngọc",
  brideFather: "Vũ Đức Trung",
  brideMother: "Ngô Thị Hạnh",
  brideAddress: "Quận 3, TP. Hồ Chí Minh",
  date: "2026-01-03",
  banquetTime: "18:00",
  guestReceptionTime: "17:30",
  ceremonyTime: "09:00",
  ceremonyHeader: "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ GIA",
  address:
    "Trung Tâm Hội Nghị White Palace, 194 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP. Hồ Chí Minh",
  heroPhoto: "/sites/chungdoi/gallery/hero.webp",
  galleryImages: [
    { src: "/sites/chungdoi/gallery/gallery-1.webp", position: { x: 0.5, y: 0.5 } },
    { src: "/sites/chungdoi/gallery/gallery-2.webp", position: { x: 0.5, y: 0.5 } },
    { src: "/sites/chungdoi/gallery/gallery-3.webp", position: { x: 0.5, y: 0.5 } },
    { src: "/sites/chungdoi/gallery/gallery-4.webp", position: { x: 0.5, y: 0.5 } },
    { src: "/sites/chungdoi/gallery/gallery-5.webp", position: { x: 0.5, y: 0.5 } },
    { src: "/sites/chungdoi/gallery/gallery-6.webp", position: { x: 0.5, y: 0.5 } },
    { src: "/sites/chungdoi/gallery/gallery-7.webp", position: { x: 0.5, y: 0.5 } },
  ],
  timelineEvents: [
    { id: "t1", time: "17:00", label: "Đón khách" },
    { id: "t2", time: "18:00", label: "Khai tiệc" },
    { id: "t3", time: "18:30", label: "Nghi thức cưới" },
    { id: "t4", time: "19:00", label: "Cắt bánh & nâng ly" },
    { id: "t5", time: "20:30", label: "Kết thúc tiệc" },
  ],
  dresscodeColors: ["#511419", "#8C3A3F", "#C9A24A", "#ECE4D8"],
  giftMethods: [
    {
      id: "g1",
      for: "groom",
      bankBin: "970436",
      bankCode: "VCB",
      bankName: "Vietcombank",
      accountName: "TRAN TUAN KIET",
      accountNumber: "1023456789",
    },
    {
      id: "g2",
      for: "bride",
      bankBin: "970407",
      bankCode: "TCB",
      bankName: "Techcombank",
      accountName: "LE MINH ANH",
      accountNumber: "9988776655",
    },
  ],
  music: {
    url: "/sites/chungdoi/audio/music.mp3",
    title: "Em Đồng Ý (I Do)",
    artist: "Đức Phúc x 911",
  },
};

// UI strings (verbatim Vietnamese labels from the source i18n bundle).
export const t = {
  envelopeGreeting: "Thân Mời",
  envelopeInviteMessage: "Đến dự buổi tiệc chung vui cùng gia đình",
  envelopeOpenButton: "Mở thiệp",
  saveTheDate: "SAVE THE DATE",
  announcement: "TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI",
  groomParentTitle: "Ông Bà",
  brideParentTitle: "Ông Bà",
  groomBirthOrder: "Trưởng Nam",
  brideBirthOrder: "Út Nữ",
  groomLabel: "Chú Rể",
  brideLabel: "Cô Dâu",
  storyTitle: "Câu Chuyện Tình Yêu",
  quote:
    "Hạnh phúc không phải là điểm đến, mà là con đường chúng ta đi cùng nhau.",
  ceremonyInfoTitle: "THÔNG TIN LỄ CƯỚI",
  receptionInfoTitle: "THÔNG TIN TIỆC CƯỚI",
  receptionAt: "Tiệc cưới sẽ diễn ra vào lúc:",
  atTime: "VÀO LÚC",
  partyVenueTitle: "Tiệc cưới sẽ tổ chức tại",
  mapTitle: "BẢN ĐỒ",
  addToCalendar: "Thêm vào lịch",
  countdown: "Cùng đếm ngược",
  countdownUnits: { days: "Ngày", hours: "Giờ", minutes: "Phút", seconds: "Giây" },
  timelineTitle: "LỊCH TRÌNH NGÀY CƯỚI",
  albumTitle: "Album Ảnh",
  dresscodeTitle: "DRESS CODE",
  dresscodeSubtitle: "Trang phục dự tiệc",
  giftTitle: "Mừng Cưới",
  giftBoxTitle: "Hộp Mừng Cưới",
  tapToOpen: "Nhấn để mở",
  qrScanText: "Quét mã để gửi mừng cưới",
  saveQR: "Lưu QR",
  giftBoxThankYou:
    "Cảm ơn bạn đã đồng hành cùng chúng mình trong ngày trọng đại!",
  rsvpTitle: "Xác nhận tham dự",
  rsvpSubtitle:
    "Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi. Xin xác nhận để chúng tôi chuẩn bị chu đáo nhất.",
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
  guestbook: "Sổ lưu bút",
  submitWishText: "GỬI LỜI CHÚC",
  noWishesYet: "Chưa có lời chúc nào. Hãy là người đầu tiên!",
  guestNamePlaceholder: "Nhập tên*",
  guestWishPlaceholder: "Nhập lời chúc*",
  wishSavedText: "Cảm ơn bạn! Lời chúc đã được lưu.",
  thankYouNote:
    "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!",
};

export const WEEKDAYS_VI = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];
