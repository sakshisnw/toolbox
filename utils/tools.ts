export type ToolCategory = "calculator" | "image" | "text" | "pdf" | "generator" | "converter";

export interface Tool {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  category: ToolCategory;
  color: string;
  metaTitle?: string;
  metaDescription?: string;
}

export const tools: Tool[] = [
  // Calculators
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    shortName: "BMI",
    description: "Calculate your Body Mass Index instantly and understand what it means for your health.",
    icon: "⚖️",
    category: "calculator",
    color: "#f97316",
    metaTitle: "BMI Calculator – Check Your Body Mass Index Online Free",
    metaDescription: "Calculate your BMI (Body Mass Index) online for free. Instant results with health category interpretation. No signup required.",
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    shortName: "Age",
    description: "Find your exact age in years, months, days, hours, and even seconds.",
    icon: "🎂",
    category: "calculator",
    color: "#8b5cf6",
    metaTitle: "Age Calculator – Calculate Exact Age in Years, Months, Days",
    metaDescription: "Calculate your exact age in years, months, days, hours, and seconds. Free online age calculator with instant results.",
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    shortName: "Percentage",
    description: "Calculate percentages, percentage change, and what percent one number is of another.",
    icon: "%",
    category: "calculator",
    color: "#10b981",
    metaTitle: "Percentage Calculator – Free Online Percent Calculator",
    metaDescription: "Calculate percentages, percentage change, and percentage difference instantly. Free online percentage calculator tool.",
  },
  {
    slug: "emi-calculator",
    name: "EMI / Loan Calculator",
    shortName: "EMI",
    description: "Calculate your monthly loan EMI, total interest payable, and full amortization schedule.",
    icon: "🏦",
    category: "calculator",
    color: "#3b82f6",
    metaTitle: "EMI Calculator – Calculate Loan EMI Online Free",
    metaDescription: "Calculate your loan EMI (Equated Monthly Installment), total interest, and view the complete amortization schedule. Free EMI calculator.",
  },
  {
    slug: "compound-interest",
    name: "Compound Interest Calculator",
    shortName: "Compound Interest",
    description: "See the power of compound interest and how your investments grow over time.",
    icon: "📈",
    category: "calculator",
    color: "#ec4899",
    metaTitle: "Compound Interest Calculator – Calculate Investment Growth",
    metaDescription: "Calculate compound interest and see how your investments grow over time. Free online compound interest calculator with charts.",
  },

  // Image tools
  {
    slug: "compress-image",
    name: "Image Compressor",
    shortName: "Compress",
    description: "Compress images in your browser with zero uploads — privacy-first, client-side only.",
    icon: "🗜️",
    category: "image",
    color: "#f59e0b",
    metaTitle: "Image Compressor – Reduce Image Size Online Free",
    metaDescription: "Compress JPEG, PNG, and WebP images online for free. Reduce file size without losing quality. 100% client-side, no uploads.",
  },
  {
    slug: "resize-image",
    name: "Resize Image",
    shortName: "Resize",
    description: "Resize images to exact dimensions or by percentage, all in your browser.",
    icon: "↔️",
    category: "image",
    color: "#06b6d4",
    metaTitle: "Image Resizer – Resize Images Online Free",
    metaDescription: "Resize images to exact dimensions or by percentage online. Free image resizer tool that works in your browser. No uploads required.",
  },
  {
    slug: "convert-image",
    name: "Image Converter",
    shortName: "Convert",
    description: "Convert images between PNG, JPEG, and WebP formats instantly in your browser.",
    icon: "🔄",
    category: "image",
    color: "#84cc16",
    metaTitle: "Image Converter – Convert PNG, JPG, WebP Online Free",
    metaDescription: "Convert images between PNG, JPEG, JPG, and WebP formats online for free. Fast client-side image conversion. No uploads needed.",
  },
  {
    slug: "remove-bg",
    name: "Background Remover",
    shortName: "Remove BG",
    description: "Remove image backgrounds instantly using client-side edge detection. Works entirely in your browser.",
    icon: "🖼️",
    category: "image",
    color: "#0ea5e9",
    metaTitle: "Remove Image Background — Free Background Remover",
    metaDescription: "Remove image backgrounds instantly using client-side edge detection. No uploads, no accounts — works entirely in your browser.",
  },

  // Text & Developer Tools
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    shortName: "JSON",
    description: "Format, validate, and beautify JSON data with syntax highlighting and error detection.",
    icon: "📋",
    category: "text",
    color: "#6366f1",
    metaTitle: "JSON Formatter – Format, Validate & Beautify JSON Online",
    metaDescription: "Format, validate, and beautify JSON data online. Free JSON formatter with syntax highlighting and error detection. No data sent to servers.",
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    shortName: "Words",
    description: "Count words, characters, sentences, and paragraphs in your text instantly.",
    icon: "📝",
    category: "text",
    color: "#14b8a6",
    metaTitle: "Word Counter – Count Words, Characters & Sentences Online",
    metaDescription: "Count words, characters, sentences, and paragraphs instantly. Free online word counter tool with reading time estimate.",
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    shortName: "Case",
    description: "Convert text between UPPERCASE, lowercase, Title Case, and more formats.",
    icon: "Aa",
    category: "text",
    color: "#a855f7",
    metaTitle: "Case Converter – Convert Text Case Online (Upper, Lower, Title)",
    metaDescription: "Convert text between UPPERCASE, lowercase, Title Case, camelCase, and more. Free online text case converter tool.",
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encode / Decode",
    shortName: "Base64",
    description: "Encode and decode text to and from Base64 format instantly.",
    icon: "🔐",
    category: "text",
    color: "#64748b",
    metaTitle: "Base64 Encoder/Decoder – Encode Decode Base64 Online",
    metaDescription: "Encode text to Base64 or decode Base64 to text online for free. Simple Base64 encoder decoder tool. Works entirely in browser.",
  },
  {
    slug: "url-encoder",
    name: "URL Encoder / Decoder",
    shortName: "URL",
    description: "Encode and decode URLs and query parameters for safe web transmission.",
    icon: "🔗",
    category: "text",
    color: "#0ea5e9",
    metaTitle: "URL Encoder Decoder – URL Encode Decode Online Free",
    metaDescription: "Encode and decode URLs and query parameters online. Free URL encoder decoder for safe web transmission. No data sent to servers.",
  },

  // PDF Tools
  {
    slug: "compress-pdf",
    name: "PDF Compressor",
    shortName: "Compress PDF",
    description: "Compress PDF files to reduce size while maintaining quality. Client-side processing.",
    icon: "📉",
    category: "pdf",
    color: "#dc2626",
    metaTitle: "PDF Compressor – Reduce PDF File Size Online Free",
    metaDescription: "Compress PDF files to reduce size online for free. Reduce PDF file size while maintaining quality. 100% client-side processing.",
  },
  {
    slug: "pdf-to-image",
    name: "PDF to Image",
    shortName: "PDF to Image",
    description: "Convert PDF pages to PNG or JPEG images. Extract pages as separate images.",
    icon: "📄",
    category: "pdf",
    color: "#f97316",
    metaTitle: "PDF to Image Converter – Convert PDF to PNG, JPG Online",
    metaDescription: "Convert PDF pages to PNG or JPEG images online. Extract PDF pages as separate images. Free PDF to image converter.",
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    shortName: "Image to PDF",
    description: "Convert images to PDF documents. Combine multiple images into one PDF.",
    icon: "📑",
    category: "pdf",
    color: "#84cc16",
    metaTitle: "Image to PDF Converter – Convert Images to PDF Online Free",
    metaDescription: "Convert images to PDF documents online for free. Combine multiple images into one PDF. JPG, PNG, WebP to PDF converter.",
  },
  {
    slug: "merge-pdf",
    name: "PDF Merger",
    shortName: "Merge PDF",
    description: "Merge multiple PDF files into a single PDF document. Combine PDFs easily.",
    icon: "📎",
    category: "pdf",
    color: "#3b82f6",
    metaTitle: "PDF Merger – Merge PDF Files Online Free",
    metaDescription: "Merge multiple PDF files into one PDF document online for free. Combine PDFs easily with this client-side PDF merger tool.",
  },

  // Generators
  {
    slug: "password-generator",
    name: "Password Generator",
    shortName: "Password",
    description: "Generate strong, secure passwords with customizable length and character options.",
    icon: "🔑",
    category: "generator",
    color: "#22c55e",
    metaTitle: "Password Generator – Create Strong Secure Passwords Online",
    metaDescription: "Generate strong, secure passwords online. Customizable length and character options. Create unbreakable passwords instantly.",
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    shortName: "QR Code",
    description: "Generate QR codes for URLs, text, emails, and more. Download as PNG or SVG.",
    icon: "◻️",
    category: "generator",
    color: "#0f172a",
    metaTitle: "QR Code Generator – Create QR Codes Online Free",
    metaDescription: "Generate QR codes for URLs, text, emails, WiFi, and more. Download as PNG or SVG. Free QR code generator with customization options.",
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    shortName: "UUID",
    description: "Generate random UUIDs/GUIDs instantly. Single or bulk UUID generation.",
    icon: "🆔",
    category: "generator",
    color: "#8b5cf6",
    metaTitle: "UUID Generator – Generate UUIDs GUIDs Online Free",
    metaDescription: "Generate random UUIDs/GUIDs online for free. Single or bulk UUID generation. Version 4 UUID generator with instant copy functionality.",
  },
  {
    slug: "random-name-generator",
    name: "Random Name Generator",
    shortName: "Random Name",
    description: "Generate random names for characters, testing, or inspiration. Various name types.",
    icon: "👤",
    category: "generator",
    color: "#ec4899",
    metaTitle: "Random Name Generator – Generate Names for Characters, Testing",
    metaDescription: "Generate random names for characters, testing data, or inspiration. Various name types including first names, full names, and usernames.",
  },
];

export const calculatorTools = tools.filter((t) => t.category === "calculator");
export const imageTools = tools.filter((t) => t.category === "image");
export const textTools = tools.filter((t) => t.category === "text");
export const pdfTools = tools.filter((t) => t.category === "pdf");
export const generatorTools = tools.filter((t) => t.category === "generator");
export const converterTools = tools.filter((t) => t.category === "converter");

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
