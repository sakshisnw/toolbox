import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolBySlug } from "@/utils/tools";
import { RemoveBGClient } from "./RemoveBgClient";

const tool = getToolBySlug("remove-bg")!;

export const metadata: Metadata = {
  title: tool.metaTitle || `${tool.name} | Toolbox`,
  description: tool.metaDescription || tool.description,
  keywords: ["remove background", "background remover", "transparent background", "remove bg", "make background transparent"],
};

const seoContent = {
  whatIs: `<p>A background remover isolates the main subject of an image by removing the surrounding background, creating a transparent PNG. This is useful for product photos, profile pictures, logos, and graphic design work.</p>
  <p>This tool uses client-side edge detection algorithms to identify foreground subjects:</p>
  <ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
    <li>Works best with images having solid, uniform backgrounds</li>
    <li>Creates transparent PNG output with alpha channel</li>
    <li>Preview on different backgrounds (checker, white, black)</li>
    <li>All processing happens locally - no uploads required</li>
  </ul>`,
  howToUse: [
    "Upload an image with a solid-colored background",
    "The tool automatically detects and removes the background",
    "Preview the result on different backgrounds (checkerboard shows transparency)",
    "Download as PNG with transparency preserved",
    "For best results, use images with clear contrast between subject and background",
  ],
  faq: [
    {
      question: "What types of images work best?",
      answer: "Images with solid, uniform backgrounds (white walls, blue skies, single-color backdrops) work best. Complex backgrounds with patterns, gradients, or multiple colors may not be removed cleanly. The tool samples corner pixels to determine the background color.",
    },
    {
      question: "How is this different from AI background removers?",
      answer: "AI tools (like remove.bg) use machine learning to intelligently identify subjects and work well on complex backgrounds. This tool uses simpler edge detection and color sampling, which is faster and private but works best on simpler backgrounds. For professional results with complex images, consider AI-powered alternatives.",
    },
    {
      question: "What format is the output?",
      answer: "The output is always PNG format with an alpha channel for transparency. This ensures the transparent areas remain transparent when you use the image in documents, websites, or design software.",
    },
    {
      question: "Is my image uploaded to a server?",
      answer: "No. The background removal processing happens entirely in your browser using JavaScript and HTML5 Canvas. Your image never leaves your device, ensuring complete privacy.",
    },
  ],
};

export default function RemoveBgPage() {
  return (
    <ToolLayout tool={tool} seoContent={seoContent}>
      <RemoveBGClient />
    </ToolLayout>
  );
}
