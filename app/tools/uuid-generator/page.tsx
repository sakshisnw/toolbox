import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolBySlug } from "@/utils/tools";
import { UUIDGeneratorClient } from "./UUIDGeneratorClient";

const tool = getToolBySlug("uuid-generator")!;

export const metadata: Metadata = {
  title: tool.metaTitle || `${tool.name} | Toolbox`,
  description: tool.metaDescription || tool.description,
  keywords: ["uuid generator", "guid generator", "generate uuid", "random uuid", "uuid v4"],
};

const seoContent = {
  whatIs: `<p>A UUID (Universally Unique Identifier) or GUID (Globally Unique Identifier) is a 128-bit number used to uniquely identify information in computer systems. UUIDs are designed to be unique across both space and time.</p>
  <p>UUIDs are used for:</p>
  <ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
    <li>Database primary keys</li>
    <li>Session identifiers</li>
    <li>Transaction IDs</li>
    <li>File names and object identifiers</li>
    <li>API request tracking</li>
    <li>Distributed system coordination</li>
  </ul>
  <p style="margin-top: 0.5rem;">UUID Version 4 (random) is the most common type, using random numbers to generate unique identifiers with extremely low collision probability.</p>`,
  howToUse: [
    "Choose how many UUIDs you want to generate (1-100)",
    "Select the output format (standard with hyphens or without)",
    "Choose whether to convert to uppercase",
    "Click 'Generate UUIDs' to create your identifiers",
    "Review the generated UUIDs in the output area",
    "Use the copy button to copy all UUIDs to your clipboard",
  ],
  faq: [
    {
      question: "How unique are these UUIDs?",
      answer: "Version 4 UUIDs have 122 bits of randomness, giving 5.3 undecillion possible combinations (5.3 x 10^36). The probability of generating the same UUID twice is astronomically low - you'd need to generate 1 billion UUIDs per second for 85 years to have a 50% chance of a collision.",
    },
    {
      question: "What's the difference between UUID and GUID?",
      answer: "UUID and GUID refer to the same thing. UUID is the technical term from the RFC 4122 standard, while GUID is Microsoft's implementation name. They are interchangeable.",
    },
    {
      question: "Can I use these for database primary keys?",
      answer: "Yes, UUIDs are excellent for distributed systems and databases where you need globally unique IDs without coordination. However, consider ordered UUIDs (ULID or UUID v7) for better database indexing performance.",
    },
    {
      question: "Are these cryptographically secure?",
      answer: "We use the Web Crypto API's crypto.getRandomValues() which provides cryptographically secure random numbers suitable for security-sensitive applications.",
    },
  ],
};

export default function UUIDGeneratorPage() {
  return (
    <ToolLayout tool={tool} seoContent={seoContent}>
      <UUIDGeneratorClient />
    </ToolLayout>
  );
}
