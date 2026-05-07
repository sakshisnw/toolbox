"use client";
import { useState } from "react";
import { calcEMI, formatCurrency } from "@/utils/calculators";

function DonutChart({ principalPct }: { principalPct: number }) {
  const r = 72, cx = 90, cy = 90;
  const circ = 2 * Math.PI * r;
  const pDash = (principalPct / 100) * circ;
  const iDash = circ - pDash;

  return (
    <svg width="180" height="180" viewBox="0 0 180 180" role="img" aria-label="Donut chart showing principal vs interest split">
      {/* Background track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-border-tertiary)" strokeWidth="24" />
      {/* Principal arc */}
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke="var(--accent)"
        strokeWidth="24"
        strokeLinecap="butt"
        strokeDasharray={`${pDash} ${iDash}`}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      {/* Interest arc */}
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke="#D85A30"
        strokeWidth="24"
        strokeLinecap="butt"
        strokeDasharray={`${iDash} ${pDash}`}
        strokeDashoffset={-pDash}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    </svg>
  );
}

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  display,
  suffix,
  prefix,
  onRange,
  onText,
  extra,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  suffix?: string;
  prefix?: string;
  onRange: (v: number) => void;
  onText: (v: string) => void;
  extra?: React.ReactNode;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const trackStyle = {
    background: `linear-gradient(to right, var(--accent) ${pct}%, var(--border) ${pct}%)`,
  } as React.CSSProperties;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 4,
            background: "var(--bg-subtle)",
            borderRadius: 6,
            padding: "3px 8px",
          }}>
            {prefix && <span style={{ fontSize: 11, color: "var(--accent)", fontWeight: 500 }}>{prefix}</span>}
            <input
              type="number"
              value={display}
              step={step}
              onChange={(e) => onText(e.target.value)}
              style={{
                width: prefix ? 80 : 36,
                background: "none", border: "none",
                fontSize: 12, fontFamily: "var(--font-mono)",
                fontWeight: 500, color: "var(--accent)",
                textAlign: "right", padding: 0,
                outline: "none",
              }}
            />
            {suffix && <span style={{ fontSize: 11, color: "var(--accent)", fontWeight: 500 }}>{suffix}</span>}
          </div>
          {extra}
        </div>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onRange(parseFloat(e.target.value))}
        style={{ width: "100%", ...trackStyle }}
      />
    </div>
  );
}

export function EMIClient() {
  const [principal, setPrincipal] = useState(500000);
  const [principalText, setPrincipalText] = useState("500000");
  const [rate, setRate] = useState(8.5);
  const [rateText, setRateText] = useState("8.5");
  const [tenure, setTenure] = useState(60);
  const [tenureText, setTenureText] = useState("60");
  const [tenureType, setTenureType] = useState<"months" | "years">("months");
  const [showSchedule, setShowSchedule] = useState(false);

  const t = tenure * (tenureType === "years" ? 12 : 1);
  const valid = principal > 0 && rate > 0 && t > 0;
  const result = valid ? calcEMI(principal, rate, t) : null;

  const principalPct = result ? (principal / result.totalAmount) * 100 : 66;
  const interestPct = result ? (result.totalInterest / result.totalAmount) * 100 : 34;

  const maxTenure = tenureType === "years" ? 30 : 360;

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      {/* Main card */}
      <div style={{
        background: "var(--bg-card)",
        border: "0.5px solid var(--border)",
        borderRadius: 12,
        padding: "1.25rem",
        marginBottom: "0.75rem",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1.5rem", alignItems: "center" }}>

          {/* Sliders */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <SliderInput
              label="Loan amount"
              value={principal}
              min={10000} max={10000000} step={10000}
              display={principalText}
              prefix="₹"
              onRange={(v) => { setPrincipal(v); setPrincipalText(String(v)); }}
              onText={(v) => {
                setPrincipalText(v);
                const n = Math.min(10000000, Math.max(10000, parseFloat(v) || 0));
                setPrincipal(n);
              }}
            />
            <SliderInput
              label="Rate of interest (p.a)"
              value={rate}
              min={1} max={30} step={0.1}
              display={rateText}
              suffix="%"
              onRange={(v) => { setRate(v); setRateText(v.toFixed(1)); }}
              onText={(v) => {
                setRateText(v);
                const n = Math.min(30, Math.max(1, parseFloat(v) || 0));
                setRate(n);
              }}
            />
            <SliderInput
              label="Loan tenure"
              value={tenure}
              min={1} max={maxTenure} step={1}
              display={tenureText}
              suffix={tenureType === "years" ? "Yr" : "Mo"}
              onRange={(v) => { setTenure(v); setTenureText(String(v)); }}
              onText={(v) => {
                setTenureText(v);
                const n = Math.min(maxTenure, Math.max(1, parseInt(v) || 0));
                setTenure(n);
              }}
              extra={
                <div style={{
                  display: "flex",
                  border: "0.5px solid var(--border)",
                  borderRadius: 6,
                  overflow: "hidden",
                }}>
                  {(["months", "years"] as const).map((u) => (
                    <button
                      key={u}
                      onClick={() => setTenureType(u)}
                      style={{
                        padding: "4px 8px",
                        fontSize: 11, fontWeight: 500,
                        border: "none", cursor: "pointer",
                        background: tenureType === u ? "var(--accent)" : "transparent",
                        color: tenureType === u ? "white" : "var(--text-muted)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {u === "months" ? "Mo" : "Yr"}
                    </button>
                  ))}
                </div>
              }
            />
          </div>

          {/* Donut chart */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, paddingTop: 4 }}>
            {/* Legend */}
            <div style={{ display: "flex", gap: 12, fontSize: 11, color: "var(--color-text-secondary)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
                Principal
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#D85A30", display: "inline-block" }} />
                Interest
              </span>
            </div>

            {/* Donut with centered EMI */}
            <div style={{ position: "relative", width: 180, height: 180 }}>
              <DonutChart principalPct={principalPct} />
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)", textAlign: "center", pointerEvents: "none",
              }}>
                <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 3 }}>Monthly EMI</div>
                <div style={{
                  fontSize: 15, fontWeight: 500,
                  fontFamily: "var(--font-mono)",
                  color: "var(--text)", lineHeight: 1.2,
                }}>
                  {result ? formatCurrency(result.emi) : "—"}
                </div>
              </div>
            </div>

            {/* Pct labels */}
            <div style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center", lineHeight: 2 }}>
              <div><span style={{ color: "var(--accent)", fontWeight: 500 }}>{principalPct.toFixed(1)}%</span> principal</div>
              <div><span style={{ color: "#D85A30", fontWeight: 500 }}>{interestPct.toFixed(1)}%</span> interest</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      {result && (
        <>
          <div style={{
            background: "var(--bg-card)",
            border: "0.5px solid var(--border)",
            borderRadius: 12,
            padding: "0 1.25rem",
            marginBottom: "0.75rem",
          }}>
            {[
              { label: "Monthly EMI", value: formatCurrency(result.emi), color: "var(--text)", large: true },
              { label: "Principal amount", value: formatCurrency(principal), color: "var(--text)" },
              { label: "Total interest", value: formatCurrency(result.totalInterest), color: "#D85A30" },
              { label: "Total amount", value: formatCurrency(result.totalAmount), color: "var(--accent)" },
            ].map(({ label, value, color, large }, i, arr) => (
              <div
                key={label}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 0",
                  borderBottom: i < arr.length - 1 ? "0.5px solid var(--border)" : "none",
                }}
              >
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{label}</span>
                <span style={{
                  fontSize: large ? 15 : 12,
                  fontWeight: large ? 500 : 400,
                  fontFamily: "var(--font-mono)",
                  color,
                }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowSchedule((s) => !s)}
            style={{
              width: "100%", padding: "11px",
              background: "var(--bg-subtle)",
              border: "0.5px solid var(--border)",
              borderRadius: 12,
              fontSize: 12, color: "var(--text-muted)",
              cursor: "pointer", fontFamily: "var(--font-body)",
              marginBottom: showSchedule ? "0.5rem" : 0,
            }}
          >
            {showSchedule ? "▲ Hide" : "▼ View"} Amortization Schedule ({t} months)
          </button>

          {showSchedule && (
            <div style={{
              background: "var(--bg-card)",
              border: "0.5px solid var(--border)",
              borderRadius: 12,
              overflow: "hidden",
            }}>
              <div style={{ overflowX: "auto", maxHeight: 280, overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "var(--bg-subtle)", position: "sticky", top: 0 }}>
                      {["Month", "EMI", "Principal", "Interest", "Balance"].map((h) => (
                        <th key={h} style={{
                          padding: "9px 10px", textAlign: "left",
                          fontSize: 11, fontWeight: 500,
                          color: "var(--text-muted)",
                          borderBottom: "0.5px solid var(--border)",
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.slice(0, 120).map((row, i) => (
                      <tr key={row.month} style={{
                        borderBottom: "0.5px solid var(--border)",
                        background: i % 2 === 0 ? "transparent" : "var(--bg-subtle)",
                      }}>
                        <td style={{ padding: "7px 10px", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{row.month}</td>
                        <td style={{ padding: "7px 10px", fontSize: 11, fontFamily: "var(--font-mono)" }}>{formatCurrency(row.emi)}</td>
                        <td style={{ padding: "7px 10px", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--accent)" }}>{formatCurrency(row.principal)}</td>
                        <td style={{ padding: "7px 10px", fontSize: 11, fontFamily: "var(--font-mono)", color: "#D85A30" }}>{formatCurrency(row.interest)}</td>
                        <td style={{ padding: "7px 10px", fontSize: 11, fontFamily: "var(--font-mono)" }}>{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {t > 120 && (
                <div style={{
                  padding: "9px 10px", fontSize: 11,
                  color: "var(--text-muted)",
                  borderTop: "0.5px solid var(--border)",
                }}>
                  Showing first 120 of {t} months
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}