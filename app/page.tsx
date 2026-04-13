import type { Metadata } from "next";
import Link from "next/link";
import { calculatorTools, imageTools } from "@/utils/tools";
import type { Tool } from "@/utils/tools";

export const metadata: Metadata = {
  title: "Toolbox — Free Online Tools",
  description: "Free, fast, and private online tools. BMI calculator, age calculator, EMI calculator, image compressor, and more.",
};

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/${tool.slug}`}>
      <div
        className="tool-card card p-5 h-full flex flex-col gap-3 cursor-pointer"
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
            {tool.category === "calculator" ? "Calc" : "Image"}
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
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
          style={{ background: "var(--accent-light)", color: "var(--accent)", fontFamily: "var(--font-display)" }}>
          ⚡ Free · Fast · Private
        </div>
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
        >
          Your everyday{" "}
          <span className="gradient-text">Toolbox</span>
        </h1>
        <p
          className="text-lg max-w-xl mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          9 tools for calculations and image editing — all free, all in your browser.
        </p>
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
      <section>
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
