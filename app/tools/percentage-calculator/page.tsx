import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolBySlug } from "@/utils/tools";
import { PercentageClient } from "./PercentageClient";

const tool = getToolBySlug("percentage-calculator")!;

export const metadata: Metadata = {
  title: tool.metaTitle || `${tool.name} | Toolbox`,
  description: tool.metaDescription || tool.description,
  keywords: ["percentage calculator", "calculate percentage", "percent change", "what percent", "percentage increase"],
};

const seoContent = {
  whatIs: `<p>A percentage calculator helps you perform common percentage calculations quickly and accurately. Whether you need to find what percentage one number is of another, calculate a percentage of a number, or determine percentage change between two values.</p>
  <p>This tool is useful for:</p>
  <ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
    <li>Calculating discounts and savings</li>
    <li>Determining percentage increase/decrease</li>
    <li>Finding what percentage a value represents</li>
    <li>Business and financial calculations</li>
    <li>School math problems</li>
  </ul>`,
  howToUse: [
    "Select the calculation mode you need",
    "Enter the first value (X)",
    "Enter the second value (Y)",
    "See the result automatically calculated",
    "Use the quick reference for common calculations",
  ],
  faq: [
    {
      question: "How do I calculate percentage increase?",
      answer: "Use the '% Change' mode. Enter the original value as 'From value' and the new value as 'To value'. The result shows the percentage change with + for increase or - for decrease.",
    },
    {
      question: "What is the formula for finding what percentage X is of Y?",
      answer: "The formula is: (X ÷ Y) × 100. For example, to find what percentage 25 is of 100: (25 ÷ 100) × 100 = 25%.",
    },
    {
      question: "How do I calculate X% of a number?",
      answer: "Use the 'X% of Y = ?' mode. Enter the percentage as X and the number as Y. The result will be the calculated percentage of that number.",
    },
  ],
};

export default function PercentagePage() {
  return (
    <ToolLayout tool={tool} seoContent={seoContent}>
      <PercentageClient />
    </ToolLayout>
  );
}
