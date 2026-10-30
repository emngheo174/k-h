import type { Metadata } from "next";
import { EB_Garamond, Beau_Rivage } from "next/font/google";
import "@/components/sites/chungdoi/theme.css";

const serif = EB_Garamond({
  variable: "--font-cd-serif",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const script = Beau_Rivage({
  variable: "--font-cd-script",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mẫu Thiệp Minimalism Đỏ Đậm - Thiệp Cưới Tối Giản Sang Trọng",
  description:
    "Mẫu thiệp cưới Minimalism tối giản với nền kem, tông đỏ đô, hoa mẫu đơn và dấu triện chữ Hỷ mạ vàng sang trọng. Xem demo thiệp cưới online miễn phí.",
  openGraph: {
    title: "Mẫu Thiệp Minimalism Đỏ Đậm - Thiệp Cưới Tối Giản Sang Trọng",
    description:
      "Mẫu thiệp cưới Minimalism tối giản với nền kem, tông đỏ đô, hoa mẫu đơn và dấu triện chữ Hỷ mạ vàng sang trọng. Xem demo thiệp cưới online miễn phí.",
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
    <div className={`cd-root ${serif.variable} ${script.variable}`}>
      {children}
    </div>
  );
}
