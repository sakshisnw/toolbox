"use client";

import { useState, useMemo, useRef } from "react";

interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
}

function calculateStats(text: string): TextStats {
  const trimmed = text.trim();
  if (!trimmed) {
    return { words: 0, characters: 0, charactersNoSpaces: 0, sentences: 0, paragraphs: 0, readingTime: 0 };
  }
  const words = trimmed.split(/\s+/).filter((w) => w.length > 0).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
  const readingTime = Math.ceil(words / 200);
  return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime };
}

// Stat card background colors matching the image (blue gradient palette)
const CARD_COLORS = [
  "#4A90D9", // Words — medium blue
  "#2C5FA8", // Characters — darker blue
  "#5B6D7A", // Characters (No Spaces) — slate/dark gray-blue
  "#3D5A80", // Sentences — dark navy-blue
  "#1C2B3A", // Paragraphs — very dark navy
  "#4A90D9", // Reading Time — medium blue (matches Words)
];

const CARD_LABELS = [
  "WORDS",
  "CHARACTERS",
  "CHARACTERS (NO SPACES)",
  "SENTENCES",
  "PARAGRAPHS",
  "READING TIME (MIN)",
];

export function WordCounterClient() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const stats = useMemo(() => calculateStats(text), [text]);

  const statValues = [
    stats.words,
    stats.characters,
    stats.charactersNoSpaces,
    stats.sentences,
    stats.paragraphs,
    stats.readingTime,
  ];

  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

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

      {/* ── Toolbar ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "20px",
        gap: "8px",
        flexWrap: "wrap",
      }}>
        {/* Left buttons */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {/* Upload File */}
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

          {/* Copy */}
          <button
            onClick={handleCopy}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 14px",
              border: "1px solid #d1d5db", borderRadius: "8px",
              background: "#fff", color: copied ? "#16a34a" : "#374151",
              fontSize: "13.5px", fontWeight: 500, cursor: text ? "pointer" : "default",
              opacity: text ? 1 : 0.55, transition: "all 0.15s",
            }}
            onMouseEnter={e => { if (text) e.currentTarget.style.background = "#f9fafb"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
          >
            {copied ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            )}
            {copied ? "Copied!" : "Copy"}
          </button>

          {/* Download — blue filled */}
          <button
            onClick={handleDownload}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 14px",
              border: "none", borderRadius: "8px",
              background: "#4A90D9", color: "#fff",
              fontSize: "13.5px", fontWeight: 600, cursor: text ? "pointer" : "default",
              opacity: text ? 1 : 0.55, transition: "background 0.15s",
              boxShadow: "0 1px 4px rgba(74,144,217,0.3)",
            }}
            onMouseEnter={e => { if (text) e.currentTarget.style.background = "#357abd"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#4A90D9"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download
          </button>
        </div>

        {/* Clear — right side */}
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

      {/* ── 6 Stat Cards ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "8px",
        marginBottom: "24px",
      }}>
        {CARD_LABELS.map((label, i) => (
          <div
            key={label}
            style={{
              background: CARD_COLORS[i],
              borderRadius: "10px",
              padding: "16px 10px 14px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "80px",
            }}
          >
            <span style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
            }}>
              {statValues[i]}
            </span>
            <span style={{
              fontSize: "9.5px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.80)",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              marginTop: "6px",
              textAlign: "center",
              lineHeight: 1.3,
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Text Area Section ── */}
      <div style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff",
      }}>
        {/* Section header */}
        <div style={{
          padding: "12px 16px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A90D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>
            Enter or paste your text
          </span>
        </div>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          spellCheck={false}
          style={{
            width: "100%",
            minHeight: "240px",
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
    </div>
  );
}
