import type { Metadata } from "next";
import { Y2KDesignSystem } from "@/kits/y2k";

export const metadata: Metadata = { title: "Y2K · Design system" };

export default function Page() {
  return <Y2KDesignSystem />;
}
