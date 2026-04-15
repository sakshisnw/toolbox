import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolBySlug } from "@/utils/tools";
import { ResizeClient } from "./ResizeClient";

const tool = getToolBySlug("resize-image")!;

export const metadata: Metadata = {
  title: tool.metaTitle || `${tool.name} | Toolbox`,
  description: tool.metaDescription || tool.description,
  keywords: ["resize image", "image resizer", "resize photo", "resize jpg", "resize png", "change image size"],
};

const seoContent = {
  whatIs: `<p>An image resizer allows you to change the dimensions of your images without losing quality. Whether you need to shrink photos for faster web loading or enlarge them for printing, this tool handles both tasks efficiently.</p>
  <p>Key features include:</p>
  <ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
    <li><strong>Pixel-perfect resizing:</strong> Set exact width and height dimensions</li>
    <li><strong>Percentage scaling:</strong> Scale by percentage (25%, 50%, 75%, etc.)</li>
    <li><strong>Aspect ratio lock:</strong> Maintain proportions to prevent distortion</li>
    <li><strong>Client-side processing:</strong> Your images never leave your device</li>
  </ul>`,
  howToUse: [
    "Drag and drop your image into the upload area or click to browse",
    "Choose resize mode: Pixels (exact dimensions) or Percent (proportional scaling)",
    "For pixels: Enter width and height, optionally lock aspect ratio",
    "For percentage: Select a preset or use the slider",
    "Click 'Resize Image' to process",
    "Download your resized image",
  ],
  faq: [
    {
      question: "Will resizing reduce image quality?",
      answer: "Shrinking images maintains quality. Enlarging images may cause some quality loss (pixelation) since the tool creates new pixels through interpolation. For best results when enlarging, start with the highest quality source image.",
    },
    {
      question: "What is aspect ratio and why lock it?",
      answer: "Aspect ratio is the proportional relationship between width and height. Locking it ensures your image doesn't get stretched or squished when you change one dimension. The tool automatically calculates the other dimension to maintain proportions.",
    },
    {
      question: "Is there a maximum file size?",
      answer: "There's no hard limit, but very large files (over 50MB) may take longer to process and could cause browser memory issues. For best performance, we recommend images under 20MB.",
    },
    {
      question: "Are my images stored on your servers?",
      answer: "No. All resizing happens entirely in your browser using JavaScript. Your images are never uploaded to any server, making this tool completely private and secure.",
    },
  ],
};

export default function ResizePage() {
  return (
    <ToolLayout tool={tool} seoContent={seoContent}>
      <ResizeClient />
    </ToolLayout>
  );
}
