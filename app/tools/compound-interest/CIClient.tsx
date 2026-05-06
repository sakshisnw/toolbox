"use client";
import { useState, useMemo } from "react";
import { calcCompoundInterest, formatCurrency } from "@/utils/calculators";

const frequencies = [
  { label: "Annually", value: 1 },
  { label: "Quarterly", value: 4 },
  { label: "Monthly", value: 12 },
  { label: "Daily", value: 365 },
];

// ── Slider with label ────────────────────────────────────────────────────────
function SliderField({
  icon, label, value, display, min, max, step, onChange,
}: {
  icon: React.ReactNode; label: string; value: number; display: string;
  min: number; max: number; step: number; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {icon}
          <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{label}</span>
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#2563eb" }}>{display}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          width: "100%", height: 4, appearance: "none", WebkitAppearance: "none",
          borderRadius: 4, outline: "none", cursor: "pointer",
          background: `linear-gradient(to right, #2563eb ${pct}%, #e5e7eb ${pct}%)`,
          marginBottom: 4,
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
        <span>{min.toLocaleString("en-IN")}{label.includes("Rate") ? "%" : label.includes("Time") ? " yr" : ""}</span>
        <span>{max.toLocaleString("en-IN")}{label.includes("Rate") ? "%" : label.includes("Time") ? " yrs" : ""}</span>
      </div>
    </div>
  );
}

// ── Simple SVG line-area chart ───────────────────────────────────────────────
function AreaChart({ data, principal }: { data: { year: number; amount: number; interest: number }[]; principal: number }) {
  const W = 860, H = 220, PL = 72, PR = 16, PT = 16, PB = 36;
  const cW = W - PL - PR, cH = H - PT - PB;

  const maxVal = Math.max(...data.map(d => d.amount));
  const minVal = 0;
  const range = maxVal - minVal || 1;

  const toX = (i: number) => PL + (i / (data.length - 1)) * cW;
  const toY = (v: number) => PT + cH - ((v - minVal) / range) * cH;

  // Y-axis ticks
  const tickCount = 5;
  const tickStep = Math.ceil(maxVal / tickCount / 10000) * 10000;
  const yTicks = Array.from({ length: tickCount + 1 }, (_, i) => i * tickStep).filter(v => v <= maxVal + tickStep);

  // Principal line (flat)
  const pY = toY(principal);

  // Interest area path (full amount)
  const amtPoints = data.map((d, i) => `${toX(i)},${toY(d.amount)}`).join(" L ");
  const amtArea = `M ${toX(0)},${toY(data[0].amount)} L ${amtPoints} L ${toX(data.length - 1)},${PT + cH} L ${toX(0)},${PT + cH} Z`;
  const amtLine = `M ${toX(0)},${toY(data[0].amount)} L ${amtPoints}`;

  // Principal area path (flat)
  const pArea = `M ${toX(0)},${pY} L ${toX(data.length - 1)},${pY} L ${toX(data.length - 1)},${PT + cH} L ${toX(0)},${PT + cH} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="amtGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e40af" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#1e40af" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {yTicks.map(tick => {
        const y = toY(tick);
        if (y < PT || y > PT + cH + 1) return null;
        return (
          <g key={tick}>
            <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#e5e7eb" strokeWidth="1" />
            <text x={PL - 6} y={y + 4} textAnchor="end" fontSize="10" fill="#9ca3af">
              {tick >= 1000 ? (tick / 1000).toFixed(0) + "k" : tick}
            </text>
          </g>
        );
      })}

      {/* Total amount area (interest portion shown above principal) */}
      <path d={amtArea} fill="url(#amtGrad)" />
      {/* Principal area */}
      <path d={pArea} fill="url(#pGrad)" />

      {/* Amount line */}
      <path d={amtLine} fill="none" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />
      {/* Principal flat line */}
      <line x1={toX(0)} y1={pY} x2={toX(data.length - 1)} y2={pY} stroke="#1e40af" strokeWidth="1.5" strokeDasharray="4 2" />

      {/* X-axis labels */}
      {data.map((d, i) => (
        <text key={d.year} x={toX(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="#9ca3af">
          Year {d.year}
        </text>
      ))}

      {/* Bottom axis line */}
      <line x1={PL} y1={PT + cH} x2={W - PR} y2={PT + cH} stroke="#e5e7eb" strokeWidth="1" />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function CIClient() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [freq, setFreq] = useState(12);

  const result = useMemo(
    () => calcCompoundInterest(principal, rate, years, freq),
    [principal, rate, years, freq]
  );

  const growthPct = ((result.finalAmount / principal - 1) * 100).toFixed(1);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", display: "flex", flexDirection: "column", gap: 16 }}>

      {/* ── Input Card ── */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 24px" }}>

        {/* Principal — full width */}
        <div style={{ marginBottom: 20 }}>
          <SliderField
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
            label="Principal Amount"
            value={principal}
            display={`₹${principal.toLocaleString("en-IN")}`}
            min={10000} max={10000000} step={1000}
            onChange={setPrincipal}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9ca3af", marginTop: -2 }}>
            <span>₹10,000</span><span>₹1,00,00,000</span>
          </div>
        </div>

        {/* Rate + Time Period side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Annual Interest Rate</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#2563eb" }}>{rate}%</span>
            </div>
            <input type="range" min={1} max={30} step={0.5} value={rate}
              onChange={e => setRate(Number(e.target.value))}
              style={{ width: "100%", height: 4, appearance: "none", WebkitAppearance: "none", borderRadius: 4, outline: "none", cursor: "pointer", background: `linear-gradient(to right,#2563eb ${((rate-1)/29)*100}%,#e5e7eb ${((rate-1)/29)*100}%)`, marginBottom: 4 }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9ca3af" }}><span>1%</span><span>30%</span></div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Time Period</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#2563eb" }}>{years} yrs</span>
            </div>
            <input type="range" min={1} max={30} step={1} value={years}
              onChange={e => setYears(Number(e.target.value))}
              style={{ width: "100%", height: 4, appearance: "none", WebkitAppearance: "none", borderRadius: 4, outline: "none", cursor: "pointer", background: `linear-gradient(to right,#2563eb ${((years-1)/29)*100}%,#e5e7eb ${((years-1)/29)*100}%)`, marginBottom: 4 }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9ca3af" }}><span>1 yr</span><span>30 yrs</span></div>
          </div>
        </div>

        {/* Compounding Frequency */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 }}>Compounding Frequency</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
            {frequencies.map(f => (
              <button
                key={f.value}
                onClick={() => setFreq(f.value)}
                style={{
                  padding: "10px 0",
                  border: freq === f.value ? "2px solid #2563eb" : "1px solid #e5e7eb",
                  borderRadius: 8,
                  background: freq === f.value ? "#2563eb" : "#fff",
                  color: freq === f.value ? "#fff" : "#374151",
                  fontSize: 13.5, fontWeight: 500, cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3 Result Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {/* Principal */}
        <div style={{ background: "#2563eb", borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Principal</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>{formatCurrency(principal)}</div>
        </div>
        {/* Total Interest */}
        <div style={{ background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Total Interest</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>{formatCurrency(result.totalInterest)}</div>
        </div>
        {/* Final Amount */}
        <div style={{ background: "#1e3a5f", borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Final Amount</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>{formatCurrency(result.finalAmount)}</div>
        </div>
      </div>

      {/* ── Growth Banner ── */}
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "12px 20px", textAlign: "center" }}>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: "#2563eb" }}>
          ↗ {growthPct}% growth over {years} years
        </span>
      </div>

      {/* ── Year-by-Year Growth Chart ── */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 24px" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 16 }}>Year-by-Year Growth</div>
        <AreaChart data={result.yearlyBreakdown} principal={principal} />
        {/* Legend */}
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 12 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6b7280" }}>
            <svg width="16" height="8"><line x1="0" y1="4" x2="16" y2="4" stroke="#1e40af" strokeWidth="2" strokeDasharray="4 2"/></svg>
            Principal
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6b7280" }}>
            <svg width="16" height="8"><line x1="0" y1="4" x2="16" y2="4" stroke="#2563eb" strokeWidth="2"/></svg>
            Interest
          </span>
        </div>
      </div>

      {/* ── Yearly Breakdown Table ── */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "18px 24px", borderBottom: "1px solid #e5e7eb" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>Yearly Breakdown</span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
              {["Year", "Amount", "Interest Earned", "Growth"].map(h => (
                <th key={h} style={{ padding: "12px 24px", textAlign: "left", fontSize: 13, fontWeight: 600, color: "#6b7280" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.yearlyBreakdown.map((row, i) => (
              <tr key={row.year} style={{ borderBottom: "1px solid #f3f4f6", background: "#fff" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f9fafb")}
                onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
              >
                <td style={{ padding: "13px 24px", fontSize: 13.5, color: "#374151", fontWeight: 500 }}>{row.year}</td>
                <td style={{ padding: "13px 24px", fontSize: 13.5, color: "#2563eb", fontWeight: 600 }}>
                  {formatCurrency(row.amount)}
                </td>
                <td style={{ padding: "13px 24px", fontSize: 13.5, color: "#2563eb" }}>
                  {formatCurrency(row.interest)}
                </td>
                <td style={{ padding: "13px 24px" }}>
                  <span style={{
                    display: "inline-block",
                    padding: "2px 10px",
                    borderRadius: 20,
                    background: "#f3f4f6",
                    color: "#374151",
                    fontSize: 12.5,
                    fontWeight: 600,
                  }}>
                    {((row.amount / principal - 1) * 100).toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Slider thumb styling */}
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: #2563eb;
          border: 2px solid #fff;
          box-shadow: 0 0 0 1px #2563eb;
          cursor: pointer;
        }
        input[type=range]::-moz-range-thumb {
          width: 16px; height: 16px;
          border-radius: 50%;
          background: #2563eb;
          border: 2px solid #fff;
          box-shadow: 0 0 0 1px #2563eb;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
