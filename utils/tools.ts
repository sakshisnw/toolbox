export interface Tool {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  category: "calculator" | "image";
  color: string;
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
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    shortName: "Age",
    description: "Find your exact age in years, months, days, hours, and even seconds.",
    icon: "🎂",
    category: "calculator",
    color: "#8b5cf6",
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    shortName: "Percentage",
    description: "Calculate percentages, percentage change, and what percent one number is of another.",
    icon: "%",
    category: "calculator",
    color: "#10b981",
  },
  {
    slug: "emi-calculator",
    name: "EMI / Loan Calculator",
    shortName: "EMI",
    description: "Calculate your monthly loan EMI, total interest payable, and full amortization schedule.",
    icon: "🏦",
    category: "calculator",
    color: "#3b82f6",
  },
  {
    slug: "compound-interest",
    name: "Compound Interest Calculator",
    shortName: "Compound Interest",
    description: "See the power of compound interest and how your investments grow over time.",
    icon: "📈",
    category: "calculator",
    color: "#ec4899",
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
  },
  {
    slug: "resize-image",
    name: "Resize Image",
    shortName: "Resize",
    description: "Resize images to exact dimensions or by percentage, all in your browser.",
    icon: "↔️",
    category: "image",
    color: "#06b6d4",
  },
  {
    slug: "convert-image",
    name: "Image Converter",
    shortName: "Convert",
    description: "Convert images between PNG, JPEG, and WebP formats instantly in your browser.",
    icon: "🔄",
    category: "image",
    color: "#84cc16",
  },
  {
    slug: "remove-bg",
    name: "Remove Background",
    shortName: "Remove BG",
    description: "Remove image backgrounds instantly using client-side edge detection.",
    icon: "✂️",
    category: "image",
    color: "#ef4444",
  },
];

export const calculatorTools = tools.filter((t) => t.category === "calculator");
export const imageTools = tools.filter((t) => t.category === "image");
