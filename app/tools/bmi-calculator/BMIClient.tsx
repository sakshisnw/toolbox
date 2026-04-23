"use client";
import { useState, useRef, useEffect } from "react";
import { calcBMI, type BMICategory } from "@/utils/calculators";

type Gender = "male" | "female" | "other";
type HeightUnit = "cm" | "ft";
type WeightUnit = "kg" | "lbs";

const categoryColor: Record<BMICategory, string> = {
  Underweight: "#3b82f6",
  "Normal weight": "#10b981",
  Overweight: "#f59e0b",
  Obese: "#ef4444",
};

function drawGauge(canvas: HTMLCanvasElement, bmi: number | null) {
  const ctx = canvas.getContext("2d")!;
  const cx = 95, cy = 100, r = 76, lw = 18;

  const segs = [
    { color: "#3b82f6", from: Math.PI, to: Math.PI + Math.PI * (8.5 / 30) },
    { color: "#10b981", from: Math.PI + Math.PI * (8.5 / 30), to: Math.PI + Math.PI * (16.5 / 30) },
    { color: "#f59e0b", from: Math.PI + Math.PI * (16.5 / 30), to: Math.PI + Math.PI * (21.5 / 30) },
    { color: "#ef4444", from: Math.PI + Math.PI * (21.5 / 30), to: 2 * Math.PI },
  ];

  const targetAngle = bmi
    ? Math.PI + Math.min(Math.max((bmi - 10) / 30, 0), 1) * Math.PI
    : Math.PI + 0.5 * Math.PI;

  function drawFrame(angle: number) {
    ctx.clearRect(0, 0, 190, 106);
    segs.forEach(({ color, from, to }) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, from, to);
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.lineCap = "butt";
      ctx.stroke();
    });

    const needleLen = r - lw - 4;
    const tipX = cx + Math.cos(angle) * needleLen;
    const tipY = cy + Math.sin(angle) * needleLen;
    const baseWidth = 5;
    const perpAngle = angle + Math.PI / 2;
    const b1x = cx + Math.cos(perpAngle) * baseWidth;
    const b1y = cy + Math.sin(perpAngle) * baseWidth;
    const b2x = cx - Math.cos(perpAngle) * baseWidth;
    const b2y = cy - Math.sin(perpAngle) * baseWidth;

    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(b1x, b1y);
    ctx.lineTo(b2x, b2y);
    ctx.closePath();
    ctx.fillStyle = "#94a3b8";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, 2 * Math.PI);
    ctx.fillStyle = "#64748b";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "#e2e8f0";
    ctx.fill();
  }

  if (!bmi) { drawFrame(targetAngle); return; }

  const startAngle = Math.PI;
  const duration = 900;
  const startTime = performance.now();
  function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }

  function frame(now: number) {
    const t = Math.min((now - startTime) / duration, 1);
    drawFrame(startAngle + easeOut(t) * (targetAngle - startAngle));
    if (t < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

export function BMIClient() {
  const [gender, setGender] = useState<Gender>("male");
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [height, setHeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inchesVal, setInchesVal] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calcBMI> | null>(null);
  const [healthyRange, setHealthyRange] = useState("");
  const [action, setAction] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) drawGauge(canvasRef.current, null);
  }, []);

  const calculate = () => {
    let wKg = parseFloat(weight);
    if (weightUnit === "lbs") wKg *= 0.453592;
    let hCm = heightUnit === "cm"
      ? parseFloat(height)
      : (parseFloat(feet || "0") * 12 + parseFloat(inchesVal || "0")) * 2.54;
    if (!wKg || !hCm || wKg <= 0 || hCm <= 0) return;
    const res = calcBMI(wKg, hCm);
    setResult(res);
    const hM = hCm / 100;
    let minW = Math.round(18.5 * hM * hM * 10) / 10;
    let maxW = Math.round(24.9 * hM * hM * 10) / 10;
    if (weightUnit === "lbs") {
      minW = Math.round(minW * 2.20462 * 10) / 10;
      maxW = Math.round(maxW * 2.20462 * 10) / 10;
    }
    setHealthyRange(`${minW} – ${maxW} ${weightUnit === "lbs" ? "lbs" : "Kg"}`);
    const diff = (n: number) =>
      Math.round(Math.abs(weightUnit === "lbs" ? n * 2.20462 : n) * 10) / 10;
    if (res.bmi < 18.5) setAction(`Gain ${diff(18.5 * hM * hM - wKg)} ${weightUnit}`);
    else if (res.bmi < 25) setAction("Maintain weight");
    else setAction(`Lose ${diff(wKg - 24.9 * hM * hM)} ${weightUnit}`);
    if (canvasRef.current) drawGauge(canvasRef.current, res.bmi);
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    padding: "9px 12px",
    fontSize: 13,
    color: "var(--text)",
    minWidth: 0,
  };

  const fieldRow: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    border: "0.5px solid var(--border)",
    borderRadius: 8,
    background: "var(--bg-card)",
    overflow: "hidden",
  };

  const selectStyle: React.CSSProperties = {
    border: "none",
    outline: "none",
    background: "transparent",
    padding: "9px 8px 9px 0",
    fontSize: 12,
    color: "#378ADD",
    cursor: "pointer",
    flexShrink: 0,
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "clamp(220px, 35%, 260px) 1fr",
        border: "0.5px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
      }}
      className="bmi-grid"
    >
      {/* Responsive style injection */}
      <style>{`
        @media (max-width: 600px) {
          .bmi-grid {
            grid-template-columns: 1fr !important;
          }
          .bmi-left {
            border-right: none !important;
            border-bottom: 0.5px solid var(--border);
          }
        }
      `}</style>

      {/* Left — inputs */}
      <div
        className="bmi-left"
        style={{
          padding: 20,
          borderRight: "0.5px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Gender */}
        <div>
          <p className="label">Gender</p>
          <div style={{ display: "flex", gap: 6, marginTop: 5 }}>
            {(["male", "female", "other"] as Gender[]).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className="text-xs capitalize flex-1 py-1.5 rounded-lg transition-all"
                style={{
                  border: "0.5px solid var(--border)",
                  background: gender === g ? "#E6F1FB" : "var(--bg-card)",
                  color: gender === g ? "#0C447C" : "var(--text-muted)",
                  fontWeight: gender === g ? 500 : 400,
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Height */}
        <div>
          <p className="label">Height</p>
          {heightUnit === "cm" ? (
            <div style={{ ...fieldRow, marginTop: 5 }}>
              <input
                type="number"
                style={inputStyle}
                placeholder="175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <select
                value={heightUnit}
                onChange={(e) => setHeightUnit(e.target.value as HeightUnit)}
                style={selectStyle}
              >
                <option value="cm">cm</option>
                <option value="ft">ft / in</option>
              </select>
            </div>
          ) : (
            <div style={{ marginTop: 5, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={fieldRow}>
                <input
                  type="number"
                  style={{ ...inputStyle, flex: "none", width: "42%" }}
                  placeholder="5 ft"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                />
                <span style={{ fontSize: 12, color: "var(--text-muted)", paddingRight: 4 }}>ft</span>
                <input
                  type="number"
                  style={{ ...inputStyle, flex: "none", width: "32%" }}
                  placeholder="9 in"
                  value={inchesVal}
                  onChange={(e) => setInchesVal(e.target.value)}
                />
                <span style={{ fontSize: 12, color: "var(--text-muted)", paddingRight: 4 }}>in</span>
                <select
                  value={heightUnit}
                  onChange={(e) => setHeightUnit(e.target.value as HeightUnit)}
                  style={selectStyle}
                >
                  <option value="cm">cm</option>
                  <option value="ft">ft / in</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Age */}
        <div>
          <p className="label">Age</p>
          <div style={{ ...fieldRow, marginTop: 5 }}>
            <input
              type="number"
              style={inputStyle}
              placeholder="25"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <span style={{ fontSize: 12, color: "var(--text-muted)", paddingRight: 12 }}>yrs</span>
          </div>
        </div>

        {/* Weight */}
        <div>
          <p className="label">Weight</p>
          <div style={{ ...fieldRow, marginTop: 5 }}>
            <input
              type="number"
              style={inputStyle}
              placeholder="70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value as WeightUnit)}
              style={selectStyle}
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-colors mt-1"
          style={{ background: "#378ADD", border: "none" }}
        >
          Calculate BMI
        </button>
      </div>

      {/* Right — result */}
      <div
        style={{
          padding: 24,
          background: "var(--bg-subtle)",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          alignItems: "stretch",
        }}
      >
        <p
          className="text-lg font-semibold"
          style={{ fontFamily: "var(--font-display)", textAlign: "center", margin: 0 }}
        >
          BMI Result
        </p>

        {/* Gauge + BMI value — centered */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <canvas ref={canvasRef} width={190} height={106} />
          <div
            style={{
              background: "var(--bg-card)",
              border: "0.5px solid var(--border)",
              borderRadius: 12,
              padding: "12px 20px",
              textAlign: "center",
              minWidth: 100,
            }}
          >
            <p className="text-xs" style={{ color: "var(--text-muted)", marginBottom: 4 }}>
              Your BMI
            </p>
            <p
              className="text-3xl font-medium"
              style={{ color: result ? categoryColor[result.category] : "var(--text)" }}
            >
              {result ? result.bmi : "--"}
            </p>
          </div>
        </div>

        {/* Legend — centered */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            ["#3b82f6", "Underweight"],
            ["#10b981", "Normal"],
            ["#f59e0b", "Overweight"],
            ["#ef4444", "Obese"],
          ].map(([c, l]) => (
            <div
              key={l}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: "var(--text-muted)",
              }}
            >
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: c,
                  flexShrink: 0,
                }}
              />
              {l}
            </div>
          ))}
        </div>

        {/* Info grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            border: "0.5px solid var(--border)",
            borderRadius: 8,
            overflow: "hidden",
            background: "var(--bg-card)",
          }}
        >
          {[
            { label: "Healthy BMI range", value: "18.5 – 24.9", color: "#378ADD" },
            { label: "Healthy weight for height", value: healthyRange || "-- Kg", color: "#378ADD" },
            {
              label: "Category",
              value: result?.category || "--",
              color: result ? categoryColor[result.category] : "#378ADD",
            },
            { label: "Action", value: action || "--", color: "#ef4444" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "11px 14px",
                borderRight: i % 2 === 0 ? "0.5px solid var(--border)" : "none",
                borderBottom: i < 2 ? "0.5px solid var(--border)" : "none",
              }}
            >
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 3 }}>
                {item.label}
              </p>
              <p style={{ fontSize: 13, fontWeight: 500, color: item.color, margin: 0 }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}