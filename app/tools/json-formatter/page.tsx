import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolBySlug } from "@/utils/tools";
import { JsonFormatterClient } from "./JsonFormatterClient";

const tool = getToolBySlug("json-formatter")!;

export const metadata: Metadata = {
  title: tool.metaTitle || `${tool.name} | Toolbox`,
  description: tool.metaDescription || tool.description,
  keywords: ["json formatter", "json validator", "json beautifier", "format json", "validate json"],
};

const seoContent = {
  whatIs: `<p>A JSON (JavaScript Object Notation) formatter is a tool that takes raw, unformatted JSON data and transforms it into a structured, human-readable format with proper indentation and syntax highlighting.</p>
  <p>JSON is a lightweight data interchange format that is easy for humans to read and write, and easy for machines to parse and generate. It's commonly used for:</p>
  <ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
    <li>API responses and requests</li>
    <li>Configuration files</li>
    <li>Data storage and transmission</li>
    <li>NoSQL databases like MongoDB</li>
  </ul>`,
  howToUse: [
    "Paste your JSON data into the input text area",
    "Click the 'Format' button to beautify and validate your JSON",
    "Review the formatted output with syntax highlighting",
    "If there are errors, you'll see error messages with line numbers",
    "Use the 'Copy' button to copy the formatted result",
    "Click 'Clear' to reset and start over",
  ],
  faq: [
    {
      question: "Is my JSON data sent to a server?",
      answer: "No, absolutely not. All JSON formatting happens entirely in your browser. Your data never leaves your device, making this tool 100% private and secure.",
    },
    {
      question: "What if my JSON has errors?",
      answer: "The tool will detect syntax errors and display helpful error messages with line numbers and position information to help you fix the issues.",
    },
    {
      question: "Can I format large JSON files?",
      answer: "Yes, you can format JSON files of any size. However, extremely large files (several megabytes) might cause performance issues in the browser.",
    },
    {
      question: "Does this tool support JSON5 or other JSON variants?",
      answer: "This tool focuses on standard JSON format (RFC 8259). It does not support JSON5, comments, or trailing commas.",
    },
  ],
};

export default function JsonFormatterPage() {
  return (
    <ToolLayout tool={tool} seoContent={seoContent}>
      <JsonFormatterClient />
    </ToolLayout>
  );
}
