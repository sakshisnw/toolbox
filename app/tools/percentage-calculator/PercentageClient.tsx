"use client";
import { useState } from "react";

type Mode = "whatPercent" | "percentOf" | "change";

const modes: { key: Mode; label: string; desc: string }[] = [
  { key: "whatPercent", label: "X is ?% of Y", desc: "Find what percentage one number is of another" },
  { key: "percentOf", label: "X% of Y", desc: "Calculate a percentage of a number" },
  { key: "change", label: "% Change", desc: "Calculate percentage increase or decrease" },
];

const inputLabels: Record<Mode, [string, string]> = {
  whatPercent: ["Part (X)", "Total (Y)"],
  percentOf: ["Percent (X%)", "Value (Y)"],
  change: ["From value", "To value"],
};

const refs: [string, string][] = [
  ["10% of 200", "20"],
  ["25% of 80", "20"],
  ["15 is ?% of 60", "25%"],
  ["50 → 75", "+50%"],
];

function fmt(n: number) {
  return parseFloat(n.toFixed(4)).toLocaleString(undefined, { maximumFractionDigits: 4 });
}

export function PercentageClient() {
  const [mode, setMode] = useState<Mode>("whatPercent");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const av = parseFloat(a);
  const bv = parseFloat(b);

  let display: string | null = null;
  let sub = "";
  let changeValue: number | null = null;

  if (!isNaN(av) && !isNaN(bv)) {
    if (mode === "whatPercent" && bv !== 0) {
      const val = (av / bv) * 100;
      display = fmt(val) + "%";
      sub = `${av} is ${fmt(val)}% of ${bv}`;
    } else if (mode === "percentOf") {
      const val = (av / 100) * bv;
      display = fmt(val);
      sub = `${av}% of ${bv} = ${fmt(val)}`;
    } else if (mode === "change" && av !== 0) {
      const val = ((bv - av) / Math.abs(av)) * 100;
      changeValue = val;
      display = (val > 0 ? "+" : "") + fmt(val) + "%";
      sub = `${av} → ${bv} is ${display} change`;
    }
  }

  const handleModeChange = (m: Mode) => {
    setMode(m);
    setA("");
    setB("");
  };

  return (
    <div className="space-y-4">

      {/* Segmented mode selector */}
      <div className="card p-1.5 flex gap-1">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => handleModeChange(m.key)}
            className="flex-1 px-3 py-2.5 rounded-lg text-sm transition-all"
            style={{
              background: mode === m.key ? "var(--accent)" : "transparent",
              color: mode === m.key ? "white" : "var(--text-muted)",
              fontFamily: "var(--font-display)",
              fontWeight: mode === m.key ? 600 : 400,
              lineHeight: 1.3,
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="card p-4 space-y-4">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {modes.find((m) => m.key === mode)?.desc}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(["a", "b"] as const).map((field, i) => (
            <div key={field}>
              <label className="label">{inputLabels[mode][i]}</label>
              <input
                type="number"
                inputMode="decimal"
                className="input-base"
                placeholder="0"
                value={field === "a" ? a : b}
                onChange={(e) =>
                  field === "a" ? setA(e.target.value) : setB(e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Result */}
      {display !== null && (
        <div className="result-box p-5 animate-slide-up">
          <div className="stat-value mb-1">{display}</div>
          <div className="stat-label text-sm">{sub}</div>
          {mode === "change" && changeValue !== null && (
            <div
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{
                background:
                  changeValue > 0
                    ? "color-mix(in srgb, #10b981 15%, transparent)"
                    : "color-mix(in srgb, #ef4444 15%, transparent)",
                color: changeValue > 0 ? "#10b981" : "#ef4444",
                fontFamily: "var(--font-display)",
              }}
            >
              {changeValue > 0 ? "▲ Increase" : "▼ Decrease"}
            </div>
          )}
        </div>
      )}

      {/* Quick reference */}
      <div className="card p-4">
        <h3
          className="text-xs font-bold mb-3 uppercase tracking-wider"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-display)" }}
        >
          Quick Reference
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {refs.map(([q, ans]) => (
            <div
              key={q}
              className="px-3 py-2 rounded-lg"
              style={{ background: "var(--bg-subtle)" }}
            >
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{q}</div>
              <div
                className="font-mono font-bold text-sm mt-0.5"
                style={{ color: "var(--accent)" }}
              >
                {ans}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}