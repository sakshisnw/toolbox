import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolBySlug } from "@/utils/tools";
import { CompressClient } from "./CompressClient";

const tool = getToolBySlug("compress-image")!;

export const metadata: Metadata = {
  title: tool.metaTitle || `${tool.name} | Toolbox`,
  description: tool.metaDescription || tool.description,
  keywords: ["image compressor", "compress images online", "reduce image size", "jpg compressor", "png compressor", "webp compressor"],
};

const seoContent = {
  whatIs: `<p>Image compression is the process of reducing the file size of an image while maintaining acceptable visual quality. This is essential for faster website loading, reduced storage usage, and efficient sharing.</p>
  <p>There are two main types of image compression:</p>
  <ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
    <li><strong>Lossy compression</strong> - Reduces file size by removing some image data, resulting in some quality loss (used in JPEG)</li>
    <li><strong>Lossless compression</strong> - Reduces file size without losing any image quality (used in PNG)</li>
  </ul>`,
  howToUse: [
    "Drag and drop your image into the upload area or click to browse",
    "Select your desired compression quality (Lower = smaller file, higher compression)",
    "Preview the original and compressed images side by side",
    "Compare file sizes to see the savings",
    "Click 'Download' to save your compressed image",
    "All processing happens in your browser - no uploads to servers",
  ],
  faq: [
    {
      question: "Is this image compressor free?",
      answer: "Yes, our image compressor is completely free to use with no limits on the number of images you can compress.",
    },
    {
      question: "Does compression reduce image quality?",
      answer: "Lossy compression (like JPEG) can reduce quality at high compression levels. We provide a quality slider so you can balance file size and quality. Lower quality settings produce smaller files but may show artifacts.",
    },
    {
      question: "Is my image stored on your servers?",
      answer: "No. All image processing happens entirely in your browser using JavaScript. Your images never leave your device, making this tool completely private and secure.",
    },
    {
      question: "What image formats are supported?",
      answer: "Currently, we support JPEG, PNG, and WebP formats. WebP typically offers the best compression while maintaining quality.",
    },
    {
      question: "Can I compress multiple images at once?",
      answer: "Currently, images need to be processed one at a time. We're working on batch processing for future updates.",
    },
  ],
};

export default function CompressPage() {
  return (
    <ToolLayout tool={tool} seoContent={seoContent}>
      <CompressClient />
    </ToolLayout>
  );
}
