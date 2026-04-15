"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

export function Base64EncoderClient() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const process = () => {
    try {
      setError("");
      if (!input.trim()) {
        setOutput("");
        return;
      }

      if (mode === "encode") {
        // Encode to Base64
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
      } else {
        // Decode from Base64
        const decoded = decodeURIComponent(escape(atob(input)));
        setOutput(decoded);
      }
    } catch (e) {
      setError(mode === "decode" ? "Invalid Base64 string" : "Cannot encode this input");
      setOutput("");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const sample = () => {
    if (mode === "encode") {
      setInput("Hello, World!");
    } else {
      setInput("SGVsbG8sIFdvcmxkIQ==");
    }
    setTimeout(process, 0);
  };

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex p-1 rounded-xl" style={{ background: "var(--bg-subtle)" }}>
        <button
          onClick={() => { setMode("encode"); setInput(""); setOutput(""); setError(""); }}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "encode" ? "shadow-sm" : ""}`}
          style={{
            background: mode === "encode" ? "var(--bg-card)" : "transparent",
            color: mode === "encode" ? "var(--accent)" : "var(--text-muted)",
          }}
        >
          🔐 Encode to Base64
        </button>
        <button
          onClick={() => { setMode("decode"); setInput(""); setOutput(""); setError(""); }}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "decode" ? "shadow-sm" : ""}`}
          style={{
            background: mode === "decode" ? "var(--bg-card)" : "transparent",
            color: mode === "decode" ? "var(--accent)" : "var(--text-muted)",
          }}
        >
          🔓 Decode from Base64
        </button>
      </div>

      {/* Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
          </label>
          <button
            onClick={sample}
            className="text-xs px-2 py-1 rounded transition-colors"
            style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
          >
            Load Sample
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 string..."}
          className="w-full h-32 p-4 rounded-xl border font-mono text-sm resize-y focus:outline-none"
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
          onClick={process}
          className="px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ background: "var(--accent)", color: "white" }}
        >
          {mode === "encode" ? "🔄 Encode" : "🔄 Decode"}
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
              {mode === "encode" ? "Base64 Result" : "Decoded Text"}
            </label>
            <CopyButton text={output} label="Copy Result" />
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-32 p-4 rounded-xl border font-mono text-sm resize-y"
            style={{
              background: "var(--bg-subtle)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          />
        </div>
      )}
    </div>
  );
}
