import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { tools } from "@/utils/tools";
import { EMIClient } from "./EMIClient";

export const metadata: Metadata = {
  title: "EMI Calculator — Loan EMI & Interest Calculator",
  description:
    "Calculate your monthly EMI for home loan, car loan, or personal loan. Get full amortization schedule and total interest payable.",
};

const tool = tools.find((t) => t.slug === "emi-calculator")!;

export default function EMIPage() {
  return (
    <ToolLayout tool={tool}>
      <EMIClient />
    </ToolLayout>
  );
}
