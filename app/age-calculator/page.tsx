import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { tools } from "@/utils/tools";
import { AgeClient } from "./AgeClient";

export const metadata: Metadata = {
  title: "Age Calculator — Calculate Your Exact Age",
  description: "Calculate your exact age in years, months, days, hours, and minutes from your date of birth.",
};

const tool = tools.find((t) => t.slug === "age-calculator")!;

export default function AgePage() {
  return (
    <ToolLayout tool={tool}>
      <AgeClient />
    </ToolLayout>
  );
}
