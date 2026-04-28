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

  return (
    <div style={s.container}>

      {/* Date inputs */}
      <div style={s.inputCard}>
        <div style={s.row}>
          <div style={s.field}>
            <label style={s.label}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="4" width="14" height="13" rx="2" stroke="#4f8ef7" strokeWidth="1.6"/>
                <path d="M3 8h14" stroke="#4f8ef7" strokeWidth="1.6"/>
                <path d="M7 2v3M13 2v3" stroke="#4f8ef7" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              Date of Birth
            </label>
            <input
              style={{
                ...s.input,
                borderColor: isInvalidOrder ? "#f87171" : "#e5e7eb",
              }}
              value={dobInput}
              onChange={handleDob}
              placeholder="DD-MM-YYYY"
              maxLength={10}
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7" stroke="#4f8ef7" strokeWidth="1.6"/>
                <path d="M10 6v4l2.5 2.5" stroke="#4f8ef7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Calculate Age On
            </label>
            <input
              style={{
                ...s.input,
                borderColor: isInvalidOrder ? "#f87171" : "#e5e7eb",
              }}
              value={onInput}
              onChange={handleOn}
              placeholder="DD-MM-YYYY"
              maxLength={10}
            />
          </div>
        </div>
        {isInvalidOrder && (
          <p style={s.errorMsg}>
            ⚠ &ldquo;Calculate Age On&rdquo; date must be on or after the date of birth.
          </p>
        )}
      </div>

      {/* Age tiles */}
      <div style={s.tiles}>
        {[
          { label: "YEARS",  value: hasValidDob && result ? result.years  : "—", bg: "linear-gradient(135deg, #4f8ef7 0%, #3b6fd4 100%)" },
          { label: "MONTHS", value: hasValidDob && result ? result.months : "—", bg: "linear-gradient(135deg, #6a5af9 0%, #5040d9 100%)" },
          { label: "DAYS",   value: hasValidDob && result ? result.days   : "—", bg: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)" },
        ].map((t) => (
          <div key={t.label} style={{ ...s.tile, background: t.bg }}>
            <span style={s.tileNum}>{t.value}</span>
            <span style={s.tileLabel}>{t.label}</span>
          </div>
        ))}
      </div>

      {/* Total Duration */}
      <div style={s.durationBox}>
        <p style={s.durationTitle}>Total Duration</p>
        <div style={s.durationList}>
          {[
            { label: "Total Days",    value: result ? result.totalDays.toLocaleString()    : "—" },
            { label: "Total Hours",   value: result ? result.totalHours.toLocaleString()   : "—" },
            { label: "Total Minutes", value: result ? result.totalMinutes.toLocaleString() : "—" },
          ].map((item) => (
            <div key={item.label} style={s.durationRow}>
              <span style={s.durationKey}>{item.label}</span>
              <span style={s.durationVal}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Birthday */}
      {result && (
        <div style={s.birthdayBox}>
          <div style={s.birthdayLeft}>
            <div style={s.giftIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="10" width="18" height="11" rx="1.5" stroke="#4f46e5" strokeWidth="1.6"/>
                <path d="M3 14h18" stroke="#4f46e5" strokeWidth="1.4"/>
                <rect x="9" y="10" width="6" height="11" stroke="#4f46e5" strokeWidth="1.4"/>
                <path d="M12 10C12 10 9 8 9 5.5a3 3 0 0 1 3-3" stroke="#4f46e5" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M12 10C12 10 15 8 15 5.5a3 3 0 0 0-3-3" stroke="#4f46e5" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p style={s.birthdayMeta}>NEXT BIRTHDAY</p>
              <p style={s.birthdayDate}>{result.nextBirthday.date}</p>
            </div>
          </div>
          <div style={s.birthdayRight}>
            <span style={s.daysAway}>{result.nextBirthday.days.toLocaleString()}</span>
            <span style={s.daysAwayLabel}>days away</span>
          </div>
        </div>
      )}

    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    maxWidth: "560px",
    margin: "0 auto",
    padding: "16px 0",
    fontFamily: "'Segoe UI', sans-serif",
  },
  inputCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px 24px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
  },
  row: {
    display: "flex",
    gap: "16px",
  },
  field: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "13px",
    color: "#6b7280",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  input: {
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "15px",
    color: "#111827",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    background: "#fff",
    transition: "border-color 0.15s",
  },
  errorMsg: {
    marginTop: "10px",
    marginBottom: 0,
    fontSize: "12px",
    color: "#ef4444",
    fontWeight: 500,
  },
  tiles: {
    display: "flex",
    gap: "12px",
  },
  tile: {
    flex: 1,
    borderRadius: "16px",
    padding: "26px 10px 22px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  tileNum: {
    fontSize: "46px",
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1,
  },
  tileLabel: {
    fontSize: "12px",
    fontWeight: 600,
    color: "rgba(255,255,255,0.85)",
    letterSpacing: "1.5px",
  },
  durationBox: {
    background: "#f3f4f6",
    borderRadius: "16px",
    padding: "20px 22px",
  },
  durationTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#111827",
    margin: "0 0 14px 0",
  },
  durationList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  durationRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "13px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    background: "#fff",
  },
  durationKey: {
    fontSize: "14px",
    color: "#374151",
    fontWeight: 500,
  },
  durationVal: {
    fontSize: "14px",
    color: "#111827",
    fontWeight: 700,
  },
  birthdayBox: {
    background: "#eef2ff",
    borderRadius: "16px",
    padding: "18px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  birthdayLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  giftIcon: {
    background: "#fff",
    border: "1px solid #e0e4f5",
    borderRadius: "10px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  birthdayMeta: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#4f46e5",
    letterSpacing: "1px",
    margin: "0 0 4px 0",
  },
  birthdayDate: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#111827",
    margin: 0,
  },
  birthdayRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  daysAway: {
    fontSize: "36px",
    fontWeight: 800,
    color: "#4f46e5",
    lineHeight: 1,
  },
  daysAwayLabel: {
    fontSize: "13px",
    color: "#6366f1",
    fontWeight: 500,
    marginTop: "2px",
  },
};
