import type { Metadata } from "next";
import { StudySpots } from "./StudySpots";

export const metadata: Metadata = {
  title: "Study Spots · Hyde Park cafés",
  description: "Where to sit, sip, and get work done near the UChicago quad.",
};

export default function Page() {
  return <StudySpots />;
}
