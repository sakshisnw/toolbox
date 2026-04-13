import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { tools } from "@/utils/tools";
import { PercentageClient } from "./PercentageClient";

export const metadata: Metadata = {
  title: "Percentage Calculator — Calculate Percentages Online",
  description:
    "Free percentage calculator. Find what percent X is of Y, calculate X% of a number, or find percentage change between two values.",
};

const tool = tools.find((t) => t.slug === "percentage-calculator")!;

export default function PercentagePage() {
  return (
    <ToolLayout tool={tool}>
      <PercentageClient />
    </ToolLayout>
  );
}
