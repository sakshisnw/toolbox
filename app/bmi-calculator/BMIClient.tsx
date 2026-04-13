"use client";
import { useState } from "react";
import { calcBMI, type BMICategory } from "@/utils/calculators";

const categoryColor: Record<BMICategory, string> = {
  Underweight: "#3b82f6",
  "Normal weight": "#10b981",
  Overweight: "#f59e0b",
  Obese: "#ef4444",
};

export function BMIClient() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  const weightKg = unit === "metric"
    ? parseFloat(weight)
    : parseFloat(weight) * 0.453592;
  const heightCm = unit === "metric"
    ? parseFloat(height)
    : (parseFloat(feet || "0") * 12 + parseFloat(inches || "0")) * 2.54;

  const valid = weightKg > 0 && heightCm > 0;
  const result = valid ? calcBMI(weightKg, heightCm) : null;

  // BMI scale segments
  const bmiRanges = [
    { label: "Underweight", max: 18.5, color: "#3b82f6" },
    { label: "Normal", max: 25, color: "#10b981" },
    { label: "Overweight", max: 30, color: "#f59e0b" },
    { label: "Obese", max: 40, color: "#ef4444" },
  ];

  const bmiPct = result ? Math.min(((result.bmi - 10) / 30) * 100, 100) : 0;

  return (
    <div className="space-y-5">
      {/* Unit toggle */}
      <div className="card p-5">
        <div className="flex gap-2 mb-5 p-1 rounded-xl" style={{ background: "var(--bg-subtle)" }}>
          {(["metric", "imperial"] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className="flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize"
              style={{
                fontFamily: "var(--font-display)",
                background: unit === u ? "var(--bg-card)" : "transparent",
                color: unit === u ? "var(--accent)" : "var(--text-muted)",
                boxShadow: unit === u ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              }}
            >
              {u}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Weight ({unit === "metric" ? "kg" : "lbs"})</label>
            <input
              type="number"
              className="input-base"
              placeholder={unit === "metric" ? "70" : "154"}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="1"
            />
          </div>

          {unit === "metric" ? (
            <div>
              <label className="label">Height (cm)</label>
              <input
                type="number"
                className="input-base"
                placeholder="175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="1"
              />
            </div>
          ) : (
            <div>
              <label className="label">Height</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="input-base"
                  placeholder="5 ft"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                />
                <input
                  type="number"
                  className="input-base"
                  placeholder="9 in"
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="result-box p-6 animate-slide-up">
          <div className="flex items-end gap-4 mb-6">
            <div>
              <div className="stat-value">{result.bmi}</div>
              <div className="stat-label">Your BMI</div>
            </div>
            <div
              className="ml-auto px-4 py-2 rounded-xl text-sm font-bold"
              style={{
                background: `color-mix(in srgb, ${categoryColor[result.category]} 15%, transparent)`,
                color: categoryColor[result.category],
                fontFamily: "var(--font-display)",
              }}
            >
              {result.category}
            </div>
          </div>

          {/* Scale */}
          <div className="mb-4">
            <div className="flex rounded-full overflow-hidden h-3 mb-2">
              {bmiRanges.map((r) => (
                <div key={r.label} className="flex-1" style={{ background: r.color, opacity: 0.25 }} />
              ))}
            </div>
            <div
              className="relative"
              style={{ marginTop: -8 }}
            >
              <div
                className="absolute w-4 h-4 rounded-full border-2 border-white -translate-y-1/2 -translate-x-1/2"
                style={{
                  left: `${bmiPct}%`,
                  background: categoryColor[result.category],
                  boxShadow: `0 0 0 3px ${categoryColor[result.category]}44`,
                  top: "50%",
                }}
              />
            </div>
            <div className="flex justify-between text-xs mt-3" style={{ color: "var(--text-muted)" }}>
              <span>10</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
          </div>

          <p className="text-sm" style={{ color: "var(--text-muted)" }}>{result.description}</p>

          {/* Category table */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            {bmiRanges.map((r) => (
              <div
                key={r.label}
                className="p-2 rounded-lg text-center text-xs"
                style={{
                  background: `color-mix(in srgb, ${r.color} 10%, transparent)`,
                  color: r.color,
                  fontWeight: result.category.includes(r.label.split(" ")[0]) ? 700 : 400,
                  fontFamily: "var(--font-display)",
                }}
              >
                {r.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="card p-5 text-sm" style={{ color: "var(--text-muted)" }}>
        <h3 className="font-bold text-base mb-3" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          About BMI
        </h3>
        <p>
          BMI (Body Mass Index) is a measure of body fat based on weight and height. While useful as
          a screening tool, BMI does not account for muscle mass, bone density, or fat distribution.
          Always consult a healthcare professional for medical advice.
        </p>
      </div>
    </div>
  );
}
