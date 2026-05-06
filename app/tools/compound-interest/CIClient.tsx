"use client";
import { useState, useMemo } from "react";
import { calcCompoundInterest, formatCurrency } from "@/utils/calculators";

const frequencies = [
  { label: "Annually", value: 1 },
  { label: "Quarterly", value: 4 },
  { label: "Monthly", value: 12 },
  { label: "Daily", value: 365 },
];

function SliderRow({ icon, label, value, display, min, max, step, onChange, minLabel, maxLabel }: {
  icon: React.ReactNode; label: string; value: number; display: string;
  min: number; max: number; step: number; onChange: (v: number) => void;
  minLabel: string; maxLabel: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {icon}
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{label}</span>
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", height: 4, appearance: "none", WebkitAppearance: "none", borderRadius: 4, outline: "none", cursor: "pointer", background: `linear-gradient(to right,var(--accent) ${pct}%,var(--border) ${pct}%)`, marginBottom: 4 }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
        <span>{minLabel}</span><span>{maxLabel}</span>
      </div>
    </div>
  );
}

function AreaChart({ data, principal }: { data: { year: number; amount: number }[]; principal: number }) {
  const W = 860, H = 220, PL = 72, PR = 16, PT = 16, PB = 36;
  const cW = W - PL - PR, cH = H - PT - PB;
  const maxVal = Math.max(...data.map(d => d.amount));
  const toX = (i: number) => PL + (i / (data.length - 1)) * cW;
  const toY = (v: number) => PT + cH - (v / (maxVal || 1)) * cH;
  const tickStep = Math.ceil(maxVal / 5 / 10000) * 10000 || 1;
  const yTicks = Array.from({ length: 6 }, (_, i) => i * tickStep).filter(v => v <= maxVal + tickStep);
  const pY = toY(principal);
  const amtPts = data.map((d, i) => `${toX(i)},${toY(d.amount)}`).join(" L ");
  const amtArea = `M ${toX(0)},${toY(data[0].amount)} L ${amtPts} L ${toX(data.length - 1)},${PT + cH} L ${toX(0)},${PT + cH} Z`;
  const amtLine = `M ${toX(0)},${toY(data[0].amount)} L ${amtPts}`;
  const pArea = `M ${toX(0)},${pY} L ${toX(data.length - 1)},${pY} L ${toX(data.length - 1)},${PT + cH} L ${toX(0)},${PT + cH} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="amtG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.03"/>
        </linearGradient>
        <linearGradient id="pG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e40af" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#1e40af" stopOpacity="0.03"/>
        </linearGradient>
      </defs>
      {yTicks.map(tick => {
        const y = toY(tick);
        if (y < PT - 2 || y > PT + cH + 2) return null;
        return (
          <g key={tick}>
            <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="var(--border)" strokeWidth="1"/>
            <text x={PL - 6} y={y + 4} textAnchor="end" fontSize="10" fill="var(--text-muted)">
              {tick >= 1000 ? (tick / 1000).toFixed(0) + "k" : tick}
            </text>
          </g>
        );
      })}
      <path d={amtArea} fill="url(#amtG)"/>
      <path d={pArea} fill="url(#pG)"/>
      <path d={amtLine} fill="none" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round"/>
      <line x1={toX(0)} y1={pY} x2={toX(data.length - 1)} y2={pY} stroke="#1e40af" strokeWidth="1.5" strokeDasharray="4 2"/>
      {data.map((d, i) => (
        <text key={d.year} x={toX(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="var(--text-muted)">Year {d.year}</text>
      ))}
      <line x1={PL} y1={PT + cH} x2={W - PR} y2={PT + cH} stroke="var(--border)" strokeWidth="1"/>
    </svg>
  );
}

export function CIClient() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [freq, setFreq] = useState(12);

  const result = useMemo(() => calcCompoundInterest(principal, rate, years, freq), [principal, rate, years, freq]);
  const growthPct = ((result.finalAmount / principal - 1) * 100).toFixed(1);

  return (
    <div style={{ fontFamily: "var(--font-body)", display: "flex", flexDirection: "column", gap: 16 }}>

      {/* ── Input Card ── */}
      <div className="card" style={{ padding: "20px 24px" }}>
        {/* Principal */}
        <div style={{ marginBottom: 20 }}>
          <SliderRow
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
            label="Principal Amount" value={principal}
            display={`₹${principal.toLocaleString("en-IN")}`}
            min={10000} max={10000000} step={1000}
            onChange={setPrincipal} minLabel="₹10,000" maxLabel="₹1,00,00,000"
          />
        </div>

        {/* Rate + Time side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 20 }}>
          <SliderRow
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>}
            label="Annual Interest Rate" value={rate} display={`${rate}%`}
            min={1} max={30} step={0.5} onChange={setRate} minLabel="1%" maxLabel="30%"
          />
          <SliderRow
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
            label="Time Period" value={years} display={`${years} yrs`}
            min={1} max={30} step={1} onChange={setYears} minLabel="1 yr" maxLabel="30 yrs"
          />
        </div>

        {/* Frequency buttons */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 10 }}>Compounding Frequency</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
            {frequencies.map(f => (
              <button key={f.value} onClick={() => setFreq(f.value)} style={{
                padding: "10px 0", borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
                border: freq === f.value ? "2px solid var(--accent)" : "1px solid var(--border)",
                background: freq === f.value ? "var(--accent)" : "var(--bg-subtle)",
                color: freq === f.value ? "#fff" : "var(--text)", fontSize: 13.5, fontWeight: 500,
                transition: "all 0.15s",
              }}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3 Result Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <div style={{ background: "var(--accent)", borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Principal</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>{formatCurrency(principal)}</div>
        </div>
        <div className="card" style={{ padding: "16px 20px" }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Total Interest</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "var(--text)" }}>{formatCurrency(result.totalInterest)}</div>
        </div>
        <div style={{ background: "#1e3a5f", borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Final Amount</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>{formatCurrency(result.finalAmount)}</div>
        </div>
      </div>

      {/* ── Growth Banner ── */}
      <div style={{ background: "var(--accent-light)", border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)", borderRadius: 10, padding: "12px 20px", textAlign: "center" }}>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--accent)" }}>↗ {growthPct}% growth over {years} years</span>
      </div>

      {/* ── Chart ── */}
      <div className="card" style={{ padding: "20px 24px" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Year-by-Year Growth</div>
        <AreaChart data={result.yearlyBreakdown} principal={principal} />
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 12 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-muted)" }}>
            <svg width="16" height="8"><line x1="0" y1="4" x2="16" y2="4" stroke="#1e40af" strokeWidth="2" strokeDasharray="4 2"/></svg>
            Principal
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-muted)" }}>
            <svg width="16" height="8"><line x1="0" y1="4" x2="16" y2="4" stroke="#2563eb" strokeWidth="2"/></svg>
            Interest
          </span>
        </div>
      </div>

      {/* ── Yearly Breakdown Table ── */}
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--border)" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>Yearly Breakdown</span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Year", "Amount", "Interest Earned", "Growth"].map(h => (
                <th key={h} style={{ padding: "12px 24px", textAlign: "left", fontSize: 13, fontWeight: 600, color: "var(--text-muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.yearlyBreakdown.map(row => (
              <tr key={row.year} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "13px 24px", fontSize: 13.5, color: "var(--text)", fontWeight: 500 }}>{row.year}</td>
                <td style={{ padding: "13px 24px", fontSize: 13.5, color: "var(--accent)", fontWeight: 600 }}>{formatCurrency(row.amount)}</td>
                <td style={{ padding: "13px 24px", fontSize: 13.5, color: "var(--accent)" }}>{formatCurrency(row.interest)}</td>
                <td style={{ padding: "13px 24px" }}>
                  <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20, background: "var(--bg-subtle)", color: "var(--text)", fontSize: 12.5, fontWeight: 600 }}>
                    {((row.amount / principal - 1) * 100).toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:16px; height:16px; border-radius:50%; background:var(--accent); border:2px solid var(--bg-card); box-shadow:0 0 0 1px var(--accent); cursor:pointer; }
        input[type=range]::-moz-range-thumb { width:16px; height:16px; border-radius:50%; background:var(--accent); border:2px solid var(--bg-card); cursor:pointer; }
      `}</style>
    </div>
  );
}
