"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { CopyButton } from "@/components/CopyButton";

type Format = "auto" | "base64" | "gzip" | "jwt" | "url";

const FORMATS: { value: Format; label: string }[] = [
  { value: "auto", label: "Auto" },
  { value: "base64", label: "Base64" },
  { value: "gzip", label: "Gzip" },
  { value: "jwt", label: "JWT" },
  { value: "url", label: "URL" },
];

export function Base64EncoderClient() {
  const [mode, setMode] = useState<"decode" | "encode">("decode");
  const [format, setFormat] = useState<Format>("auto");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [detectedAs, setDetectedAs] = useState<string | null>(null);
  const [jwtParts, setJwtParts] = useState<{
    header: string;
    payload: string;
    signature: string;
  } | null>(null);
  const [splitPercent, setSplitPercent] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Drag handle ───────────────────────────────────────────────────────────

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.min(80, Math.max(20, (x / rect.width) * 100));
      setSplitPercent(pct);
    };
    const onMouseUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────────────

  const b64Encode = (str: string) => btoa(unescape(encodeURIComponent(str)));
  const b64Decode = (str: string) =>
    decodeURIComponent(escape(atob(str.trim().replace(/\s/g, ""))));

  const gzipEncode = async (str: string): Promise<string> => {
    const data = new TextEncoder().encode(str);
    const cs = new CompressionStream("gzip");
    const writer = cs.writable.getWriter();
    writer.write(data);
    writer.close();
    const buf = await new Response(cs.readable).arrayBuffer();
    let binary = "";
    new Uint8Array(buf).forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary);
  };

  const gzipDecode = async (str: string): Promise<string> => {
    const binary = atob(str.trim());
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const ds = new DecompressionStream("gzip");
    const writer = ds.writable.getWriter();
    writer.write(bytes);
    writer.close();
    const buf = await new Response(ds.readable).arrayBuffer();
    return new TextDecoder().decode(buf);
  };

  const parseJwt = (token: string) => {
    const parts = token.trim().split(".");
    if (parts.length !== 3) throw new Error("Invalid JWT — must have 3 parts.");
    const dec = (s: string) => {
      const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
      return JSON.parse(
        atob((s + pad).replace(/-/g, "+").replace(/_/g, "/"))
      );
    };
    return {
      header: JSON.stringify(dec(parts[0]), null, 2),
      payload: JSON.stringify(dec(parts[1]), null, 2),
      signature: parts[2],
    };
  };

  const buildJwt = (payloadJson: string): string => {
    const enc = (obj: object) =>
      btoa(JSON.stringify(obj))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
    const header = { alg: "HS256", typ: "JWT" };
    return `${enc(header)}.${enc(JSON.parse(payloadJson))}.UNSIGNED`;
  };

  // ── Auto detect ───────────────────────────────────────────────────────────

  type DetectResult =
    | { format: "jwt"; data: ReturnType<typeof parseJwt> }
    | { format: "url"; decoded: string }
    | { format: "gzip"; decoded: string }
    | { format: "base64"; decoded: string }
    | null;

  const autoDetect = async (val: string): Promise<DetectResult> => {
    const t = val.trim();

    if (/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/.test(t)) {
      try {
        const data = parseJwt(t);
        return { format: "jwt", data };
      } catch { /* fall through */ }
    }

    if (/%[0-9A-Fa-f]{2}/.test(t)) {
      try {
        return { format: "url", decoded: decodeURIComponent(t) };
      } catch { /* fall through */ }
    }

    if (/^[A-Za-z0-9+/=\s]+$/.test(t)) {
      try {
        const decoded = await gzipDecode(t);
        if (/^[\x09\x0A\x0D\x20-\x7E\u00A0-\uFFFF]+$/.test(decoded)) {
          return { format: "gzip", decoded };
        }
      } catch { /* fall through */ }
    }

    if (/^[A-Za-z0-9+/=\s]+$/.test(t) && t.replace(/\s/g, "").length % 4 === 0) {
      try {
        const decoded = b64Decode(t);
        return { format: "base64", decoded };
      } catch { /* fall through */ }
    }

    return null;
  };

  // ── Process ───────────────────────────────────────────────────────────────

  const process = useCallback(
    async (val: string) => {
      setError("");
      setJwtParts(null);
      setDetectedAs(null);
      if (!val.trim()) { setOutput(""); return; }

      try {
        if (mode === "encode") {
          const fmt = format === "auto" ? "base64" : format;
          switch (fmt) {
            case "base64": setOutput(b64Encode(val)); break;
            case "gzip": setOutput(await gzipEncode(val)); break;
            case "url": setOutput(encodeURIComponent(val)); break;
            case "jwt": {
              const result = buildJwt(val);
              setOutput(result);
              break;
            }
          }
          return;
        }

        if (format === "auto") {
          const result = await autoDetect(val);
          if (!result) {
            throw new Error("Could not detect encoding. Try selecting a specific format.");
          }
          if (result.format === "jwt") {
            setDetectedAs("JWT");
            setJwtParts(result.data);
            setOutput(`${result.data.header}\n\n${result.data.payload}`);
          } else if (result.format === "url") {
            setDetectedAs("URL Encoded");
            setOutput(result.decoded);
          } else if (result.format === "gzip") {
            setDetectedAs("Gzip + Base64");
            setOutput(result.decoded);
          } else {
            setDetectedAs("Base64");
            setOutput(result.decoded);
          }
          return;
        }

        switch (format) {
          case "base64": setOutput(b64Decode(val)); break;
          case "gzip": setOutput(await gzipDecode(val)); break;
          case "url": setOutput(decodeURIComponent(val)); break;
          case "jwt": {
            const parts = parseJwt(val);
            setJwtParts(parts);
            setOutput(`${parts.header}\n\n${parts.payload}`);
            break;
          }
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Processing failed.";
        setError(msg);
        setOutput("");
      }
    },
    [mode, format]
  );

  useEffect(() => {
    const t = setTimeout(() => process(input), 150);
    return () => clearTimeout(t);
  }, [input, process]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleModeChange = (m: "encode" | "decode") => {
    setMode(m);
    if (m === "encode" && format === "auto") setFormat("base64");
    setInput(""); setOutput(""); setError("");
    setJwtParts(null); setDetectedAs(null);
  };

  const handleFormatChange = (f: Format) => {
    setFormat(f);
    setInput(""); setOutput(""); setError("");
    setJwtParts(null); setDetectedAs(null);
  };

  const loadSample = () => {
    const samples: Record<Format, { encode: string; decode: string }> = {
      auto: {
        encode: "",
        decode: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      },
      base64: {
        encode: "Hello, World! 🌍",
        decode: "SGVsbG8sIFdvcmxkISAg8J+Mjg==",
      },
      gzip: {
        encode: "Hello, World! This text will be Gzip compressed.",
        decode: "",
      },
      jwt: {
        encode: '{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}',
        decode: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      },
      url: {
        encode: "https://example.com/search?q=hello world&lang=en",
        decode: "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26lang%3Den",
      },
    };
    setInput(samples[format][mode] || samples[format].decode);
  };

  const swap = () => {
    if (!output || error) return;
    const newInput = jwtParts
      ? `${jwtParts.header}\n\n${jwtParts.payload}`
      : output;
    setInput(newInput);
    setOutput("");
    setJwtParts(null);
    setDetectedAs(null);
    setError("");
    setMode(mode === "encode" ? "decode" : "encode");
  };

  const clearAll = () => {
    setInput(""); setOutput(""); setError("");
    setJwtParts(null); setDetectedAs(null);
  };

  // ── Placeholder text ──────────────────────────────────────────────────────

  const inputPlaceholder: Record<Format, { encode: string; decode: string }> = {
    auto: {
      encode: "Paste text to encode…",
      decode: "Paste any encoded string — Base64, Gzip, JWT, or URL encoded…\n\nAuto Detect will identify the format and decode it.",
    },
    base64: {
      encode: "Paste or type text to encode to Base64…",
      decode: "Paste a Base64 string to decode…",
    },
    gzip: {
      encode: "Paste text to compress with Gzip (output is Base64)…",
      decode: "Paste a Base64-encoded Gzip string to decompress…",
    },
    jwt: {
      encode: 'Paste a JSON payload to build a JWT…\n\nExample:\n{\n  "sub": "123",\n  "name": "Alice"\n}',
      decode: "Paste a JWT token to inspect its header and payload…",
    },
    url: {
      encode: "Paste a URL or text to URL-encode…",
      decode: "Paste a URL-encoded string to decode…",
    },
  };

  const showJwtView =
    (format === "jwt" || (format === "auto" && detectedAs)) &&
    mode === "decode" &&
    jwtParts;

  const visibleFormats = mode === "encode"
    ? FORMATS.filter((f) => f.value !== "auto")
    : FORMATS;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div>

      {/* ── Top bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">

        {/* Mode toggle */}
        <div
          className="flex p-1 rounded-xl w-fit flex-shrink-0"
          style={{ background: "var(--bg-subtle)" }}
        >
          {(["decode", "encode"] as const).map((m) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className="px-5 py-1.5 rounded-lg text-sm font-medium transition-all capitalize"
              style={{
                background: mode === m ? "var(--bg-card)" : "transparent",
                color: mode === m ? "var(--accent)" : "var(--text-muted)",
                boxShadow: mode === m ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Format pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {visibleFormats.map((f) => (
            <button
              key={f.value}
              onClick={() => handleFormatChange(f.value)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: format === f.value ? "var(--accent)" : "var(--bg-subtle)",
                color: format === f.value ? "white" : "var(--text-muted)",
                border: format === f.value ? "none" : "0.5px solid var(--border)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Split editor ── */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "0.5px solid var(--border)" }}
      >
        {/* Column headers */}
        <div
          className="flex text-[10px] tracking-widest font-medium"
          style={{
            background: "var(--bg-subtle)",
            borderBottom: "0.5px solid var(--border)",
          }}
        >
          {/* Input header */}
          <div
            className="flex items-center justify-between px-4 py-2.5 flex-shrink-0"
            style={{
              width: `${splitPercent}%`,
              borderRight: "0.5px solid var(--border)",
            }}
          >
            <span style={{ color: "var(--text-muted)" }}>INPUT</span>
            <button
              onClick={loadSample}
              className="text-[10px] px-2 py-0.5 rounded normal-case tracking-normal transition-colors"
              style={{
                background: "var(--bg-card)",
                color: "var(--text-muted)",
                border: "0.5px solid var(--border)",
              }}
            >
              Load sample
            </button>
          </div>

          {/* Output header */}
          <div className="flex items-center justify-between px-4 py-2.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span style={{ color: "var(--text-muted)" }}>OUTPUT</span>
              {detectedAs && (
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full normal-case tracking-normal font-medium"
                  style={{
                    background: "color-mix(in srgb, var(--accent) 15%, transparent)",
                    color: "var(--accent)",
                  }}
                >
                  Detected: {detectedAs}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {output && !error && (
                <button
                  onClick={swap}
                  className="text-[10px] px-2 py-0.5 rounded normal-case tracking-normal transition-colors"
                  style={{
                    background: "var(--bg-card)",
                    color: "var(--text-muted)",
                    border: "0.5px solid var(--border)",
                  }}
                >
                  ⇅ Swap
                </button>
              )}
              <CopyButton text={output} label="Copy" />
            </div>
          </div>
        </div>

        {/* Editor area */}
        <div
          ref={containerRef}
          className="flex"
          style={{ minHeight: 320 }}
        >
          {/* Input pane */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={inputPlaceholder[format][mode]}
            className="p-4 font-mono text-sm resize-none focus:outline-none flex-shrink-0"
            style={{
              width: `${splitPercent}%`,
              background: "var(--bg-card)",
              color: "var(--text)",
              minHeight: 320,
              border: "none",
              outline: "none",
            }}
            spellCheck={false}
          />

          {/* ── Drag handle ── */}
          <div
            onMouseDown={() => { dragging.current = true; }}
            style={{
              width: 1,
              flexShrink: 0,
              background: "var(--border)",
              cursor: "col-resize",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              userSelect: "none",
            }}
          >
            {/* Drag grip pill */}
            <div
              style={{
                position: "absolute",
                width: 20,
                height: 32,
                borderRadius: 999,
                background: "var(--bg-subtle)",
                border: "0.5px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                zIndex: 10,
                cursor: "col-resize",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-card)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--bg-subtle)")}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 2,
                    height: 2,
                    borderRadius: "50%",
                    background: "var(--text-muted)",
                    opacity: 0.5,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Output pane */}
          <div
            className="relative flex-1"
            style={{ background: "var(--bg-subtle)", minHeight: 320, minWidth: 0 }}
          >
            {error ? (
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="text-center">
                  <p className="text-xl mb-2">⚠️</p>
                  <p className="text-sm font-medium mb-1" style={{ color: "#dc2626" }}>
                    {error}
                  </p>
                  {format === "auto" && (
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      Try selecting a specific format above
                    </p>
                  )}
                </div>
              </div>

            ) : showJwtView ? (
              <div className="p-4 space-y-3 h-full overflow-auto">
                {[
                  { label: "Header", value: jwtParts.header, color: "#f59e0b" },
                  { label: "Payload", value: jwtParts.payload, color: "var(--accent)" },
                  { label: "Signature", value: jwtParts.signature, color: "#6b7280" },
                ].map((part) => (
                  <div key={part.label}>
                    <p
                      className="text-[10px] tracking-widest font-medium mb-1.5"
                      style={{ color: part.color }}
                    >
                      {part.label.toUpperCase()}
                    </p>
                    <pre
                      className="text-xs p-3 rounded-lg font-mono overflow-auto"
                      style={{
                        background: "var(--bg-card)",
                        border: "0.5px solid var(--border)",
                        color: "var(--text)",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-all",
                      }}
                    >
                      {part.value}
                    </pre>
                  </div>
                ))}
              </div>

            ) : output ? (
              <textarea
                value={output}
                readOnly
                className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none"
                style={{
                  background: "transparent",
                  color: "var(--text)",
                  minHeight: 320,
                  border: "none",
                  outline: "none",
                }}
              />

            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6">
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: "var(--text-muted)", opacity: 0.45 }}
                  >
                    {mode === "decode" && format === "auto"
                      ? "Decoded output will appear here…"
                      : `${mode === "encode" ? "Encoded" : "Decoded"} output will appear here…`}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-muted)", opacity: 0.3 }}
                  >
                    {mode === "decode" && format === "auto"
                      ? "Detects Base64 · Gzip · JWT · URL"
                      : "Start typing on the left"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="flex items-center justify-between mt-3">
        <button
          onClick={clearAll}
          className="text-xs px-3 py-1.5 rounded-lg transition-colors"
          style={{
            background: "var(--bg-subtle)",
            color: "var(--text-muted)",
            border: "0.5px solid var(--border)",
          }}
        >
          Clear
        </button>
        {output && !error && (
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            {output.length.toLocaleString()} chars
          </p>
        )}
      </div>
    </div>
  );
}