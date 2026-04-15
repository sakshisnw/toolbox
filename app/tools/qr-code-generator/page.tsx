import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolBySlug } from "@/utils/tools";
import { QRCodeGeneratorClient } from "./QRCodeGeneratorClient";

const tool = getToolBySlug("qr-code-generator")!;

export const metadata: Metadata = {
  title: tool.metaTitle || `${tool.name} | Toolbox`,
  description: tool.metaDescription || tool.description,
  keywords: ["qr code generator", "create qr code", "qr code maker", "free qr code", "qr code online"],
};

const seoContent = {
  whatIs: `<p>A QR (Quick Response) code is a two-dimensional barcode that can be scanned using a smartphone camera to quickly access information like URLs, contact details, WiFi passwords, and more.</p>
  <p>QR codes are used for:</p>
  <ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
    <li>Sharing website links quickly</li>
    <li>Contactless payments and menus</li>
    <li>Business cards and contact information</li>
    <li>WiFi network sharing</li>
    <li>Event tickets and boarding passes</li>
    <li>Product information and authentication</li>
  </ul>`,
  howToUse: [
    "Select the QR code type (URL, Text, Email, Phone, WiFi, or SMS)",
    "Enter the information you want to encode",
    "Choose your preferred size and error correction level",
    "Click 'Generate QR Code' to create your code",
    "Preview the generated QR code",
    "Download as PNG or copy to use in your projects",
  ],
  faq: [
    {
      question: "Are QR codes generated here permanent?",
      answer: "Yes, QR codes are just encoded data - they don't expire or require a server. As long as the encoded information remains valid (e.g., a working URL), the QR code will work forever.",
    },
    {
      question: "Can QR codes be customized with colors?",
      answer: "Currently, this tool generates standard black and white QR codes for maximum compatibility. Custom colors may reduce scan reliability.",
    },
    {
      question: "What data can be stored in a QR code?",
      answer: "QR codes can store up to 4,296 alphanumeric characters. Common uses include URLs, plain text, contact cards (vCard), WiFi credentials, email messages, and phone numbers.",
    },
    {
      question: "Will my QR code work with all scanners?",
      answer: "Yes, we generate standard-compliant QR codes that work with all modern smartphones and QR scanners. The higher the error correction level, the more damage the code can sustain and still be readable.",
    },
  ],
};

export default function QRCodeGeneratorPage() {
  return (
    <ToolLayout tool={tool} seoContent={seoContent}>
      <QRCodeGeneratorClient />
    </ToolLayout>
  );
}
