// Shared font loaders for the "Minimalism Nâu" invitation. Declared once and
// reused by every route that renders the card (/, /chu-re, /co-dau).
import {
  EB_Garamond,
  Cormorant_Garamond,
  Lora,
  The_Nautigal,
  Ms_Madi,
  Playfair_Display,
  Dancing_Script,
} from "next/font/google";

const garamond = EB_Garamond({
  variable: "--font-cdn-garamond",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Single weight + minimal subsets: a multi-weight array with extended subsets
// fails the Turbopack build for Cormorant_Garamond on Next 16.3.5.
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

// Section-title display face (high-contrast, elegant). Vietnamese-complete.
const playfair = Playfair_Display({
  variable: "--font-cdn-playfair",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["600", "700"],
  display: "swap",
});

// Couple names — a flowing script with full Vietnamese support.
const dancing = Dancing_Script({
  variable: "--font-cdn-dancing",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["500", "600", "700"],
  display: "swap",
});

/** Combined CSS-variable classes; apply to the `.cdn-root` wrapper. */
export const fontClassName = `${garamond.variable} ${cormorant.variable} ${lora.variable} ${nautigal.variable} ${msMadi.variable} ${playfair.variable} ${dancing.variable}`;
