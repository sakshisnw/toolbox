"use client";
import { useState, useEffect } from "react";
import { ImageDropzone } from "@/components/ImageDropzone";
import { resizeImage, getImageDimensions, formatBytes, downloadBlob } from "@/utils/imageTools";

export function ResizeClient() {
  const [file, setFile] = useState<File | null>(null);
  const [origDims, setOrigDims] = useState<{ width: number; height: number } | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lockAspect, setLockAspect] = useState(true);
  const [mode, setMode] = useState<"pixels" | "percent">("pixels");
  const [percent, setPercent] = useState("50");
  const [result, setResult] = useState<{ blob: Blob; url: string; width: number; height: number } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) return;
    getImageDimensions(file).then((dims) => {
      setOrigDims(dims);
      setWidth(String(dims.width));
      setHeight(String(dims.height));
      setResult(null);
    });
  }, [file]);

  const handleResize = async () => {
    if (!file || !origDims) return;
    setLoading(true);
    try {
      let w = 0, h = 0;
      if (mode === "percent") {
        const p = parseFloat(percent) / 100;
        w = Math.round(origDims.width * p);
        h = Math.round(origDims.height * p);
      } else {
        w = parseInt(width) || 0;
        h = parseInt(height) || 0;
      }
      const r = await resizeImage(file, w, h, lockAspect && mode === "pixels");
      setResult(r);
    } finally {
      setLoading(false);
    }
  };

  // Aspect-locked width change
  const handleWidthChange = (v: string) => {
    setWidth(v);
    if (lockAspect && origDims && v) {
      const ratio = origDims.height / origDims.width;
      setHeight(String(Math.round(parseInt(v) * ratio)));
    }
  };

  const handleHeightChange = (v: string) => {
    setHeight(v);
    if (lockAspect && origDims && v) {
      const ratio = origDims.width / origDims.height;
      setWidth(String(Math.round(parseInt(v) * ratio)));
    }
  };

  return (
    <div className="space-y-5">
      {!file ? (
        <ImageDropzone onFile={(f) => { setFile(f); setResult(null); }} />
      ) : (
        <>
          {origDims && (
            <div className="card p-4 text-xs flex gap-4" style={{ color: "var(--text-muted)" }}>
              <span>📐 Original: <strong style={{ color: "var(--text)" }}>{origDims.width} × {origDims.height}px</strong></span>
              <span>📦 Size: <strong style={{ color: "var(--text)" }}>{formatBytes(file.size)}</strong></span>
            </div>
          )}

          <div className="card p-5 space-y-4">
            {/* Mode toggle */}
            <div className="flex gap-2 p-1 rounded-xl" style={{ background: "var(--bg-subtle)" }}>
              {(["pixels", "percent"] as const).map((m) => (
                <button key={m} onClick={() => setMode(m)}
                  className="flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all"
                  style={{
                    fontFamily: "var(--font-display)",
                    background: mode === m ? "var(--bg-card)" : "transparent",
                    color: mode === m ? "var(--accent)" : "var(--text-muted)",
                  }}>
                  {m}
                </button>
              ))}
            </div>

            {mode === "pixels" ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Width (px)</label>
                    <input type="number" className="input-base" value={width}
                      onChange={(e) => handleWidthChange(e.target.value)} min="1" />
                  </div>
                  <div>
                    <label className="label">Height (px)</label>
                    <input type="number" className="input-base" value={height}
                      onChange={(e) => handleHeightChange(e.target.value)} min="1" />
                  </div>
                </div>

                <button
                  onClick={() => setLockAspect((l) => !l)}
                  className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-colors"
                  style={{
                    background: lockAspect ? "var(--accent-light)" : "var(--bg-subtle)",
                    color: lockAspect ? "var(--accent)" : "var(--text-muted)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {lockAspect ? "🔒" : "🔓"} {lockAspect ? "Aspect ratio locked" : "Aspect ratio unlocked"}
                </button>
              </>
            ) : (
              <div>
                <div className="flex justify-between mb-2">
                  <label className="label mb-0">Scale</label>
                  <span className="text-xs font-mono font-bold" style={{ color: "var(--accent)" }}>
                    {percent}% {origDims ? `→ ${Math.round(origDims.width * parseFloat(percent) / 100)} × ${Math.round(origDims.height * parseFloat(percent) / 100)}px` : ""}
                  </span>
                </div>
                <input type="range" className="w-full mb-2" min="1" max="200" step="1"
                  value={percent} onChange={(e) => setPercent(e.target.value)} />
                <div className="flex gap-2">
                  {[25, 50, 75, 100, 150, 200].map((p) => (
                    <button key={p} onClick={() => setPercent(String(p))}
                      className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      style={{
                        background: percent === String(p) ? "var(--accent)" : "var(--bg-subtle)",
                        color: percent === String(p) ? "white" : "var(--text-muted)",
                        fontFamily: "var(--font-display)",
                      }}>
                      {p}%
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleResize}
                disabled={loading}
                className="flex-1 py-3 rounded-xl text-sm font-bold transition-colors disabled:opacity-50"
                style={{ background: "var(--accent)", color: "white", fontFamily: "var(--font-display)" }}
              >
                {loading ? "Resizing…" : "↔ Resize Image"}
              </button>
              <button onClick={() => { setFile(null); setResult(null); setOrigDims(null); }}
                className="py-3 px-4 rounded-xl text-sm"
                style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}>
                ✕
              </button>
            </div>
          </div>

          {result && (
            <div className="result-box p-5 animate-slide-up space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-lg" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                    {result.width} × {result.height}px
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {formatBytes(result.blob.size)}
                  </div>
                </div>
                <button
                  onClick={() => downloadBlob(result.blob, `resized_${file.name}`)}
                  className="py-2.5 px-5 rounded-xl text-sm font-bold"
                  style={{ background: "var(--accent)", color: "white", fontFamily: "var(--font-display)" }}
                >
                  ⬇ Download
                </button>
              </div>
              <img src={result.url} alt="Resized preview" className="w-full rounded-xl object-contain max-h-56" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
