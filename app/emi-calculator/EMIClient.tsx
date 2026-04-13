"use client";
import { useState } from "react";
import { calcEMI, formatCurrency } from "@/utils/calculators";

export function EMIClient() {
  const [principal, setPrincipal] = useState("500000");
  const [rate, setRate] = useState("8.5");
  const [tenure, setTenure] = useState("60");
  const [tenureType, setTenureType] = useState<"months" | "years">("months");
  const [showSchedule, setShowSchedule] = useState(false);

  const p = parseFloat(principal) || 0;
  const r = parseFloat(rate) || 0;
  const t = (parseFloat(tenure) || 0) * (tenureType === "years" ? 12 : 1);

  const valid = p > 0 && r > 0 && t > 0;
  const result = valid ? calcEMI(p, r, t) : null;

  const principalPct = result ? (p / result.totalAmount) * 100 : 0;
  const interestPct = result ? (result.totalInterest / result.totalAmount) * 100 : 0;

  return (
    <div className="space-y-5">
      <div className="card p-5 space-y-5">
        {/* Principal */}
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="label mb-0">Loan Amount</label>
            <span className="text-xs font-mono font-bold" style={{ color: "var(--accent)" }}>
              {formatCurrency(p)}
            </span>
          </div>
          <input
            type="range"
            className="w-full mb-2"
            min="10000"
            max="10000000"
            step="10000"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
          <input
            type="number"
            className="input-base"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="500000"
          />
        </div>

        {/* Rate */}
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="label mb-0">Annual Interest Rate</label>
            <span className="text-xs font-mono font-bold" style={{ color: "var(--accent)" }}>
              {rate}%
            </span>
          </div>
          <input
            type="range"
            className="w-full mb-2"
            min="1"
            max="30"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
          <input
            type="number"
            className="input-base"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="8.5"
            step="0.1"
          />
        </div>

        {/* Tenure */}
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="label mb-0">Loan Tenure</label>
            <div className="flex gap-1">
              {(["months", "years"] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setTenureType(u)}
                  className="px-2 py-0.5 rounded text-xs font-medium transition-colors"
                  style={{
                    background: tenureType === u ? "var(--accent)" : "var(--bg-subtle)",
                    color: tenureType === u ? "white" : "var(--text-muted)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
          <input
            type="range"
            className="w-full mb-2"
            min="1"
            max={tenureType === "months" ? 360 : 30}
            step="1"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />
          <input
            type="number"
            className="input-base"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            placeholder="60"
          />
        </div>
      </div>

      {result && (
        <>
          {/* Result summary */}
          <div className="result-box p-6 animate-slide-up">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
              <div className="text-center">
                <div className="stat-value">{formatCurrency(result.emi)}</div>
                <div className="stat-label">Monthly EMI</div>
              </div>
              <div className="text-center">
                <div className="stat-value text-2xl" style={{ color: "#ef4444" }}>
                  {formatCurrency(result.totalInterest)}
                </div>
                <div className="stat-label">Total Interest</div>
              </div>
              <div className="text-center">
                <div className="stat-value text-2xl" style={{ color: "#10b981" }}>
                  {formatCurrency(result.totalAmount)}
                </div>
                <div className="stat-label">Total Payable</div>
              </div>
            </div>

            {/* Breakdown bar */}
            <div>
              <div className="flex rounded-full overflow-hidden h-4 mb-2">
                <div style={{ width: `${principalPct}%`, background: "#10b981" }} title="Principal" />
                <div style={{ width: `${interestPct}%`, background: "#ef4444" }} title="Interest" />
              </div>
              <div className="flex gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: "#10b981" }} />
                  Principal {principalPct.toFixed(1)}%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: "#ef4444" }} />
                  Interest {interestPct.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Amortization schedule toggle */}
          <button
            onClick={() => setShowSchedule((s) => !s)}
            className="w-full py-3 rounded-xl text-sm font-medium transition-colors"
            style={{
              background: "var(--bg-subtle)",
              color: "var(--text)",
              fontFamily: "var(--font-display)",
              border: "1px solid var(--border)",
            }}
          >
            {showSchedule ? "▲ Hide" : "▼ Show"} Amortization Schedule ({t} months)
          </button>

          {showSchedule && (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: "var(--bg-subtle)", borderBottom: "1px solid var(--border)" }}>
                      {["Month", "EMI", "Principal", "Interest", "Balance"].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left font-semibold"
                          style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.map((row, i) => (
                      <tr
                        key={row.month}
                        style={{
                          borderBottom: "1px solid var(--border)",
                          background: i % 2 === 0 ? "transparent" : "var(--bg-subtle)",
                        }}
                      >
                        <td className="px-4 py-2.5 font-mono font-medium" style={{ color: "var(--text-muted)" }}>
                          {row.month}
                        </td>
                        <td className="px-4 py-2.5 font-mono">{formatCurrency(row.emi)}</td>
                        <td className="px-4 py-2.5 font-mono" style={{ color: "#10b981" }}>
                          {formatCurrency(row.principal)}
                        </td>
                        <td className="px-4 py-2.5 font-mono" style={{ color: "#ef4444" }}>
                          {formatCurrency(row.interest)}
                        </td>
                        <td className="px-4 py-2.5 font-mono">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
