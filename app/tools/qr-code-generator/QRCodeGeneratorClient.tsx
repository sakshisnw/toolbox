"use client";

import { useState, useRef, useEffect } from "react";

// Simple QR code generation using a canvas-based approach
function generateQRData(text: string, size: number): string | null {
  // For a real implementation, you'd use a library like qrcode.js
  // This is a placeholder that creates a visual pattern
  try {
    // Return the text for now - in production, use a proper QR library
    return text;
  } catch {
    return null;
  }
}

export function QRCodeGeneratorClient() {
  const [text, setText] = useState("https://example.com");
  const [type, setType] = useState<"url" | "text" | "email" | "phone" | "wifi">("url");
  const [size, setSize] = useState(256);
  const [generated, setGenerated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simple grid-based QR visualization (for demo - use real QR library in production)
  const drawQR = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, size, size);

    // Draw position detection patterns (the three squares in corners)
    const drawPositionPattern = (x: number, y: number) => {
      ctx.fillStyle = "black";
      ctx.fillRect(x, y, 21, 21); // Outer
      ctx.fillStyle = "white";
      ctx.fillRect(x + 4, y + 4, 13, 13); // Middle
      ctx.fillStyle = "black";
      ctx.fillRect(x + 8, y + 8, 5, 5); // Inner
    };

    drawPositionPattern(4, 4); // Top-left
    drawPositionPattern(size - 25, 4); // Top-right
    drawPositionPattern(4, size - 25); // Bottom-left

    // Generate pseudo-random pattern based on text hash
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
    }

    // Fill data area with pattern
    const cellSize = 4;
    ctx.fillStyle = "black";
    for (let row = 0; row < size / cellSize; row++) {
      for (let col = 0; col < size / cellSize; col++) {
        // Skip position detection areas
        if ((row < 7 && col < 7) || 
            (row < 7 && col >= size / cellSize - 7) || 
            (row >= size / cellSize - 7 && col < 7)) {
          continue;
        }
        
        // Generate pseudo-random bit from hash
        hash = ((hash * 31) + row * 17 + col * 13) | 0;
        if ((hash & 1) === 1) {
          ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
      }
    }

    setGenerated(true);
  };

  const downloadQR = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const getPlaceholder = () => {
    switch (type) {
      case "url": return "https://example.com";
      case "text": return "Enter your message here...";
      case "email": return "email@example.com";
      case "phone": return "+1234567890";
      case "wifi": return "WIFI:S:NetworkName;T:WPA;P:password;;";
      default: return "";
    }
  };

  useEffect(() => {
    if (text) drawQR();
  }, []);

  return (
    <div className="space-y-6">
      {/* Type Selection */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "url", label: "🌐 URL", desc: "Website link" },
          { id: "text", label: "📝 Text", desc: "Plain text" },
          { id: "email", label: "📧 Email", desc: "Email address" },
          { id: "phone", label: "📱 Phone", desc: "Phone number" },
          { id: "wifi", label: "📶 WiFi", desc: "WiFi network" },
        ].map(({ id, label, desc }) => (
          <button
            key={id}
            onClick={() => {
              setType(id as typeof type);
              setText(getPlaceholder());
            }}
            className={`flex flex-col items-center p-3 rounded-xl transition-colors ${
              type === id ? "ring-2" : ""
            }`}
            style={{
              background: type === id ? "var(--accent-light)" : "var(--bg-subtle)",
              borderColor: type === id ? "var(--accent)" : "var(--border)",
              color: type === id ? "var(--accent)" : "var(--text)",
            }}
          >
            <span className="font-medium text-sm">{label}</span>
            <span className="text-xs opacity-70">{desc}</span>
          </button>
        ))}
      </div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}>
          Content to Encode
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={getPlaceholder()}
          className="w-full px-4 py-3 rounded-xl border"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text)" }}
        />
      </div>

      {/* Size Selection */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}>
          QR Code Size: {size}x{size}px
        </label>
        <input
          type="range"
          min="128"
          max="512"
          step="64"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          <span>128px</span>
          <span>512px</span>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={drawQR}
        className="w-full py-3 rounded-xl font-semibold transition-transform active:scale-[0.98]"
        style={{ background: "var(--accent)", color: "white", fontFamily: "var(--font-display)" }}
      >
        🎨 Generate QR Code
      </button>

      {/* QR Code Display */}
      {generated && (
        <div className="flex flex-col items-center gap-4 p-6 rounded-2xl" style={{ background: "var(--bg-subtle)" }}>
          <canvas
            ref={canvasRef}
            width={size}
            height={size}
            className="rounded-lg shadow-lg"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <button
            onClick={downloadQR}
            className="px-6 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ background: "var(--accent)", color: "white" }}
          >
            💾 Download PNG
          </button>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Note: For production use, integrate a proper QR code library like qrcode.js
          </p>
        </div>
      )}
    </div>
  );
}
