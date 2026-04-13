"use client";
import { useState } from "react";
import { ImageDropzone } from "@/components/ImageDropzone";
import { convertImage, type ImageFormat, formatBytes, downloadBlob } from "@/utils/imageTools";

const formats: { label: string; value: ImageFormat; ext: string; desc: string }[] = [
  { label: "PNG", value: "image/png", ext: "png", desc: "Lossless, supports transparency" },
  { label: "JPEG", value: "image/jpeg", ext: "jpg", desc: "Smaller size, no transparency" },
  { label: "WebP", value: "image/webp", ext: "webp", desc: "Best compression, modern format" },
];

export function ConvertClient() {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>("image/webp");
  const [quality, setQuality] = useState(0.9);
  const [result, setResult] = useState<{ blob: Blob; url: string; ext: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const r = await convertImage(file, targetFormat, quality);
      setResult(r);
    } finally {
      setLoading(false);
    }
  };

  const currentExt = file?.name.split(".").pop()?.toUpperCase() ?? "";
  const targetLabel = formats.find((f) => f.value === targetFormat)?.label ?? "";

  return (
    <div className="space-y-5">
      {!file ? (
        <ImageDropzone onFile={(f) => { setFile(f); setResult(null); }} />
      ) : (
        <>
          <div className="card p-4 text-xs flex gap-4" style={{ color: "var(--text-muted)" }}>
            <span>📄 <strong style={{ color: "var(--text)" }}>{file.name}</strong></span>
            <span>📦 {formatBytes(file.size)}</span>
            <span className="ml-auto px-2 py-0.5 rounded text-xs font-bold"
              style={{ background: "var(--bg-subtle)", color: "var(--text)", fontFamily: "var(--font-display)" }}>
              {currentExt}
            </span>
          </div>

          <div className="card p-5 space-y-4">
            <div>
              <label className="label">Convert to</label>
              <div className="grid grid-cols-3 gap-3">
                {formats.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => { setTargetFormat(f.value); setResult(null); }}
                    className="p-3 rounded-xl text-left transition-all"
                    style={{
                      background: targetFormat === f.value ? "var(--accent)" : "var(--bg-subtle)",
                      color: targetFormat === f.value ? "white" : "var(--text)",
                      border: `2px solid ${targetFormat === f.value ? "var(--accent)" : "transparent"}`,
                    }}
                  >
                    <div className="font-bold text-base mb-0.5" style={{ fontFamily: "var(--font-display)" }}>
                      {f.label}
                    </div>
                    <div className="text-xs opacity-80">{f.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {targetFormat !== "image/png" && (
              <div>
                <div className="flex justify-between mb-2">
                  <label className="label mb-0">Quality</label>
                  <span className="text-xs font-mono font-bold" style={{ color: "var(--accent)" }}>
                    {Math.round(quality * 100)}%
                  </span>
                </div>
                <input type="range" className="w-full" min="0.1" max="1" step="0.05"
                  value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} />
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleConvert}
                disabled={loading}
                className="flex-1 py-3 rounded-xl text-sm font-bold disabled:opacity-50 transition-colors"
                style={{ background: "var(--accent)", color: "white", fontFamily: "var(--font-display)" }}
              >
                {loading ? "Converting…" : `🔄 Convert to ${targetLabel}`}
              </button>
              <button onClick={() => { setFile(null); setResult(null); }}
                className="py-3 px-4 rounded-xl text-sm"
                style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}>
                ✕
              </button>
            </div>
          </div>

          {result && (
            <div className="result-box p-5 animate-slide-up space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">✅</div>
                  <div>
                    <div className="font-bold" style={{ fontFamily: "var(--font-display)" }}>
                      Converted to {targetLabel}
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {formatBytes(file.size)} → {formatBytes(result.blob.size)}
                      {result.blob.size < file.size && (
                        <span className="ml-2" style={{ color: "#10b981" }}>
                          ({Math.round((1 - result.blob.size / file.size) * 100)}% smaller)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const name = file.name.replace(/\.[^.]+$/, "") + "." + result.ext;
                    downloadBlob(result.blob, name);
                  }}
                  className="py-2.5 px-5 rounded-xl text-sm font-bold"
                  style={{ background: "var(--accent)", color: "white", fontFamily: "var(--font-display)" }}
                >
                  ⬇ Download
                </button>
              </div>
              <img src={result.url} alt="Converted" className="w-full rounded-xl object-contain max-h-56" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
