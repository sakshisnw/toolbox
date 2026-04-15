import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolBySlug } from "@/utils/tools";
import { CIClient } from "./CIClient";

const tool = getToolBySlug("compound-interest")!;

export const metadata: Metadata = {
  title: tool.metaTitle || `${tool.name} | Toolbox`,
  description: tool.metaDescription || tool.description,
  keywords: ["compound interest calculator", "compound interest", "investment calculator", "fd calculator", "savings calculator"],
};

const seoContent = {
  whatIs: `<p>Compound interest is the interest calculated on the initial principal plus all accumulated interest from previous periods. Unlike simple interest, compound interest grows exponentially, making it a powerful force for wealth building.</p>
  <p>The key factors that affect compound interest are:</p>
  <ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
    <li><strong>Principal:</strong> The initial amount invested</li>
    <li><strong>Interest Rate:</strong> The annual rate of return</li>
    <li><strong>Time:</strong> The duration of investment</li>
    <li><strong>Frequency:</strong> How often interest compounds (monthly, quarterly, annually)</li>
  </ul>`,
  formula: "A = P × (1 + r/n)^(n×t)\nWhere: A = Final amount, P = Principal, r = Annual rate, n = Compounding frequency, t = Time in years",
  howToUse: [
    "Enter your principal investment amount",
    "Set the expected annual interest rate",
    "Choose the investment duration in years",
    "Select compounding frequency (monthly is most common for investments)",
    "View the year-by-year growth breakdown",
    "Analyze the chart to see the power of compounding over time",
  ],
  examples: [
    { input: "₹100,000 at 12% for 10 years (monthly)", output: "₹330,040", explanation: "An investment of ₹1 lakh at 12% annual return, compounded monthly for 10 years, grows to ₹3.3 lakhs - more than 3x your initial investment!" },
    { input: "₹500,000 at 8% for 20 years (annually)", output: "₹2,330,480", explanation: "The power of long-term compounding: ₹5 lakhs invested at 8% for 20 years grows to over ₹23 lakhs, demonstrating the 'eighth wonder of the world' effect." },
  ],
  faq: [
    {
      question: "What is the difference between simple and compound interest?",
      answer: "Simple interest is calculated only on the principal amount. Compound interest is calculated on the principal plus all accumulated interest, leading to exponential growth. Over long periods, compound interest can generate significantly higher returns.",
    },
    {
      question: "How does compounding frequency affect returns?",
      answer: "Higher compounding frequency (daily > monthly > quarterly > annually) results in slightly higher returns because interest is added more frequently. However, the difference between monthly and daily is usually minimal.",
    },
    {
      question: "What is the Rule of 72?",
      answer: "The Rule of 72 is a quick mental calculation: divide 72 by the annual interest rate to estimate how many years it takes for your investment to double. For example, at 12% interest, money doubles in approximately 6 years (72 ÷ 12 = 6).",
    },
    {
      question: "Can this calculator be used for loans?",
      answer: "Yes, but keep in mind that for loans, compound interest works against you. The same calculator can show how much interest you'll pay on a loan over time. For loans, use the EMI Calculator for payment schedules.",
    },
  ],
};

export default function CIPage() {
  return (
    <ToolLayout tool={tool} seoContent={seoContent}>
      <CIClient />
    </ToolLayout>
  );
}
