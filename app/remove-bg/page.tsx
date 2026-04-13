import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { tools } from "@/utils/tools";
import { RemoveBGClient } from "./RemoveBGClient";

export const metadata: Metadata = {
  title: "Remove Image Background — Free Background Remover",
  description:
    "Remove image backgrounds instantly using client-side edge detection. No uploads, no accounts — works entirely in your browser.",
};

const tool = tools.find((t) => t.slug === "remove-bg")!;

export default function RemoveBGPage() {
  return (
    <ToolLayout tool={tool}>
      <RemoveBGClient />
    </ToolLayout>
  );
}
