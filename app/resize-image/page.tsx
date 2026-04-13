import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { tools } from "@/utils/tools";
import { ResizeClient } from "./ResizeClient";

export const metadata: Metadata = {
  title: "Resize Image Online — Free Image Resizer",
  description: "Resize images to exact pixel dimensions or by percentage. Works entirely in your browser — no uploads required.",
};

const tool = tools.find((t) => t.slug === "resize-image")!;

export default function ResizePage() {
  return (
    <ToolLayout tool={tool}>
      <ResizeClient />
    </ToolLayout>
  );
}
