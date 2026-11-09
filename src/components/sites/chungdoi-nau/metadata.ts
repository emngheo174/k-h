import type { Metadata } from "next";
import { getCoupleView, invitation, type Side } from "./data";
import { parseDate } from "./format";

// Set NEXT_PUBLIC_SITE_URL in production so OG/Twitter image URLs resolve to
// absolute links; falls back to localhost during development.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const date = parseDate(invitation.date);
const prettyDate = `${date.weekday}, ${date.day}.${date.month}.${date.year}`;

/** Per-side metadata: names run host-first and the venue matches the host. */
export function createMetadata(side: Side): Metadata {
  const view = getCoupleView(side);
  const names = `${view.first.shortName} & ${view.second.shortName}`;
  const title = `${names} | Thiệp cưới`;
  const venueLabel = side === "bride" ? "nhà gái" : "nhà trai";
  const description =
    `Trân trọng kính mời bạn đến chung vui lễ thành hôn của ${view.first.fullName} ` +
    `& ${view.second.fullName}. ${prettyDate}, tại tư gia ${venueLabel}: ` +
    `${view.hostAddress}. Rất mong được đón tiếp bạn trong ngày trọng đại!`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [
      "thiệp cưới",
      "thiệp cưới online",
      "thiệp mời cưới",
      "wedding invitation",
      view.first.fullName,
      view.second.fullName,
      "Chung Đôi",
    ],
    authors: [{ name: names }],
    alternates: {
      canonical: side === "bride" ? "/co-dau" : "/chu-re",
    },
    openGraph: {
      title,
      description,
      siteName: "Chung Đôi",
      locale: "vi_VN",
      type: "website",
      url: side === "bride" ? "/co-dau" : "/chu-re",
      images: [
        {
          url: invitation.heroPhoto,
          alt: `${names} — Thiệp cưới`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [invitation.heroPhoto],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
