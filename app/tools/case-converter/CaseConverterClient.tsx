"use client";

import { useState, useRef } from "react";

const converters = [
  { id: "lower", label: "lower case", convert: (t: string) => t.toLowerCase() },
  { id: "upper", label: "UPPER CASE", convert: (t: string) => t.toUpperCase() },
  { id: "title", label: "Title Case", convert: (t: string) => t.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) },
  { id: "sentence", label: "Sentence case", convert: (t: string) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase() },
  { id: "camel", label: "camelCase", convert: (t: string) => t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()) },
  { id: "pascal", label: "PascalCase", convert: (t: string) => t.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/^(.)/, c => c.toUpperCase()) },
  { id: "snake", label: "snake_case", convert: (t: string) => t.trim().replace(/\s+/g, "_").toLowerCase() },
  { id: "kebab", label: "kebab-case", convert: (t: string) => t.trim().replace(/\s+/g, "-").toLowerCase() },
];

function ConversionCard({ label, result }: { label: string; result: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${label.replace(/\s+/g, "-")}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 10, background: "var(--bg-card)", overflow: "hidden", marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderBottom: "1px solid var(--border)" }}>
        <span style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--text)" }}>{label}</span>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={handleCopy} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", border: "1px solid var(--border)", borderRadius: 6, background: "var(--bg-subtle)", color: copied ? "#22c55e" : "var(--text-muted)", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
            {copied
              ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>}
            {copied ? "Copied!" : "Copy"}
          </button>
          <button onClick={handleDownload} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", border: "none", borderRadius: 6, background: "#4A90D9", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </button>
        </div>
      </div>
      <div style={{ padding: "10px 14px 12px" }}>
        <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "12.5px", color: result ? "var(--text)" : "var(--text-muted)", lineHeight: 1.6, wordBreak: "break-all" }}>
          {result || "Result will appear here..."}
        </p>
      </div>
    </div>
  );
}

export function CaseConverterClient() {
  const [text, setText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setText(ev.target?.result as string);
    reader.readAsText(file); e.target.value = "";
  };

  const btnOutline: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
    border: "1px solid var(--border)", borderRadius: 8, background: "var(--bg-card)",
    color: "var(--text)", fontSize: "13.5px", fontWeight: 500, cursor: "pointer",
    transition: "background 0.15s", fontFamily: "inherit",
  };

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <input ref={fileInputRef} type="file" accept=".txt,.md,.csv" style={{ display: "none" }} onChange={handleUpload} />
        <button onClick={() => fileInputRef.current?.click()} style={btnOutline}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Upload File
        </button>
        <button onClick={() => setText("")} style={btnOutline}>Clear</button>
      </div>

      {/* Input Area */}
      <div style={{ border: "1px solid var(--border)", borderRadius: 12, background: "var(--bg-card)", overflow: "hidden", marginBottom: 24 }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#4A90D9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>Enter your text</span>
        </div>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Type or paste your text here..." spellCheck={false}
          style={{ width: "100%", minHeight: 130, border: "none", outline: "none", resize: "vertical", padding: 16, fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text)", background: "transparent", lineHeight: 1.7, boxSizing: "border-box" }} />
      </div>

      {/* Conversions */}
      <div>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 14, marginTop: 0 }}>Conversions</h3>
        {converters.map(({ id, label, convert }) => (
          <ConversionCard key={id} label={label} result={text ? convert(text) : ""} />
        ))}
      </div>
    </div>
  );
}
