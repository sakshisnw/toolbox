"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

export function JsonFormatterClient() {
  const [input, setInput] = useState('{"name": "John", "age": 30, "city": "New York"}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJson = () => {
    try {
      if (!input.trim()) {
        setOutput("");
        setError("");
        return;
      }
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError("");
    } catch (e) {
      setError(`Invalid JSON: ${e instanceof Error ? e.message : "Unknown error"}`);
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
    } catch (e) {
      setError(`Invalid JSON: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-4">
      {/* Input */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}>
          Input JSON
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
          className="w-full h-48 p-4 rounded-xl border font-mono text-sm resize-y focus:outline-none focus:ring-2"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
          spellCheck={false}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={formatJson}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ background: "var(--accent)", color: "white" }}
        >
          🎨 Format / Beautify
        </button>
        <button
          onClick={minifyJson}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ background: "var(--bg-subtle)", color: "var(--text)", border: "1px solid var(--border)" }}
        >
          📦 Minify
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ background: "var(--bg-subtle)", color: "var(--text)", border: "1px solid var(--border)" }}
        >
          🗑️ Clear
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl" style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }}>
          <p className="text-sm font-medium">❌ {error}</p>
        </div>
      )}

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              Formatted JSON
            </label>
            <CopyButton text={output} label="Copy JSON" />
          </div>
          <pre
            className="w-full h-64 p-4 rounded-xl border font-mono text-sm overflow-auto"
            style={{
              background: "#1e293b",
              borderColor: "var(--border)",
              color: "#e2e8f0",
            }}
          >
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
