import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolBySlug } from "@/utils/tools";
import { BMIClient } from "./BMIClient";

const tool = getToolBySlug("bmi-calculator")!;

export const metadata: Metadata = {
  title: tool.metaTitle || `${tool.name} | Toolbox`,
  description: tool.metaDescription || tool.description,
  keywords: ["bmi calculator", "body mass index", "bmi calculator online", "calculate bmi", "bmi formula"],
};

const seoContent = {
  whatIs: `<p>BMI (Body Mass Index) is a widely used measurement that helps assess whether a person has a healthy body weight for their height. It's a simple screening tool that can indicate potential health risks associated with being underweight, overweight, or obese.</p>
  <p>BMI is calculated by dividing a person's weight in kilograms by the square of their height in meters. While BMI doesn't directly measure body fat, it correlates strongly with body fat percentage and serves as a useful indicator for population-level health assessments.</p>`,
  formula: "BMI = weight (kg) / height² (m²)",
  howToUse: [
    "Select your preferred unit system (Metric or Imperial)",
    "Enter your height (in centimeters or feet/inches)",
    "Enter your weight (in kilograms or pounds)",
    "Click 'Calculate BMI' to see your result",
    "Review your BMI category and health recommendations",
  ],
  examples: [
    { input: "Height: 175cm, Weight: 70kg", output: "BMI: 22.9 (Normal weight)", explanation: "A person who is 175cm tall and weighs 70kg has a healthy BMI in the normal range." },
    { input: "Height: 165cm, Weight: 80kg", output: "BMI: 29.4 (Overweight)", explanation: "At this height and weight, the BMI falls into the overweight category, indicating potential health risks." },
  ],
  faq: [
    {
      question: "What is a healthy BMI range?",
      answer: "For most adults, a healthy BMI range is between 18.5 and 24.9. Below 18.5 is considered underweight, 25-29.9 is overweight, and 30 or above is obese. However, these ranges may vary based on age, gender, ethnicity, and muscle mass.",
    },
    {
      question: "Is BMI accurate for everyone?",
      answer: "BMI has limitations. It doesn't distinguish between muscle and fat, so athletes with high muscle mass may have a higher BMI despite being healthy. Similarly, older adults may have more body fat than their BMI suggests. Other factors like waist circumference and body composition provide additional context.",
    },
    {
      question: "Should I use metric or imperial units?",
      answer: "Use whichever system you're most comfortable with. The calculator automatically handles the conversion. Metric uses kilograms and centimeters, while Imperial uses pounds and feet/inches.",
    },
    {
      question: "Is my health data stored?",
      answer: "No. All calculations happen in your browser. Your height and weight information is never sent to any server or stored anywhere.",
    },
  ],
};

export default function BMIPage() {
  return (
    <ToolLayout tool={tool} seoContent={seoContent}>
      <BMIClient />
    </ToolLayout>
  );
}
