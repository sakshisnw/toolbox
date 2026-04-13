import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { tools } from "@/utils/tools";
import { CompressClient } from "./CompressClient";

export const metadata: Metadata = {
  title: "Image Compressor — Compress Images Online for Free",
  description:
    "Compress JPEG, PNG, and WebP images online. 100% client-side, no uploads, no data sent to servers.",
};

const tool = tools.find((t) => t.slug === "compress-image")!;

export default function CompressPage() {
  return (
    <ToolLayout tool={tool}>
      <CompressClient />
    </ToolLayout>
  );
}
