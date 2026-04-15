"use client";
import { useState } from "react";
import { calcCompoundInterest, formatCurrency } from "@/utils/calculators";

const frequencies = [
  { label: "Annually", value: 1 },
  { label: "Quarterly", value: 4 },
  { label: "Monthly", value: 12 },
  { label: "Daily", value: 365 },
];

export function CIClient() {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("10");
  const [freq, setFreq] = useState(12);

  const p = parseFloat(principal) || 0;
  const r = parseFloat(rate) || 0;
  const y = Math.min(parseInt(years) || 0, 50);
  const valid = p > 0 && r > 0 && y > 0;

  const result = valid ? calcCompoundInterest(p, r, y, freq) : null;
  const maxAmount = result?.yearlyBreakdown[result.yearlyBreakdown.length - 1]?.amount ?? 0;

  return (
    <div className="space-y-5">
      <div className="card p-5 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="label mb-0">Principal Amount</label>
              <span className="text-xs font-mono font-bold" style={{ color: "var(--accent)" }}>
                {formatCurrency(p)}
              </span>
            </div>
            <input
              type="range" className="w-full mb-2"
              min="1000" max="10000000" step="1000"
              value={principal} onChange={(e) => setPrincipal(e.target.value)}
            />
            <input type="number" className="input-base" value={principal}
              onChange={(e) => setPrincipal(e.target.value)} placeholder="100000" />
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <label className="label mb-0">Annual Interest Rate</label>
              <span className="text-xs font-mono font-bold" style={{ color: "var(--accent)" }}>{rate}%</span>
            </div>
            <input
              type="range" className="w-full mb-2"
              min="1" max="30" step="0.5"
              value={rate} onChange={(e) => setRate(e.target.value)}
            />
            <input type="number" className="input-base" value={rate}
              onChange={(e) => setRate(e.target.value)} placeholder="12" step="0.5" />
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <label className="label mb-0">Time Period</label>
              <span className="text-xs font-mono font-bold" style={{ color: "var(--accent)" }}>{years} yrs</span>
            </div>
            <input
              type="range" className="w-full mb-2"
              min="1" max="50" step="1"
              value={years} onChange={(e) => setYears(e.target.value)}
            />
            <input type="number" className="input-base" value={years}
              onChange={(e) => setYears(e.target.value)} placeholder="10" />
          </div>

          <div>
            <label className="label">Compounding Frequency</label>
            <div className="grid grid-cols-2 gap-2">
              {frequencies.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFreq(f.value)}
                  className="py-2 rounded-xl text-xs font-medium transition-all"
                  style={{
                    fontFamily: "var(--font-display)",
                    background: freq === f.value ? "var(--accent)" : "var(--bg-subtle)",
                    color: freq === f.value ? "white" : "var(--text-muted)",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {result && (
        <>
          <div className="result-box p-6 animate-slide-up">
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div>
                <div className="stat-value text-xl">{formatCurrency(p)}</div>
                <div className="stat-label">Principal</div>
              </div>
              <div>
                <div className="stat-value" style={{ color: "#ec4899" }}>
                  {formatCurrency(result.totalInterest)}
                </div>
                <div className="stat-label">Total Interest</div>
              </div>
              <div>
                <div className="stat-value" style={{ color: "#10b981" }}>
                  {formatCurrency(result.finalAmount)}
                </div>
                <div className="stat-label">Final Amount</div>
              </div>
            </div>

            <div className="text-center text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              {(result.finalAmount / p).toFixed(2)}x growth over {y} years
            </div>

            {/* Bar chart */}
            <div>
              <div className="text-xs font-medium mb-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-display)" }}>
                Year-by-Year Growth
              </div>
              <div className="flex items-end gap-1 h-32">
                {result.yearlyBreakdown.map((row) => {
                  const totalPct = (row.amount / maxAmount) * 100;
                  const principalPct = (p / row.amount) * 100;
                  return (
                    <div
                      key={row.year}
                      className="flex-1 flex flex-col justify-end group relative"
                      title={`Year ${row.year}: ${formatCurrency(row.amount)}`}
                    >
                      <div className="rounded-t overflow-hidden" style={{ height: `${totalPct}%`, minHeight: 4 }}>
                        <div style={{ height: `${principalPct}%`, background: "#3b82f6" }} />
                        <div style={{ height: `${100 - principalPct}%`, background: "#ec4899" }} />
                      </div>
                      {/* Tooltip */}
                      <div
                        className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block text-xs px-2 py-1 rounded whitespace-nowrap z-10"
                        style={{ background: "var(--text)", color: "var(--bg)", fontFamily: "var(--font-mono)" }}
                      >
                        Y{row.year}: {formatCurrency(row.amount)}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                <span>Year 1</span>
                <span>Year {y}</span>
              </div>
              <div className="flex gap-4 mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: "#3b82f6" }} />
                  Principal
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: "#ec4899" }} />
                  Interest
                </span>
              </div>
            </div>
          </div>

          {/* Year table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: "var(--bg-subtle)", borderBottom: "1px solid var(--border)" }}>
                    {["Year", "Amount", "Interest Earned", "Growth"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.yearlyBreakdown.map((row, i) => (
                    <tr key={row.year} style={{
                      borderBottom: "1px solid var(--border)",
                      background: i % 2 === 0 ? "transparent" : "var(--bg-subtle)",
                    }}>
                      <td className="px-4 py-2.5 font-mono font-medium" style={{ color: "var(--text-muted)" }}>
                        {row.year}
                      </td>
                      <td className="px-4 py-2.5 font-mono font-bold" style={{ color: "#10b981" }}>
                        {formatCurrency(row.amount)}
                      </td>
                      <td className="px-4 py-2.5 font-mono" style={{ color: "#ec4899" }}>
                        +{formatCurrency(row.interest)}
                      </td>
                      <td className="px-4 py-2.5 font-mono">
                        {((row.amount / p) * 100 - 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
