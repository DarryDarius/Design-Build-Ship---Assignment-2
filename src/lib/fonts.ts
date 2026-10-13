import {
  DM_Sans,
  Fraunces,
  Instrument_Serif,
  Inter_Tight,
  Space_Grotesk,
  Unbounded,
} from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "opsz"],
});
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  preload: false,
});
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  preload: false,
});
const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  preload: false,
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  preload: false,
});

export const fontVariables = [
  fraunces,
  dmSans,
  instrumentSerif,
  interTight,
  unbounded,
  spaceGrotesk,
]
  .map((f) => f.variable)
  .join(" ");
