"use client";

import { useState, useRef } from "react";

type TabSize = 2 | 4 | 8;
type ActiveMode = "format" | "minify";

export function JsonFormatterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [tabSize, setTabSize] = useState<TabSize>(2);
  const [activeMode, setActiveMode] = useState<ActiveMode>("format");
  const [tabDropdownOpen, setTabDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [validated, setValidated] = useState<null | boolean>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabOptions: TabSize[] = [2, 4, 8];

  const formatJson = () => {
    setActiveMode("format");
    try {
      if (!input.trim()) { setOutput(""); setError(""); return; }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, tabSize));
      setError("");
      setValidated(null);
    } catch (e) {
      setError(`Invalid JSON: ${e instanceof Error ? e.message : "Unknown error"}`);
      setOutput("");
    }
  };

  const minifyJson = () => {
    setActiveMode("minify");
    try {
      if (!input.trim()) { setOutput(""); setError(""); return; }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
      setValidated(null);
    } catch (e) {
      setError(`Invalid JSON: ${e instanceof Error ? e.message : "Unknown error"}`);
      setOutput("");
    }
  };

  const validateJson = () => {
    try {
      if (!input.trim()) { setValidated(null); return; }
      JSON.parse(input);
      setValidated(true);
      setError("");
    } catch (e) {
      setValidated(false);
      setError(`Invalid JSON: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setInput(ev.target?.result as string);
      setOutput("");
      setError("");
      setValidated(null);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* Toolbar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "16px",
        flexWrap: "wrap",
      }}>
        {/* Upload JSON */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            flex: "1",
            minWidth: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "8px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            background: "#fff",
            color: "#374151",
            fontSize: "13.5px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#f9fafb")}
          onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Upload JSON
        </button>

        {/* Validate */}
        <button
          onClick={validateJson}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 14px",
            border: `1px solid ${validated === true ? "#22c55e" : validated === false ? "#ef4444" : "#d1d5db"}`,
            borderRadius: "8px",
            background: validated === true ? "#f0fdf4" : validated === false ? "#fef2f2" : "#fff",
            color: validated === true ? "#16a34a" : validated === false ? "#dc2626" : "#374151",
            fontSize: "13.5px",
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "all 0.15s",
          }}
          onMouseEnter={e => { if (validated === null) e.currentTarget.style.background = "#f9fafb"; }}
          onMouseLeave={e => { if (validated === null) e.currentTarget.style.background = "#fff"; }}
        >
          {validated === true ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          ) : validated === false ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          )}
          Validate
        </button>

        {/* Tab Size Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setTabDropdownOpen(!tabDropdownOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              background: "#fff",
              color: "#374151",
              fontSize: "13.5px",
              fontWeight: 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#f9fafb")}
            onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
          >
            {tabSize} Tab Space
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          {tabDropdownOpen && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
              zIndex: 50,
              overflow: "hidden",
              minWidth: "130px",
            }}>
              {tabOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => { setTabSize(opt); setTabDropdownOpen(false); }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 16px",
                    background: tabSize === opt ? "#eff6ff" : "#fff",
                    color: tabSize === opt ? "#2563eb" : "#374151",
                    fontSize: "13.5px",
                    fontWeight: tabSize === opt ? 600 : 400,
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={e => { if (tabSize !== opt) e.currentTarget.style.background = "#f9fafb"; }}
                  onMouseLeave={e => { if (tabSize !== opt) e.currentTarget.style.background = "#fff"; }}
                >
                  {opt} Tab Space
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Format / Beautify */}
        <button
          onClick={formatJson}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            border: "none",
            borderRadius: "8px",
            background: "#2563eb",
            color: "#fff",
            fontSize: "13.5px",
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "background 0.15s",
            boxShadow: "0 1px 4px rgba(37,99,235,0.25)",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#1d4ed8")}
          onMouseLeave={e => (e.currentTarget.style.background = "#2563eb")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
          Format / Beautify
        </button>

        {/* Minify / Compact */}
        <button
          onClick={minifyJson}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            background: "#fff",
            color: "#374151",
            fontSize: "13.5px",
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#f9fafb")}
          onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="15 8 19 12 15 16"/>
            <polyline points="9 8 5 12 9 16"/>
          </svg>
          Minify / Compact
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div style={{
          marginBottom: "12px",
          padding: "10px 14px",
          borderRadius: "8px",
          background: "#fef2f2",
          border: "1px solid #fecaca",
          color: "#dc2626",
          fontSize: "13px",
          fontWeight: 500,
        }}>
          ⚠ {error}
        </div>
      )}

      {/* Two-panel layout */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff",
        minHeight: "340px",
      }}>
        {/* Input Panel */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #e5e7eb",
        }}>
          <div style={{
            padding: "12px 16px 10px",
            borderBottom: "1px solid #e5e7eb",
          }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>Input</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setValidated(null); }}
            placeholder="Paste your JSON here..."
            spellCheck={false}
            style={{
              flex: 1,
              width: "100%",
              border: "none",
              outline: "none",
              resize: "none",
              padding: "14px 16px",
              fontFamily: "'Menlo', 'Consolas', 'Monaco', monospace",
              fontSize: "12.5px",
              color: "#374151",
              background: "transparent",
              lineHeight: 1.65,
              minHeight: "300px",
            }}
          />
        </div>

        {/* Output Panel */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{
            padding: "10px 16px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>Output</span>
            <div style={{ display: "flex", gap: "6px" }}>
              {/* Copy */}
              <button
                onClick={handleCopy}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "5px 11px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  background: "#fff",
                  color: copied ? "#16a34a" : "#6b7280",
                  fontSize: "12px",
                  fontWeight: 500,
                  cursor: output ? "pointer" : "default",
                  opacity: output ? 1 : 0.5,
                  transition: "all 0.15s",
                }}
              >
                {copied ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
              {/* Download */}
              <button
                onClick={handleDownload}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "5px 11px",
                  border: "1px solid #bfdbfe",
                  borderRadius: "6px",
                  background: "#eff6ff",
                  color: "#2563eb",
                  fontSize: "12px",
                  fontWeight: 500,
                  cursor: output ? "pointer" : "default",
                  opacity: output ? 1 : 0.5,
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { if (output) e.currentTarget.style.background = "#dbeafe"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#eff6ff"; }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download
              </button>
            </div>
          </div>
          <pre
            style={{
              flex: 1,
              margin: 0,
              padding: "14px 16px",
              fontFamily: "'Menlo', 'Consolas', 'Monaco', monospace",
              fontSize: "12.5px",
              color: output ? "#374151" : "#9ca3af",
              background: "transparent",
              lineHeight: 1.65,
              overflow: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              minHeight: "300px",
            }}
          >
            {output || "Formatted JSON will appear here..."}
          </pre>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {tabDropdownOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 40 }}
          onClick={() => setTabDropdownOpen(false)}
        />
      )}
    </div>
  );
}
