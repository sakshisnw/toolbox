import Link from "next/link";
import type { Tool } from "@/utils/tools";

interface Props {
  tool: Tool;
  children: React.ReactNode;
}

export function ToolLayout({ tool, children }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-xs" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="hover:text-orange-500 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
          Home
        </Link>
        <span>/</span>
        <span style={{ fontFamily: "var(--font-display)" }}>{tool.name}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `color-mix(in srgb, ${tool.color} 15%, transparent)` }}
          >
            {tool.icon}
          </span>
          <span className="badge">{tool.category === "calculator" ? "Calculator" : "Image Tool"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{tool.name}</h1>
        <p className="text-base" style={{ color: "var(--text-muted)" }}>
          {tool.description}
        </p>
      </div>

      {/* Tool content */}
      {children}

      {/* Privacy note */}
      <div
        className="mt-8 px-4 py-3 rounded-xl text-xs flex items-center gap-2"
        style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
      >
        <span>🔒</span>
        <span>
          All calculations and processing happen{" "}
          <strong>entirely in your browser</strong> — no data is sent to any server.
        </span>
      </div>
    </div>
  );
}
