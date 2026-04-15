"use client";
import { useState } from "react";
import { calcPercentOf, calcXPercentOfY, calcPercentChange } from "@/utils/calculators";

type Mode = "whatPercent" | "percentOf" | "change";

const modes: { key: Mode; label: string; desc: string }[] = [
  { key: "whatPercent", label: "X is what % of Y?", desc: "Find what percentage one number is of another" },
  { key: "percentOf", label: "X% of Y = ?", desc: "Calculate a percentage of a number" },
  { key: "change", label: "% Change", desc: "Calculate percentage increase or decrease" },
];

export function PercentageClient() {
  const [mode, setMode] = useState<Mode>("whatPercent");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const av = parseFloat(a);
  const bv = parseFloat(b);

  let result: number | null = null;
  let resultLabel = "";

  if (!isNaN(av) && !isNaN(bv)) {
    if (mode === "whatPercent") {
      result = calcPercentOf(av, bv);
      resultLabel = `${a} is ${result}% of ${b}`;
    } else if (mode === "percentOf") {
      result = calcXPercentOfY(av, bv);
      resultLabel = `${a}% of ${b} = ${result}`;
    } else {
      result = calcPercentChange(av, bv);
      resultLabel = result === null
        ? "Cannot divide by zero"
        : `${result > 0 ? "+" : ""}${result}% change from ${a} to ${b}`;
    }
  }

  const labels: Record<Mode, [string, string]> = {
    whatPercent: ["Part (X)", "Total (Y)"],
    percentOf: ["Percent (X%)", "Value (Y)"],
    change: ["From value", "To value"],
  };

  return (
    <div className="space-y-5">
      {/* Mode selector */}
      <div className="card p-2 flex flex-col sm:flex-row gap-2">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => { setMode(m.key); setA(""); setB(""); }}
            className="flex-1 text-left px-4 py-3 rounded-xl text-sm transition-all"
            style={{
              background: mode === m.key ? "var(--accent)" : "transparent",
              color: mode === m.key ? "white" : "var(--text-muted)",
              fontFamily: "var(--font-display)",
              fontWeight: mode === m.key ? 600 : 400,
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="card p-5 space-y-4">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {modes.find((m) => m.key === mode)?.desc}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">{labels[mode][0]}</label>
            <input
              type="number"
              className="input-base"
              placeholder="0"
              value={a}
              onChange={(e) => setA(e.target.value)}
            />
          </div>
          <div>
            <label className="label">{labels[mode][1]}</label>
            <input
              type="number"
              className="input-base"
              placeholder="0"
              value={b}
              onChange={(e) => setB(e.target.value)}
            />
          </div>
        </div>
      </div>

      {result !== null && (
        <div className="result-box p-6 animate-slide-up">
          <div className="stat-value mb-1">
            {mode === "change" && result > 0 ? "+" : ""}{result}
            {mode !== "percentOf" ? "%" : ""}
          </div>
          <div className="stat-label text-sm">{resultLabel}</div>

          {mode === "change" && result !== null && (
            <div
              className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{
                background: result > 0 ? "color-mix(in srgb, #10b981 15%, transparent)" : "color-mix(in srgb, #ef4444 15%, transparent)",
                color: result > 0 ? "#10b981" : "#ef4444",
                fontFamily: "var(--font-display)",
              }}
            >
              {result > 0 ? "▲ Increase" : "▼ Decrease"}
            </div>
          )}
        </div>
      )}

      {/* Quick reference */}
      <div className="card p-5">
        <h3 className="font-bold text-sm mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Quick Reference
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          {[
            ["10% of 200", "20"],
            ["25% of 80", "20"],
            ["15 is ?% of 60", "25%"],
            ["50→75 change", "+50%"],
          ].map(([q, a]) => (
            <div key={q} className="px-3 py-2 rounded-lg" style={{ background: "var(--bg-subtle)" }}>
              <div style={{ color: "var(--text-muted)" }}>{q}</div>
              <div className="font-mono font-bold text-sm mt-0.5" style={{ color: "var(--accent)" }}>{a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
