"use client";
import { useState } from "react";
import { calcAge } from "@/utils/calculators";

export function AgeClient() {
  const today = new Date().toISOString().split("T")[0];
  const [dob, setDob] = useState("");
  const [refDate, setRefDate] = useState(today); // ← today pre-selected

  const result = dob
    ? calcAge(new Date(dob), refDate ? new Date(refDate) : new Date())
    : null;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    fontSize: 14,
    border: "0.5px solid var(--border-secondary)",
    borderRadius: 8,
    background: "var(--bg-card)",
    color: "var(--text)",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 500,
    color: "var(--text-muted)",
    marginBottom: 6,
    display: "block",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>

      {/* Input card */}
      <div style={{
        background: "var(--bg-card)",
        border: "0.5px solid var(--border)",
        borderRadius: 14,
        overflow: "hidden",
      }}>
        <div style={{ padding: "16px 20px", borderBottom: "0.5px solid var(--border)" }}>
          <label style={labelStyle}>Date of birth</label>
          <input
            type="date"
            style={inputStyle}
            value={dob}
            max={today}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div style={{ padding: "16px 20px", background: "var(--bg-subtle)" }}>
          <label style={labelStyle}>Calculate age on</label>
          <input
            type="date"
            style={inputStyle}
            value={refDate}
            max={today}
            onChange={(e) => setRefDate(e.target.value)}
          />
        </div>
      </div>

      {/* Empty state */}
      {!dob && (
        <div style={{
          textAlign: "center",
          padding: "36px 0",
          fontSize: 13,
          color: "var(--text-muted)",
          border: "0.5px dashed var(--border)",
          borderRadius: 12,
        }}>
          Enter your date of birth to see your age
        </div>
      )}

      {/* Results */}
      {result && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

          {/* Y / M / D */}
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { label: "Years", value: result.years },
              { label: "Months", value: result.months },
              { label: "Days", value: result.days },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  background: i === 0 ? "#378ADD" : "var(--bg-subtle)",
                  borderRadius: 10,
                  padding: "16px 10px",
                  textAlign: "center",
                  border: i === 0 ? "none" : "0.5px solid var(--border)",
                }}
              >
                <div style={{
                  fontSize: 30,
                  fontWeight: 500,
                  lineHeight: 1,
                  color: i === 0 ? "#fff" : "var(--text)",
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: 11,
                  marginTop: 5,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: i === 0 ? "rgba(255,255,255,0.75)" : "var(--text-muted)",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Extended stats */}
          <div style={{
            background: "var(--bg-card)",
            border: "0.5px solid var(--border)",
            borderRadius: 12,
            padding: "2px 16px",
          }}>
            {[
              { label: "Total days", value: result.totalDays.toLocaleString("en-IN") },
              { label: "Total hours", value: result.totalHours.toLocaleString("en-IN") },
              { label: "Total minutes", value: result.totalMinutes.toLocaleString("en-IN") },
            ].map((s, i, arr) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "11px 0",
                  borderBottom: i < arr.length - 1 ? "0.5px solid var(--border)" : "none",
                }}
              >
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{s.label}</span>
                <span style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--text)",
                  fontFamily: "var(--font-mono)",
                }}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          {/* Next birthday */}
          <div style={{
            background: "#E6F1FB",
            border: "0.5px solid #B5D4F4",
            borderRadius: 12,
            padding: "14px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <div>
              <div style={{
                fontSize: 11,
                fontWeight: 500,
                color: "#185FA5",
                marginBottom: 4,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>
                Next birthday
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#0C447C" }}>
                {result.nextBirthday.date}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 24, fontWeight: 500, color: "#185FA5" }}>
                {result.nextBirthday.days === 0 ? "Today!" : result.nextBirthday.days}
              </div>
              {result.nextBirthday.days !== 0 && (
                <div style={{ fontSize: 11, color: "#378ADD" }}>days away</div>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}