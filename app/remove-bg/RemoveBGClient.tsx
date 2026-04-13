"use client";
import { useState } from "react";
import { ImageDropzone } from "@/components/ImageDropzone";
import { removeBackground, formatBytes, downloadBlob } from "@/utils/imageTools";

const checkerBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Crect width='8' height='8' fill='%23ccc'/%3E%3Crect x='8' y='8' width='8' height='8' fill='%23ccc'/%3E%3Crect x='8' width='8' height='8' fill='%23fff'/%3E%3Crect y='8' width='8' height='8' fill='%23fff'/%3E%3C/svg%3E")`;

export function RemoveBGClient() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewBg, setPreviewBg] = useState<"checker" | "white" | "black">("checker");

  const handleProcess = async (f: File) => {
    setFile(f);
    setLoading(true);
    try {
      const r = await removeBackground(f);
      setResult(r);
    } finally {
      setLoading(false);
    }
  };

  const bgStyles: Record<typeof previewBg, React.CSSProperties> = {
    checker: { backgroundImage: checkerBg, backgroundSize: "16px 16px" },
    white: { background: "#ffffff" },
    black: { background: "#111111" },
  };

  return (
    <div className="space-y-5">
      {/* Notice */}
      <div
        className="px-4 py-3 rounded-xl text-xs flex items-start gap-2"
        style={{ background: "color-mix(in srgb, #f59e0b 12%, transparent)", border: "1px solid color-mix(in srgb, #f59e0b 25%, transparent)", color: "var(--text)" }}
      >
        <span className="mt-0.5">⚠️</span>
        <span>
          This tool uses <strong>client-side edge detection</strong> by sampling corner colors as background.
          Works best with solid-color backgrounds (white, black, blue skies, etc.).
          For complex backgrounds, AI-powered tools (like remove.bg) will give better results.
        </span>
      </div>

      {!file || (!result && !loading) ? (
        <ImageDropzone
          onFile={handleProcess}
          label="Drop image here — background will be removed instantly"
        />
      ) : null}

      {loading && (
        <div className="text-center py-10" style={{ color: "var(--text-muted)" }}>
          <div className="text-4xl mb-3 animate-pulse-soft">✂️</div>
          <p className="text-sm font-medium">Removing background…</p>
        </div>
      )}

      {result && file && !loading && (
        <>
          {/* BG picker */}
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-display)" }}>
              Preview on:
            </span>
            {(["checker", "white", "black"] as const).map((bg) => (
              <button
                key={bg}
                onClick={() => setPreviewBg(bg)}
                className="w-7 h-7 rounded-full border-2 transition-all"
                style={{
                  ...bgStyles[bg],
                  backgroundSize: bg === "checker" ? "8px 8px" : undefined,
                  borderColor: previewBg === bg ? "var(--accent)" : "var(--border)",
                }}
                title={bg}
              />
            ))}
          </div>

          {/* Comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card overflow-hidden">
              <div className="px-3 py-2 text-xs font-medium border-b" style={{ borderColor: "var(--border)", color: "var(--text-muted)", fontFamily: "var(--font-display)" }}>
                Original
              </div>
              <div className="p-3">
                <img src={URL.createObjectURL(file)} alt="Original" className="w-full rounded-lg object-contain max-h-48" />
              </div>
            </div>
            <div className="card overflow-hidden">
              <div className="px-3 py-2 text-xs font-medium border-b" style={{ borderColor: "var(--border)", color: "var(--text-muted)", fontFamily: "var(--font-display)" }}>
                Background removed
              </div>
              <div className="p-3 rounded-b-xl" style={bgStyles[previewBg]}>
                <img src={result.url} alt="No background" className="w-full rounded-lg object-contain max-h-48" />
              </div>
            </div>
          </div>

          <div className="result-box p-5 flex items-center justify-between gap-4">
            <div className="text-sm" style={{ color: "var(--text-muted)" }}>
              Saved as <strong style={{ color: "var(--text)" }}>PNG with transparency</strong> · {formatBytes(result.blob.size)}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => downloadBlob(result.blob, `no-bg_${file.name.replace(/\.[^.]+$/, "")}.png`)}
                className="py-2.5 px-4 rounded-xl text-sm font-bold"
                style={{ background: "var(--accent)", color: "white", fontFamily: "var(--font-display)" }}
              >
                ⬇ Download PNG
              </button>
              <button
                onClick={() => { setFile(null); setResult(null); }}
                className="py-2.5 px-3 rounded-xl text-sm"
                style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
              >
                ✕
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
