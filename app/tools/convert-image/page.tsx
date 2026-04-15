import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolBySlug } from "@/utils/tools";
import { ConvertClient } from "./ConvertClient";

const tool = getToolBySlug("convert-image")!;

export const metadata: Metadata = {
  title: tool.metaTitle || `${tool.name} | Toolbox`,
  description: tool.metaDescription || tool.description,
  keywords: ["image converter", "convert jpg to png", "convert png to jpg", "convert to webp", "image format converter"],
};

const seoContent = {
  whatIs: `<p>An image format converter changes your images from one file format to another. Different formats have different strengths - some offer better compression, others support transparency, and some are optimized for web use.</p>
  <p>Supported formats:</p>
  <ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
    <li><strong>PNG:</strong> Lossless quality, supports transparency (alpha channel), good for graphics and logos</li>
    <li><strong>JPEG/JPG:</strong> Lossy compression, smaller file sizes, ideal for photographs</li>
    <li><strong>WebP:</strong> Modern format with superior compression, supports both lossy and lossless, transparency, and animation</li>
  </ul>`,
  howToUse: [
    "Upload your image by dragging and dropping or clicking to browse",
    "Select your target format (PNG, JPEG, or WebP)",
    "For JPEG and WebP, adjust quality if needed (PNG is always lossless)",
    "Click 'Convert' to process your image",
    "Download the converted file",
  ],
  faq: [
    {
      question: "Which format should I choose?",
      answer: "For photos: JPEG or WebP (smaller size). For graphics with transparency: PNG or WebP. For maximum compatibility: JPEG. For best compression: WebP. For editing/archiving: PNG.",
    },
    {
      question: "Will converting affect image quality?",
      answer: "Converting to PNG maintains quality (lossless). Converting to JPEG or WebP with quality below 100% will reduce quality slightly but create smaller files. We recommend 85-90% quality for a good balance.",
    },
    {
      question: "Why convert to WebP?",
      answer: "WebP typically provides 25-35% smaller file sizes than JPEG and 26% smaller than PNG, while maintaining similar visual quality. Most modern browsers support WebP, making it ideal for websites.",
    },
    {
      question: "Are my images stored on your servers?",
      answer: "No. All conversion happens entirely in your browser. Your images are never uploaded anywhere, ensuring complete privacy and security.",
    },
  ],
};

export default function ConvertPage() {
  return (
    <ToolLayout tool={tool} seoContent={seoContent}>
      <ConvertClient />
    </ToolLayout>
  );
}
