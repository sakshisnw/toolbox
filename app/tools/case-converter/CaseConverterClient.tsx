"use client";

import { useState, useRef } from "react";

const converters = [
  {
    id: "lower",
    label: "lower case",
    convert: (t: string) => t.toLowerCase(),
  },
  {
    id: "upper",
    label: "UPPER CASE",
    convert: (t: string) => t.toUpperCase(),
  },
  {
    id: "title",
    label: "Title Case",
    convert: (t: string) =>
      t.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
  },
  {
    id: "sentence",
    label: "Sentence case",
    convert: (t: string) =>
      t.charAt(0).toUpperCase() + t.slice(1).toLowerCase(),
  },
  {
    id: "camel",
    label: "camelCase",
    convert: (t: string) =>
      t
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase()),
  },
  {
    id: "pascal",
    label: "PascalCase",
    convert: (t: string) =>
      t
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
        .replace(/^(.)/, (c) => c.toUpperCase()),
  },
  {
    id: "snake",
    label: "snake_case",
    convert: (t: string) =>
      t.trim().replace(/\s+/g, "_").toLowerCase(),
  },
  {
    id: "kebab",
    label: "kebab-case",
    convert: (t: string) =>
      t.trim().replace(/\s+/g, "-").toLowerCase(),
  },
];

function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function ConversionCard({ label, result }: { label: string; result: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${label.replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      border: "1px solid #e5e7eb",
      borderRadius: "10px",
      background: "#fff",
      overflow: "hidden",
      marginBottom: "10px",
    }}>
      {/* Card header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 14px",
        borderBottom: "1px solid #f3f4f6",
      }}>
        <span style={{ fontSize: "13.5px", fontWeight: 700, color: "#1f2937" }}>{label}</span>
        <div style={{ display: "flex", gap: "6px" }}>
          {/* Copy */}
          <button
            onClick={handleCopy}
            style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "4px 10px",
              border: "1px solid #e5e7eb", borderRadius: "6px",
              background: "#fff",
              color: copied ? "#16a34a" : "#6b7280",
              fontSize: "12px", fontWeight: 500, cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { if (!copied) e.currentTarget.style.background = "#f9fafb"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            {copied ? "Copied!" : "Copy"}
          </button>
          {/* Download */}
          <button
            onClick={handleDownload}
            style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "4px 10px",
              border: "none", borderRadius: "6px",
              background: "#4A90D9", color: "#fff",
              fontSize: "12px", fontWeight: 600, cursor: "pointer",
              transition: "background 0.15s",
              boxShadow: "0 1px 3px rgba(74,144,217,0.25)",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#357abd")}
            onMouseLeave={e => (e.currentTarget.style.background = "#4A90D9")}
          >
            <DownloadIcon />
            Download
          </button>
        </div>
      </div>

      {/* Result */}
      <div style={{ padding: "10px 14px 12px" }}>
        <p style={{
          margin: 0,
          fontFamily: "'Menlo', 'Consolas', 'Monaco', monospace",
          fontSize: "12.5px",
          color: result ? "#374151" : "#9ca3af",
          lineHeight: 1.6,
          wordBreak: "break-all",
        }}>
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
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setText(ev.target?.result as string);
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* ── Top Toolbar ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}>
        <input ref={fileInputRef} type="file" accept=".txt,.md,.csv" style={{ display: "none" }} onChange={handleUpload} />
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "8px 14px",
            border: "1px solid #d1d5db", borderRadius: "8px",
            background: "#fff", color: "#374151",
            fontSize: "13.5px", fontWeight: 500, cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#f9fafb")}
          onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Upload File
        </button>

        <button
          onClick={() => setText("")}
          style={{
            padding: "8px 14px",
            border: "1px solid #d1d5db", borderRadius: "8px",
            background: "#fff", color: "#374151",
            fontSize: "13.5px", fontWeight: 500, cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#f9fafb")}
          onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
        >
          Clear
        </button>
      </div>

      {/* ── Input Area ── */}
      <div style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        background: "#fff",
        overflow: "hidden",
        marginBottom: "24px",
      }}>
        {/* Header */}
        <div style={{
          padding: "12px 16px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#4A90D9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 7 4 4 20 4 20 7"/>
            <line x1="9" y1="20" x2="15" y2="20"/>
            <line x1="12" y1="4" x2="12" y2="20"/>
          </svg>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>Enter your text</span>
        </div>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          spellCheck={false}
          style={{
            width: "100%",
            minHeight: "130px",
            border: "none",
            outline: "none",
            resize: "vertical",
            padding: "16px",
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            fontSize: "14px",
            color: "#374151",
            background: "transparent",
            lineHeight: 1.7,
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* ── Conversions Section ── */}
      <div>
        <h3 style={{
          fontSize: "15px",
          fontWeight: 700,
          color: "#111827",
          marginBottom: "14px",
          marginTop: 0,
        }}>
          Conversions
        </h3>

        {converters.map(({ id, label, convert }) => (
          <ConversionCard
            key={id}
            label={label}
            result={text ? convert(text) : ""}
          />
        ))}
      </div>
    </div>
  );
}
