import type { Metadata } from "next";
import { EditorialDesignSystem } from "@/kits/editorial";

export const metadata: Metadata = { title: "Editorial · Design system" };

export default function Page() {
  return <EditorialDesignSystem />;
}
