import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolBySlug } from "@/utils/tools";
import { AgeClient } from "./AgeClient";

const tool = getToolBySlug("age-calculator")!;

export const metadata: Metadata = {
  title: tool.metaTitle || `${tool.name} | Toolbox`,
  description: tool.metaDescription || tool.description,
  keywords: ["age calculator", "calculate age", "birthday calculator", "how old am i", "age in days"],
};

const seoContent = {
  whatIs: `<p>An age calculator is a simple tool that computes the exact time elapsed between two dates, typically from your date of birth to today or any other reference date. It provides detailed breakdowns including years, months, days, and even total hours and minutes.</p>
  <p>This tool is useful for:</p>
  <ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
    <li>Finding your exact age for official documents</li>
    <li>Calculating age differences between people</li>
    <li>Determining eligibility for age-restricted services</li>
    <li>Counting down to your next birthday</li>
    <li>Fun facts about how long you've lived</li>
  </ul>`,
  howToUse: [
    "Enter your date of birth in the first field",
    "Optionally, select a different date to calculate age on (defaults to today)",
    "View your age broken down into years, months, and days",
    "See extended stats including total days, hours, and minutes lived",
    "Check the countdown to your next birthday",
  ],
  faq: [
    {
      question: "How accurate is the age calculation?",
      answer: "Our calculator accounts for leap years and varying month lengths to provide accurate results. It counts full years, then remaining months, then days for precision.",
    },
    {
      question: "Can I calculate age on a future date?",
      answer: "Yes, you can select any date in the 'Calculate age on' field to see how old you will be on that date.",
    },
    {
      question: "Is my birth date information stored?",
      answer: "No, your date information is never stored or sent anywhere. All calculations happen in your browser and disappear when you close the page.",
    },
    {
      question: "How is the next birthday calculated?",
      answer: "The calculator determines your next birthday from today's date, counting the days remaining until that date occurs again.",
    },
  ],
};

export default function AgePage() {
  return (
    <ToolLayout tool={tool} seoContent={seoContent}>
      <AgeClient />
    </ToolLayout>
  );
}
