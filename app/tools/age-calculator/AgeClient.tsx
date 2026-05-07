"use client";

import { useState, useMemo } from "react";
import { calcAge } from "@/utils/calculators";

function parseDate(str: string): Date | null {
  if (!str || str.length < 10) return null;
  const [d, m, y] = str.split("-").map(Number);
  if (!d || !m || !y || y < 1000) return null;
  const date = new Date(y, m - 1, d);
  if (isNaN(date.getTime())) return null;
  return date;
}

function formatDateInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  const parts: string[] = [];
  if (digits.length > 0) parts.push(digits.slice(0, 2));
  if (digits.length > 2) parts.push(digits.slice(2, 4));
  if (digits.length > 4) parts.push(digits.slice(4, 8));
  return parts.join("-");
}

export function AgeClient() {
  const today = new Date();
  const todayStr = formatDateInput(
    `${String(today.getDate()).padStart(2, "0")}${String(today.getMonth() + 1).padStart(2, "0")}${today.getFullYear()}`
  );

  const [dobInput, setDobInput] = useState("");
  const [onInput, setOnInput] = useState(todayStr);

  const dobDate = useMemo(() => parseDate(dobInput), [dobInput]);
  const onDate  = useMemo(() => parseDate(onInput),  [onInput]);

  const isInvalidOrder = !!(dobDate && onDate && onDate < dobDate);

  const result = useMemo(() => {
    if (!dobDate || !onDate || onDate < dobDate) return null;
    return calcAge(dobDate, onDate);
  }, [dobDate, onDate]);

  const handleDob = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDobInput(formatDateInput(e.target.value));
  };

  const handleOn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnInput(formatDateInput(e.target.value));
  };

  const hasValidDob = !!dobDate;

  // Calendar icon SVG
  const CalIcon = () => (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="4" width="14" height="13" rx="2" stroke="var(--accent)" strokeWidth="1.6"/>
      <path d="M3 8h14" stroke="var(--accent)" strokeWidth="1.6"/>
      <path d="M7 2v3M13 2v3" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );

  // Clock icon SVG
  const ClockIcon = () => (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="var(--accent)" strokeWidth="1.6"/>
      <path d="M10 6v4l2.5 2.5" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%", maxWidth: 560, margin: "0 auto", padding: "16px 0", fontFamily: "var(--font-body)" }}>

      {/* Date inputs */}
      <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "20px 24px", border: "1px solid var(--border)" }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              <CalIcon /> Date of Birth
            </label>
            <input
              style={{
                border: `1px solid ${isInvalidOrder ? "#f87171" : "var(--border)"}`,
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 15,
                color: "var(--text)",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
                background: "var(--bg-subtle)",
                transition: "border-color 0.15s",
              }}
              value={dobInput}
              onChange={handleDob}
              placeholder="DD-MM-YYYY"
              maxLength={10}
            />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              <ClockIcon /> Calculate Age On
            </label>
            <input
              style={{
                border: `1px solid ${isInvalidOrder ? "#f87171" : "var(--border)"}`,
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 15,
                color: "var(--text)",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
                background: "var(--bg-subtle)",
                transition: "border-color 0.15s",
              }}
              value={onInput}
              onChange={handleOn}
              placeholder="DD-MM-YYYY"
              maxLength={10}
            />
          </div>
        </div>
        {isInvalidOrder && (
          <p style={{ marginTop: 10, marginBottom: 0, fontSize: 12, color: "#ef4444", fontWeight: 500 }}>
            ⚠ &ldquo;Calculate Age On&rdquo; date must be on or after the date of birth.
          </p>
        )}
      </div>

      {/* Age tiles — YEARS: accent blue, MONTHS + DAYS: dark card */}
      <div style={{ display: "flex", gap: 12 }}>
        {[
          { label: "YEARS",  value: hasValidDob && result ? result.years  : "—", accent: true  },
          { label: "MONTHS", value: hasValidDob && result ? result.months : "—", accent: false },
          { label: "DAYS",   value: hasValidDob && result ? result.days   : "—", accent: false },
        ].map((t) => (
          <div
            key={t.label}
            style={{
              flex: 1,
              borderRadius: 16,
              padding: "26px 10px 22px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              background: t.accent ? "var(--accent)" : "var(--bg-subtle)",
              border: t.accent ? "none" : "1px solid var(--border)",
            }}
          >
            <span style={{ fontSize: 46, fontWeight: 700, color: t.accent ? "#fff" : "var(--text)", lineHeight: 1 }}>
              {t.value}
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: t.accent ? "rgba(255,255,255,0.85)" : "var(--text-muted)", letterSpacing: "1.5px" }}>
              {t.label}
            </span>
          </div>
        ))}
      </div>

      {/* Total Duration */}
      <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "20px 22px", border: "1px solid var(--border)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Total Days",    value: result ? result.totalDays.toLocaleString()    : "—" },
            { label: "Total Hours",   value: result ? result.totalHours.toLocaleString()   : "—" },
            { label: "Total Minutes", value: result ? result.totalMinutes.toLocaleString() : "—" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "13px 16px",
                border: "1px solid var(--border)",
                borderRadius: 10,
                background: "var(--bg-subtle)",
              }}
            >
              <span style={{ fontSize: 14, color: "var(--text)", fontWeight: 500 }}>{item.label}</span>
              <span style={{ fontSize: 14, color: "var(--text)", fontWeight: 700 }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Birthday */}
      {result && (
        <div
          style={{
            background: "var(--accent-light)",
            borderRadius: 16,
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="10" width="18" height="11" rx="1.5" stroke="var(--accent)" strokeWidth="1.6"/>
                <path d="M3 14h18" stroke="var(--accent)" strokeWidth="1.4"/>
                <rect x="9" y="10" width="6" height="11" stroke="var(--accent)" strokeWidth="1.4"/>
                <path d="M12 10C12 10 9 8 9 5.5a3 3 0 0 1 3-3" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M12 10C12 10 15 8 15 5.5a3 3 0 0 0-3-3" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", letterSpacing: "1px", margin: "0 0 4px 0" }}>
                NEXT BIRTHDAY
              </p>
              <p style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", margin: 0 }}>
                {result.nextBirthday.date}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ fontSize: 36, fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>
              {result.nextBirthday.days.toLocaleString()}
            </span>
            <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500, marginTop: 2 }}>
              days away
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
