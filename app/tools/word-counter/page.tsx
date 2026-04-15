import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolBySlug } from "@/utils/tools";
import { WordCounterClient } from "./WordCounterClient";

const tool = getToolBySlug("word-counter")!;

export const metadata: Metadata = {
  title: tool.metaTitle || `${tool.name} | Toolbox`,
  description: tool.metaDescription || tool.description,
  keywords: ["word counter", "character count", "sentence counter", "text analysis", "reading time"],
};

const seoContent = {
  whatIs: `<p>A word counter is an essential writing tool that analyzes text and provides detailed statistics including word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time.</p>
  <p>Word counters are used by:</p>
  <ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
    <li>Writers and bloggers to meet word count requirements</li>
    <li>Students for essays and assignments</li>
    <li>Social media managers for platform limits</li>
    <li>SEO professionals for content optimization</li>
    <li>Translators for project estimation</li>
  </ul>`,
  howToUse: [
    "Type or paste your text into the text area",
    "Statistics will update automatically as you type",
    "View word count, character count, sentences, and paragraphs",
    "Check estimated reading and speaking time",
    "Use the 'Clear' button to start fresh",
  ],
  faq: [
    {
      question: "How is reading time calculated?",
      answer: "Reading time is based on the average adult reading speed of 200-250 words per minute. Speaking time is calculated at approximately 130 words per minute for presentations.",
    },
    {
      question: "Does the tool count numbers as words?",
      answer: "Yes, numbers are counted as words if they're separated by spaces. For example, '123' and '456' would count as 2 words in '123 456'.",
    },
    {
      question: "Is my text saved or stored?",
      answer: "No, your text is never saved or sent anywhere. All processing happens in your browser, and the text is cleared when you close the page.",
    },
    {
      question: "What's the difference between characters with and without spaces?",
      answer: "Character count with spaces includes all characters including whitespace. Without spaces removes all space, tab, and newline characters for a pure character count.",
    },
  ],
};

export default function WordCounterPage() {
  return (
    <ToolLayout tool={tool} seoContent={seoContent}>
      <WordCounterClient />
    </ToolLayout>
  );
}
