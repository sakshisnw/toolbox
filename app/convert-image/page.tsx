import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { tools } from "@/utils/tools";
import { ConvertClient } from "./ConvertClient";

export const metadata: Metadata = {
  title: "Image Converter — Convert PNG, JPG, WebP Online",
  description: "Convert images between PNG, JPEG, and WebP formats instantly in your browser. No uploads, completely private.",
};

const tool = tools.find((t) => t.slug === "convert-image")!;

export default function ConvertPage() {
  return (
    <ToolLayout tool={tool}>
      <ConvertClient />
    </ToolLayout>
  );
}
