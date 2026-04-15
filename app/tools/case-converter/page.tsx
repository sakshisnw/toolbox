import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolBySlug } from "@/utils/tools";
import { CaseConverterClient } from "./CaseConverterClient";

const tool = getToolBySlug("case-converter")!;

export const metadata: Metadata = {
  title: tool.metaTitle || `${tool.name} | Toolbox`,
  description: tool.metaDescription || tool.description,
  keywords: ["case converter", "uppercase converter", "lowercase converter", "title case", "camelCase converter"],
};

const seoContent = {
  whatIs: `<p>A case converter is a text transformation tool that converts text between different capitalization formats. This is useful for developers, writers, and anyone who needs to format text for specific purposes.</p>
  <p>Supported case formats include:</p>
  <ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
    <li><strong>UPPERCASE</strong> - All letters capitalized</li>
    <li><strong>lowercase</strong> - All letters in small case</li>
    <li><strong>Title Case</strong> - First letter of each word capitalized</li>
    <li><strong>Sentence case</strong> - First letter of sentence capitalized</li>
    <li><strong>camelCase</strong> - First word lowercase, rest capitalized (no spaces)</li>
    <li><strong>snake_case</strong> - All lowercase with underscores</li>
    <li><strong>kebab-case</strong> - All lowercase with hyphens</li>
  </ul>`,
  howToUse: [
    "Type or paste your text into the input area",
    "The tool automatically converts your text to all available formats",
    "Review the converted text in each format section",
    "Click the copy button next to any format to copy it",
    "Use the 'Clear' button to start over with new text",
  ],
  faq: [
    {
      question: "What is camelCase used for?",
      answer: "camelCase is commonly used in programming for variable and function names in JavaScript, Java, and other languages. Example: myVariableName.",
    },
    {
      question: "What's the difference between snake_case and kebab-case?",
      answer: "snake_case uses underscores between words (common in Python and Ruby) while kebab-case uses hyphens (common in CSS and URLs).",
    },
    {
      question: "Does it handle special characters?",
      answer: "Yes, special characters and punctuation are preserved. The conversion only affects alphabetic characters.",
    },
    {
      question: "Is my text stored?",
      answer: "No, all text processing happens in your browser. Your text is never sent to any server or stored anywhere.",
    },
  ],
};

export default function CaseConverterPage() {
  return (
    <ToolLayout tool={tool} seoContent={seoContent}>
      <CaseConverterClient />
    </ToolLayout>
  );
}
