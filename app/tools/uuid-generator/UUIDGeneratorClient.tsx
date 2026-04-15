"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

function generateUUID(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  
  // Set version (4) and variant bits
  array[6] = (array[6] & 0x0f) | 0x40;
  array[8] = (array[8] & 0x3f) | 0x80;
  
  const hex = Array.from(array, b => b.toString(16).padStart(2, "0"));
  
  return `${hex[0]}${hex[1]}${hex[2]}${hex[3]}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`;
}

export function UUIDGeneratorClient() {
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => {
      let uuid = generateUUID();
      if (!hyphens) {
        uuid = uuid.replace(/-/g, "");
      }
      if (uppercase) {
        uuid = uuid.toUpperCase();
      }
      return uuid;
    });
    setUuids(newUuids);
  };

  const regenerateSingle = (index: number) => {
    const newUuids = [...uuids];
    let uuid = generateUUID();
    if (!hyphens) uuid = uuid.replace(/-/g, "");
    if (uppercase) uuid = uuid.toUpperCase();
    newUuids[index] = uuid;
    setUuids(newUuids);
  };

  const copyAll = () => uuids.join("\n");

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h3 className="font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>Options</h3>
        
        {/* Count */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm" style={{ color: "var(--text-muted)" }}>Number of UUIDs</label>
            <span className="font-bold" style={{ color: "var(--accent)" }}>{count}</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">UPPERCASE</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hyphens}
              onChange={(e) => setHyphens(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">Include hyphens</span>
          </label>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generate}
        className="w-full py-4 rounded-xl text-lg font-semibold transition-transform active:scale-[0.98]"
        style={{ background: "var(--accent)", color: "white", fontFamily: "var(--font-display)" }}
      >
        🎲 Generate UUIDs
      </button>

      {/* Results */}
      {uuids.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              Generated {uuids.length} UUID{uuids.length > 1 ? "s" : ""}
            </span>
            <CopyButton text={copyAll()} label={`Copy All (${uuids.length})`} />
          </div>

          <div className="space-y-2">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "var(--bg-subtle)" }}
              >
                <span className="text-xs w-6 text-center" style={{ color: "var(--text-muted)" }}>
                  {index + 1}
                </span>
                <code className="flex-1 font-mono text-sm break-all">{uuid}</code>
                <div className="flex gap-1">
                  <CopyButton text={uuid} label="" className="!p-2" />
                  <button
                    onClick={() => regenerateSingle(index)}
                    className="p-2 rounded-lg text-sm"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                    title="Regenerate"
                  >
                    🔄
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
