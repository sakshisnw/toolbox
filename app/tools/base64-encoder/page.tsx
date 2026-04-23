import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolBySlug } from "@/utils/tools";
import { Base64EncoderClient } from "./Base64EncoderClient";

const tool = getToolBySlug("base64-encoder")!;

export const metadata: Metadata = {
  title: tool.metaTitle || `${tool.name} | Toolbox`,
  description: tool.metaDescription || tool.description,
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64 online",
    "jwt decoder",
    "gzip decoder",
    "url encoder",
    "url decoder",
    "encode decode online",
    "base64 to text",
    "text to base64",
  ],
};

const seoContent = {
  whatIs: `<p>This tool lets you instantly encode and decode data in multiple formats — Base64, Gzip, JWT, and URL encoding — entirely in your browser. No data is ever sent to a server, making it safe for sensitive tokens and production credentials.</p>
  <p style="margin-top: 0.75rem;">Use <strong>Auto Detect</strong> in decode mode and the tool will automatically identify the format and decode it for you — no need to know whether it's Base64, a JWT, Gzip-compressed, or URL-encoded.</p>
  <p style="margin-top: 0.75rem;">Supported formats:</p>
  <ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
    <li><strong>Base64:</strong> Encode plain text or binary data to Base64, or decode Base64 strings back to readable text</li>
    <li><strong>Gzip:</strong> Compress text using Gzip (output is Base64), or decompress a Base64-encoded Gzip payload</li>
    <li><strong>JWT:</strong> Decode a JWT token into its Header, Payload, and Signature sections as formatted JSON</li>
    <li><strong>URL:</strong> Encode special characters in URLs and query strings, or decode percent-encoded URLs</li>
  </ul>`,

  howToUse: [
    "Select Encode or Decode from the mode toggle at the top",
    "Choose a format — Base64, Gzip, JWT, or URL — or use Auto Detect in decode mode",
    "Paste your input into the left panel",
    "The result appears instantly on the right panel",
    "Click Copy to copy the output, or Swap to flip the output back as input",
    "Use Load sample to see an example for the selected format",
  ],

  examples: [
    {
      input: "Hello, World!",
      output: "SGVsbG8sIFdvcmxkIQ==",
      explanation: "Plain text encoded to Base64. Every 3 bytes of input become 4 Base64 characters, padded with = if needed.",
    },
    {
      input: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      output: '{ "alg": "HS256", "typ": "JWT" }',
      explanation: "A JWT token decoded into its Header and Payload sections. The signature is shown separately and is not decoded.",
    },
    {
      input: "https://example.com/search?q=hello world&lang=en",
      output: "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26lang%3Den",
      explanation: "URL encoding replaces spaces and special characters with percent-encoded equivalents safe for transmission in a URL.",
    },
    {
      input: "H4sIAAAAAAAAA8tIzcnJBwCGphA2BQAAAA==",
      output: "Hello World",
      explanation: "A Base64-encoded Gzip payload decompressed back to its original text content.",
    },
  ],

  faq: [
    {
      question: "What is Base64 encoding?",
      answer: "Base64 is a binary-to-text encoding scheme that represents binary data using 64 printable ASCII characters (A–Z, a–z, 0–9, +, /). It is commonly used to transmit binary data over text-based protocols like email or HTTP, and to embed images or files inside JSON or HTML.",
    },
    {
      question: "How do I decode a Base64 string?",
      answer: "Switch to Decode mode, select Base64 (or leave on Auto Detect), and paste your Base64 string into the input panel. The decoded text appears instantly on the right.",
    },
    {
      question: "What is Gzip compression?",
      answer: "Gzip is a file compression format based on the DEFLATE algorithm. It reduces the size of text data significantly and is widely used in HTTP responses to speed up web pages. In this tool, Gzip output is Base64-encoded so it can be safely represented as text.",
    },
    {
      question: "How do I decode a JWT token?",
      answer: "Select Decode mode, choose JWT (or Auto Detect), and paste the full token in the format header.payload.signature. The tool decodes and pretty-prints the Header and Payload as JSON. Note that this tool does not verify the JWT signature — for signature verification use a server-side library.",
    },
    {
      question: "Is my data safe when using this tool?",
      answer: "Yes. All encoding and decoding happens locally in your browser using native JavaScript APIs. No data is sent to any server, logged, or stored. It is safe to use with production JWTs, API keys, and sensitive credentials.",
    },
    {
      question: "What is the difference between Base64 and Base64URL?",
      answer: "Base64URL is a URL-safe variant of Base64 that replaces + with - and / with _, and omits the = padding. It is used in JWTs and other web contexts where standard Base64 characters would need to be percent-encoded in a URL.",
    },
    {
      question: "What does Auto Detect do?",
      answer: "Auto Detect inspects your input and tries each format in order — JWT first (three dot-separated segments), then URL encoding (percent sequences), then Gzip (binary magic bytes after Base64 decode), then plain Base64. It shows a 'Detected' badge in the output header so you always know what was identified.",
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