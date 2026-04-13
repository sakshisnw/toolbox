"use client";
import { useState, useEffect } from "react";
import { ImageDropzone } from "@/components/ImageDropzone";
import { compressImage, formatBytes, downloadBlob } from "@/utils/imageTools";

export function CompressClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [result, setResult] = useState<{ blob: Blob; url: string; originalSize: number; compressedSize: number } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) return;
    setLoading(true);
    setPreview(URL.createObjectURL(file));
    compressImage(file, quality)
      .then(setResult)
      .finally(() => setLoading(false));
  }, [file, quality]);

  const savings = result
    ? Math.round(((result.originalSize - result.compressedSize) / result.originalSize) * 100)
    : 0;

  return (
    <div className="space-y-5">
      {!file ? (
        <ImageDropzone onFile={setFile} />
      ) : (
        <>
          {/* Quality slider */}
          <div className="card p-5">
            <div className="flex justify-between mb-2">
              <label className="label mb-0">Compression Quality</label>
              <span className="text-xs font-mono font-bold" style={{ color: "var(--accent)" }}>
                {Math.round(quality * 100)}%
              </span>
            </div>
            <input
              type="range"
              className="w-full"
              min="0.1"
              max="1"
              step="0.05"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              <span>Smallest file</span>
              <span>Best quality</span>
            </div>
          </div>

          {/* Stats */}
          {result && !loading && (
            <div className="result-box p-5 animate-slide-up">
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <div className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                    {formatBytes(result.originalSize)}
                  </div>
                  <div className="stat-label">Original</div>
                </div>
                <div>
                  <div className="stat-value">{savings}%</div>
                  <div className="stat-label">Saved</div>
                </div>
                <div>
                  <div className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: "#10b981" }}>
                    {formatBytes(result.compressedSize)}
                  </div>
                  <div className="stat-label">Compressed</div>
                </div>
              </div>

              {/* Size bar */}
              <div className="h-2 rounded-full overflow-hidden mb-4" style={{ background: "var(--border)" }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(result.compressedSize / result.originalSize) * 100}%`,
                    background: savings > 50 ? "#10b981" : savings > 20 ? "#f59e0b" : "#ef4444",
                  }}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => downloadBlob(result.blob, `compressed_${file.name.replace(/\.[^.]+$/, "")}.jpg`)}
                  className="flex-1 py-3 rounded-xl text-sm font-bold transition-colors"
                  style={{ background: "var(--accent)", color: "white", fontFamily: "var(--font-display)" }}
                >
                  ⬇ Download Compressed
                </button>
                <button
                  onClick={() => { setFile(null); setResult(null); setPreview(null); }}
                  className="py-3 px-4 rounded-xl text-sm font-medium"
                  style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center py-6 text-sm" style={{ color: "var(--text-muted)" }}>
              <div className="animate-pulse-soft text-2xl mb-2">⚙️</div>
              Compressing…
            </div>
          )}

          {/* Image preview comparison */}
          {preview && result && !loading && (
            <div className="card p-4">
              <div className="text-xs font-medium mb-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-display)" }}>
                Preview (compressed)
              </div>
              <img src={result.url} alt="Compressed preview" className="w-full rounded-xl object-contain max-h-64" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
