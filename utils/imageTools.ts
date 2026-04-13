"use client";

// ─── Compress ────────────────────────────────────────────────────────────────
export async function compressImage(
  file: File,
  quality: number // 0-1
): Promise<{ blob: Blob; url: string; originalSize: number; compressedSize: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Compression failed"));
          URL.revokeObjectURL(url);
          resolve({
            blob,
            url: URL.createObjectURL(blob),
            originalSize: file.size,
            compressedSize: blob.size,
          });
        },
        "image/jpeg",
        quality
      );
    };
    img.onerror = reject;
    img.src = url;
  });
}

// ─── Resize ──────────────────────────────────────────────────────────────────
export async function resizeImage(
  file: File,
  width: number,
  height: number,
  maintainAspect: boolean
): Promise<{ blob: Blob; url: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const src = URL.createObjectURL(file);
    img.onload = () => {
      let w = width;
      let h = height;
      if (maintainAspect) {
        const ratio = img.width / img.height;
        if (width && !height) h = Math.round(width / ratio);
        else if (height && !width) w = Math.round(height * ratio);
        else {
          const scaleW = width / img.width;
          const scaleH = height / img.height;
          const scale = Math.min(scaleW, scaleH);
          w = Math.round(img.width * scale);
          h = Math.round(img.height * scale);
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      const ext = file.type || "image/png";
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Resize failed"));
          URL.revokeObjectURL(src);
          resolve({ blob, url: URL.createObjectURL(blob), width: w, height: h });
        },
        ext,
        0.92
      );
    };
    img.onerror = reject;
    img.src = src;
  });
}

// ─── Convert ─────────────────────────────────────────────────────────────────
export type ImageFormat = "image/png" | "image/jpeg" | "image/webp";

export async function convertImage(
  file: File,
  toFormat: ImageFormat,
  quality = 0.92
): Promise<{ blob: Blob; url: string; ext: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      // Fill white background for JPEG
      if (toFormat === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const extMap: Record<ImageFormat, string> = {
        "image/png": "png",
        "image/jpeg": "jpg",
        "image/webp": "webp",
      };
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Conversion failed"));
          URL.revokeObjectURL(src);
          resolve({ blob, url: URL.createObjectURL(blob), ext: extMap[toFormat] });
        },
        toFormat,
        quality
      );
    };
    img.onerror = reject;
    img.src = src;
  });
}

// ─── Remove Background (edge-detect mock) ─────────────────────────────────────
export async function removeBackground(file: File): Promise<{ blob: Blob; url: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Sample background color from corners (average)
      const corners = [
        [0, 0],
        [img.width - 1, 0],
        [0, img.height - 1],
        [img.width - 1, img.height - 1],
      ];

      let bgR = 0, bgG = 0, bgB = 0;
      corners.forEach(([x, y]) => {
        const idx = (y * img.width + x) * 4;
        bgR += data[idx];
        bgG += data[idx + 1];
        bgB += data[idx + 2];
      });
      bgR = Math.round(bgR / 4);
      bgG = Math.round(bgG / 4);
      bgB = Math.round(bgB / 4);

      const threshold = 60;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
        if (dist < threshold) {
          data[i + 3] = 0; // make transparent
        }
      }

      ctx.putImageData(imageData, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Failed"));
          URL.revokeObjectURL(src);
          resolve({ blob, url: URL.createObjectURL(blob) });
        },
        "image/png"
      );
    };
    img.onerror = reject;
    img.src = src;
  });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function downloadBlob(blob: Blob, filename: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const src = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(src);
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = src;
  });
}
