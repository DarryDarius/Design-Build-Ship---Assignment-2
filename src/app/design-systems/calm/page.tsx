import type { Metadata } from "next";
import { CalmDesignSystem } from "@/kits/calm";

export const metadata: Metadata = { title: "Calm · Design system" };

export default function Page() {
  return <CalmDesignSystem />;
}
