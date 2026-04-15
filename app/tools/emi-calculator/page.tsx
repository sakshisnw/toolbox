import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolBySlug } from "@/utils/tools";
import { EMIClient } from "./EMIClient";

const tool = getToolBySlug("emi-calculator")!;

export const metadata: Metadata = {
  title: tool.metaTitle || `${tool.name} | Toolbox`,
  description: tool.metaDescription || tool.description,
  keywords: ["emi calculator", "loan calculator", "calculate emi", "home loan emi", "personal loan emi", "car loan emi"],
};

const seoContent = {
  whatIs: `<p>EMI (Equated Monthly Installment) is the fixed payment amount made by a borrower to a lender at a specified date each calendar month. It consists of both principal and interest components. Our EMI calculator helps you understand the true cost of borrowing.</p>
  <p>The EMI formula considers:</p>
  <ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
    <li>Principal amount (loan amount)</li>
    <li>Annual interest rate</li>
    <li>Loan tenure (duration)</li>
  </ul>`,
  formula: "EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]\nWhere: P = Principal, R = Monthly interest rate, N = Number of months",
  howToUse: [
    "Enter your loan amount (principal)",
    "Input the annual interest rate offered by your lender",
    "Select loan tenure in months or years",
    "The EMI is calculated automatically as you type",
    "Review the total interest and total payable amount",
    "Use the amortization schedule to see payment breakdown over time",
  ],
  examples: [
    { input: "₹500,000 at 8.5% for 5 years", output: "EMI: ₹10,250", explanation: "For a ₹5 lakh personal loan at 8.5% interest over 5 years, your monthly EMI would be ₹10,250." },
    { input: "₹3,000,000 at 7.2% for 20 years", output: "EMI: ₹23,648", explanation: "A home loan of ₹30 lakhs at 7.2% for 20 years would have a monthly EMI of ₹23,648." },
  ],
  faq: [
    {
      question: "How is EMI calculated?",
      answer: "EMI is calculated using the formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1], where P is the principal, R is the monthly interest rate (annual rate/12/100), and N is the loan tenure in months.",
    },
    {
      question: "What is amortization schedule?",
      answer: "An amortization schedule shows the breakdown of each EMI payment into principal and interest components, along with the remaining loan balance. Early payments contain more interest, while later payments contain more principal.",
    },
    {
      question: "Can I reduce my EMI?",
      answer: "You can reduce EMI by: increasing the down payment (reducing principal), finding a lower interest rate, or extending the loan tenure. However, longer tenures mean paying more total interest.",
    },
    {
      question: "Are results accurate for all banks?",
      answer: "Our calculator uses standard formulas. Actual EMI may vary slightly due to different day count conventions, processing fees, or prepayment options used by different lenders. Always verify with your bank.",
    },
  ],
};

export default function EMIPage() {
  return (
    <ToolLayout tool={tool} seoContent={seoContent}>
      <EMIClient />
    </ToolLayout>
  );
}
