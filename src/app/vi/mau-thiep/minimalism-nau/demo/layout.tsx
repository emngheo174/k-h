import type { Metadata } from "next";
import {
  EB_Garamond,
  Cormorant_Garamond,
  Lora,
  The_Nautigal,
  Ms_Madi,
  Libre_Baskerville,
} from "next/font/google";
import "@/components/sites/chungdoi-nau/theme.css";

const garamond = EB_Garamond({
  variable: "--font-cdn-garamond",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cdn-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: "600",
  display: "swap",
});

const lora = Lora({
  variable: "--font-cdn-lora",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const nautigal = The_Nautigal({
  variable: "--font-cdn-nautigal",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

const msMadi = Ms_Madi({
  variable: "--font-cdn-msmadi",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const baskerville = Libre_Baskerville({
  variable: "--font-cdn-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mẫu Thiệp Minimalism Nâu - Thiệp Cưới Tối Giản Ấm Áp",
  description:
    "Mẫu thiệp cưới Minimalism tối giản với nền kem trắng và sắc nâu trầm ấm áp, khung ảnh polaroid và hoa khô thanh lịch. Xem demo thiệp cưới online miễn phí.",
  openGraph: {
    title: "Mẫu Thiệp Minimalism Nâu - Thiệp Cưới Tối Giản Ấm Áp",
    description:
      "Mẫu thiệp cưới Minimalism tối giản với nền kem trắng và sắc nâu trầm ấm áp, khung ảnh polaroid và hoa khô thanh lịch. Xem demo thiệp cưới online miễn phí.",
    siteName: "Chung Đôi",
    locale: "vi_VN",
    type: "website",
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`cdn-root ${garamond.variable} ${cormorant.variable} ${lora.variable} ${nautigal.variable} ${msMadi.variable} ${baskerville.variable}`}
    >
      {children}
    </div>
  );
}
