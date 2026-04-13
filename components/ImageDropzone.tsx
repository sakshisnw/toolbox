"use client";
import { useRef, useState } from "react";

interface Props {
  onFile: (file: File) => void;
  accept?: string;
  label?: string;
}

export function ImageDropzone({ onFile, accept = "image/*", label = "Drop image here or click to upload" }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div
      className="relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200"
      style={{
        borderColor: dragOver ? "var(--accent)" : "var(--border)",
        background: dragOver ? "var(--accent-light)" : "var(--bg-subtle)",
      }}
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }}
      />
      <div className="text-4xl mb-3">{dragOver ? "📂" : "🖼️"}</div>
      <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{label}</p>
      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
        PNG, JPG, WebP supported
      </p>
    </div>
  );
}
