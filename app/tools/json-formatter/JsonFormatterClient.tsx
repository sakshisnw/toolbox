"use client";

import { useState, useRef } from "react";

type TabSize = 2 | 4 | 8;

export function JsonFormatterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [tabSize, setTabSize] = useState<TabSize>(2);
  const [tabDropdownOpen, setTabDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [validated, setValidated] = useState<null | boolean>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabOptions: TabSize[] = [2, 4, 8];

  const formatJson = () => {
    try {
      if (!input.trim()) { setOutput(""); setError(""); return; }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, tabSize));
      setError(""); setValidated(null);
    } catch (e) {
      setError(`Invalid JSON: ${e instanceof Error ? e.message : "Unknown error"}`);
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) { setOutput(""); setError(""); return; }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(""); setValidated(null);
    } catch (e) {
      setError(`Invalid JSON: ${e instanceof Error ? e.message : "Unknown error"}`);
      setOutput("");
    }
  };

  const validateJson = () => {
    try {
      if (!input.trim()) { setValidated(null); return; }
      JSON.parse(input);
      setValidated(true); setError("");
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
    a.href = url; a.download = "formatted.json"; a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setInput(ev.target?.result as string); setOutput(""); setError(""); setValidated(null); };
    reader.readAsText(file); e.target.value = "";
  };

  const btnBase: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 6,
    padding: "8px 14px", borderRadius: 8,
    fontSize: "13.5px", fontWeight: 500, cursor: "pointer",
    transition: "background 0.15s", fontFamily: "inherit",
  };

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <input ref={fileInputRef} type="file" accept=".json,application/json" style={{ display: "none" }} onChange={handleUpload} />

        {/* Upload */}
        <button onClick={() => fileInputRef.current?.click()} className="toolbar-btn" style={{ ...btnBase, flex: 1, minWidth: 180, justifyContent: "center", border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text)" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Upload JSON
        </button>

        {/* Validate */}
        <button onClick={validateJson} style={{ ...btnBase, border: `1px solid ${validated === true ? "#22c55e" : validated === false ? "#ef4444" : "var(--border)"}`, background: validated === true ? "rgba(34,197,94,0.1)" : validated === false ? "rgba(239,68,68,0.1)" : "var(--bg-card)", color: validated === true ? "#22c55e" : validated === false ? "#ef4444" : "var(--text)" }}>
          {validated === true ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          : validated === false ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
          Validate
        </button>

        {/* Tab Size Dropdown */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setTabDropdownOpen(!tabDropdownOpen)} style={{ ...btnBase, border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text)" }}>
            {tabSize} Tab Space
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          {tabDropdownOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.15)", zIndex: 50, overflow: "hidden", minWidth: 130 }}>
              {tabOptions.map(opt => (
                <button key={opt} onClick={() => { setTabSize(opt); setTabDropdownOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 16px", background: tabSize === opt ? "var(--accent-light)" : "transparent", color: tabSize === opt ? "var(--accent)" : "var(--text)", fontSize: "13.5px", fontWeight: tabSize === opt ? 600 : 400, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  {opt} Tab Space
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Format */}
        <button onClick={formatJson} style={{ ...btnBase, border: "none", background: "#2563eb", color: "#fff", fontWeight: 600, boxShadow: "0 1px 4px rgba(37,99,235,0.3)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Format / Beautify
        </button>

        {/* Minify */}
        <button onClick={minifyJson} style={{ ...btnBase, border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="15 8 19 12 15 16"/><polyline points="9 8 5 12 9 16"/></svg>
          Minify / Compact
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{ marginBottom: 12, padding: "10px 14px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", fontSize: 13, fontWeight: 500 }}>
          ⚠ {error}
        </div>
      )}

      {/* Two-panel */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "var(--bg-card)", minHeight: 340 }}>
        {/* Input */}
        <div style={{ display: "flex", flexDirection: "column", borderRight: "1px solid var(--border)" }}>
          <div style={{ padding: "12px 16px 10px", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>Input</span>
          </div>
          <textarea value={input} onChange={e => { setInput(e.target.value); setValidated(null); }} placeholder="Paste your JSON here..." spellCheck={false}
            style={{ flex: 1, width: "100%", border: "none", outline: "none", resize: "none", padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "12.5px", color: "var(--text)", background: "transparent", lineHeight: 1.65, minHeight: 300 }} />
        </div>

        {/* Output */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>Output</span>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={handleCopy} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", border: "1px solid var(--border)", borderRadius: 6, background: "var(--bg-subtle)", color: copied ? "#22c55e" : "var(--text-muted)", fontSize: 12, fontWeight: 500, cursor: output ? "pointer" : "default", opacity: output ? 1 : 0.5, fontFamily: "inherit" }}>
                {copied ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={handleDownload} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", border: "1px solid rgba(37,99,235,0.4)", borderRadius: 6, background: "var(--accent-light)", color: "var(--accent)", fontSize: 12, fontWeight: 600, cursor: output ? "pointer" : "default", opacity: output ? 1 : 0.5, fontFamily: "inherit" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download
              </button>
            </div>
          </div>
          <pre style={{ flex: 1, margin: 0, padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "12.5px", color: output ? "var(--text)" : "var(--text-muted)", background: "transparent", lineHeight: 1.65, overflow: "auto", whiteSpace: "pre-wrap", wordBreak: "break-word", minHeight: 300 }}>
            {output || "Formatted JSON will appear here..."}
          </pre>
        </div>
      </div>

      {tabDropdownOpen && <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => setTabDropdownOpen(false)} />}
    </div>
  );
}
