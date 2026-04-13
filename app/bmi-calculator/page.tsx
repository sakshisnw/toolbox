import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { tools } from "@/utils/tools";
import { BMIClient } from "./BMIClient";

export const metadata: Metadata = {
  title: "BMI Calculator — Calculate Your Body Mass Index",
  description:
    "Free online BMI calculator. Enter your weight and height to instantly calculate your Body Mass Index and see your health category.",
};

const tool = tools.find((t) => t.slug === "bmi-calculator")!;

export default function BMIPage() {
  return (
    <ToolLayout tool={tool}>
      <BMIClient />
    </ToolLayout>
  );
}
