import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolBySlug } from "@/utils/tools";
import { Base64EncoderClient } from "./Base64EncoderClient";

const tool = getToolBySlug("base64-encoder")!;

export const metadata: Metadata = {
  title: tool.metaTitle || `${tool.name} | Toolbox`,
  description: tool.metaDescription || tool.description,
  keywords: ["base64 encoder", "base64 decoder", "encode base64", "decode base64", "base64 online"],
};

const seoContent = {
  whatIs: `<p>Base64 is an encoding scheme that converts binary data into a text string using 64 ASCII characters. It's commonly used when there's a need to encode binary data that needs to be stored and transferred over media that are designed to deal with text.</p>
  <p>Common uses for Base64 encoding:</p>
  <ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
    <li>Embedding images in HTML/CSS (data URIs)</li>
    <li>Encoding email attachments (MIME)</li>
    <li>Storing complex data in JSON or XML</li>
    <li>API authentication headers (Basic Auth)</li>
    <li>URL-safe encoding of binary data</li>
  </ul>`,
  howToUse: [
    "Choose between Encode or Decode mode",
    "Enter your text or Base64 data in the input field",
    "The conversion happens automatically as you type",
    "Review the output in the result area",
    "Use the copy button to copy the result to your clipboard",
    "Switch modes using the toggle buttons",
  ],
  faq: [
    {
      question: "Is Base64 encryption?",
      answer: "No, Base64 is not encryption - it's just encoding. Anyone can decode Base64 data, so never use it to protect sensitive information like passwords.",
    },
    {
      question: "Why does Base64 output have '=' characters?",
      answer: "The '=' characters are padding added to make the output length a multiple of 4. They're not part of the actual data but are required for proper decoding.",
    },
    {
      question: "Can I encode binary files?",
      answer: "Currently, this tool handles text input. For binary files, you'd need to read them as binary data first. In a full implementation, file upload would be supported.",
    },
    {
      question: "Is there a size limit?",
      answer: "There's no strict limit, but very large inputs (megabytes) may cause performance issues in the browser. For large data, consider using command-line tools.",
    },
  ],
};

export default function Base64EncoderPage() {
  return (
    <ToolLayout tool={tool} seoContent={seoContent}>
      <Base64EncoderClient />
    </ToolLayout>
  );
}
