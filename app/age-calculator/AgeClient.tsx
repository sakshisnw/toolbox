"use client";
import { useState } from "react";
import { calcAge } from "@/utils/calculators";

export function AgeClient() {
  const [dob, setDob] = useState("");
  const [refDate, setRefDate] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const result =
    dob
      ? calcAge(new Date(dob), refDate ? new Date(refDate) : new Date())
      : null;

  const stats = result
    ? [
        { label: "Years", value: result.years },
        { label: "Months", value: result.months },
        { label: "Days", value: result.days },
      ]
    : [];

  return (
    <div className="space-y-5">
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Date of Birth</label>
          <input
            type="date"
            className="input-base"
            value={dob}
            max={today}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Calculate age on (optional)</label>
          <input
            type="date"
            className="input-base"
            value={refDate}
            max={today}
            placeholder="Leave blank for today"
            onChange={(e) => setRefDate(e.target.value)}
          />
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            Leave blank to calculate up to today
          </p>
        </div>
      </div>

      {result && (
        <div className="result-box p-6 animate-slide-up space-y-5">
          {/* Primary display */}
          <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map((s) => (
              <div key={s.label} className="p-4 rounded-xl" style={{ background: "var(--bg-subtle)" }}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="h-px" style={{ background: "var(--border)" }} />

          {/* Extended stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Total Days", value: result.totalDays.toLocaleString("en-IN") },
              { label: "Total Hours", value: result.totalHours.toLocaleString("en-IN") },
              { label: "Total Minutes", value: result.totalMinutes.toLocaleString("en-IN") },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-0.5 px-4 py-3 rounded-xl"
                style={{ background: "var(--bg-subtle)" }}
              >
                <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-display)" }}>
                  {s.label}
                </span>
                <span className="font-bold text-lg" style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          {/* Next birthday */}
          <div
            className="flex items-center justify-between px-4 py-3 rounded-xl"
            style={{ background: "color-mix(in srgb, #8b5cf6 12%, transparent)", border: "1px solid color-mix(in srgb, #8b5cf6 25%, transparent)" }}
          >
            <div>
              <div className="text-xs font-medium mb-0.5" style={{ color: "#8b5cf6", fontFamily: "var(--font-display)" }}>
                🎂 Next Birthday
              </div>
              <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
                {result.nextBirthday.date}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold" style={{ color: "#8b5cf6", fontFamily: "var(--font-display)" }}>
                {result.nextBirthday.days}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>days away</div>
            </div>
          </div>
        </div>
      )}

      {!dob && (
        <div
          className="text-center py-10 rounded-2xl border-2 border-dashed text-sm"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          Enter your date of birth to see your age
        </div>
      )}
    </div>
  );
}
