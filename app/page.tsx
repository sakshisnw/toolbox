import type { Metadata } from "next";
import Link from "next/link";
import { calculatorTools, imageTools, textTools, pdfTools, generatorTools } from "@/utils/tools";
import type { Tool } from "@/utils/tools";
import { ToolSearch } from "@/components/ToolSearch";

export const metadata: Metadata = {
  title: "Free Online Tools for Images, PDFs, Calculations & Developers",
  description: "Free online tools for images, PDFs, calculations, and developers. Fast, secure, no signup required. Image compressor, JSON formatter, password generator, and more.",
  keywords: ["image compressor", "pdf compressor", "json formatter", "password generator", "word counter", "qr code generator", "online tools", "free tools"],
  openGraph: {
    type: "website",
    title: "Free Online Tools for Images, PDFs, Calculations & Developers",
    description: "Fast, secure, no signup required. 20+ free online tools.",
  },
};

function ToolCard({ tool }: { tool: Tool }) {
  const categoryLabels: Record<string, string> = {
    calculator: "Calc",
    image: "Image",
    text: "Text",
    pdf: "PDF",
    generator: "Generator",
    converter: "Converter",
  };

  return (
    <Link href={`/tools/${tool.slug}`}>
      <div
        className="tool-card card p-5 h-full flex flex-col gap-3 cursor-pointer hover:shadow-lg transition-shadow"
        style={{ minHeight: 140 }}
      >
        <div className="flex items-start justify-between gap-2">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `color-mix(in srgb, ${tool.color} 18%, transparent)` }}
          >
            {tool.icon}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              background: `color-mix(in srgb, ${tool.color} 12%, transparent)`,
              color: tool.color,
              fontFamily: "var(--font-display)",
            }}
          >
            {categoryLabels[tool.category] || tool.category}
          </span>
        </div>
        <div>
          <h3
            className="font-bold text-base mb-1"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
          >
            {tool.name}
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {tool.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
          style={{ background: "var(--accent-light)", color: "var(--accent)", fontFamily: "var(--font-display)" }}>
          ⚡ Fast • Secure • No Signup
        </div>
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
        >
          Free Online Tools for{" "}
          <span className="gradient-text">Images, PDFs, Calculations & Developers</span>
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          20+ free tools for image compression, PDF editing, calculations, and developer utilities. 
          All processing happens in your browser — no uploads, no tracking, no signup required.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <ToolSearch />
        </div>

        {/* Popular Tools Quick Links */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>Popular:</span>
          {["Image Compressor", "JSON Formatter", "Password Generator", "PDF Compressor", "QR Code Generator"].map((name) => {
            const tool = [...calculatorTools, ...imageTools, ...textTools, ...pdfTools, ...generatorTools].find(t => t.name === name);
            if (!tool) return null;
            return (
              <Link
                key={name}
                href={`/tools/${tool.slug}`}
                className="text-sm px-3 py-1 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                style={{ background: "var(--bg-subtle)", color: "var(--accent)" }}
              >
                {name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
        {[
          { name: "Calculators", icon: "🧮", count: calculatorTools.length, color: "#f97316" },
          { name: "Image Tools", icon: "🖼️", count: imageTools.length, color: "#06b6d4" },
          { name: "Text & Dev Tools", icon: "💻", count: textTools.length, color: "#8b5cf6" },
          { name: "PDF Tools", icon: "📄", count: pdfTools.length, color: "#ef4444" },
          { name: "Generators", icon: "⚙️", count: generatorTools.length, color: "#10b981" },
        ].map((cat) => (
          <div
            key={cat.name}
            className="p-4 rounded-xl text-center"
            style={{ background: `color-mix(in srgb, ${cat.color} 10%, var(--bg-card))`, border: `1px solid color-mix(in srgb, ${cat.color} 20%, var(--border))` }}
          >
            <span className="text-2xl mb-2 block">{cat.icon}</span>
            <h3 className="font-semibold text-sm" style={{ fontFamily: "var(--font-display)" }}>{cat.name}</h3>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{cat.count} tools</p>
          </div>
        ))}
      </div>

      {/* Calculators */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            🧮 Calculators
          </h2>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 stagger">
          {calculatorTools.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>

      {/* Image Tools */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            🖼️ Image Tools
          </h2>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
          {imageTools.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>

      {/* Text & Dev Tools */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            💻 Text & Developer Tools
          </h2>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
          {textTools.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>

      {/* PDF Tools */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            📄 PDF Tools
          </h2>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
          {pdfTools.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>

      {/* Generators */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ⚙️ Generators
          </h2>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
          {generatorTools.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>

      {/* Privacy note */}
      <div
        className="mt-16 p-6 rounded-2xl text-center"
        style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)" }}
      >
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          🔒 <strong style={{ color: "var(--text)" }}>100% client-side.</strong>{" "}
          All tools run in your browser. No accounts, no tracking, no data collection.
        </p>
      </div>
    </div>
  );
}
