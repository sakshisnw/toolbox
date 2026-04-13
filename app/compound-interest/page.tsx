import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { tools } from "@/utils/tools";
import { CIClient } from "./CIClient";

export const metadata: Metadata = {
  title: "Compound Interest Calculator — Investment Growth Calculator",
  description:
    "Calculate compound interest and see how your investments grow over time. Supports annual, quarterly, monthly, and daily compounding.",
};

const tool = tools.find((t) => t.slug === "compound-interest")!;

export default function CIPage() {
  return (
    <ToolLayout tool={tool}>
      <CIClient />
    </ToolLayout>
  );
}
