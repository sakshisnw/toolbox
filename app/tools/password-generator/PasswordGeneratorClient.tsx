"use client";

import { useState, useCallback } from "react";
import { CopyButton } from "@/components/CopyButton";

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function generatePassword(length: number, useUpper: boolean, useLower: boolean, useNumbers: boolean, useSymbols: boolean): string {
  let charset = "";
  if (useUpper) charset += UPPERCASE;
  if (useLower) charset += LOWERCASE;
  if (useNumbers) charset += NUMBERS;
  if (useSymbols) charset += SYMBOLS;

  if (charset === "") return "";

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }

  return password;
}

function calculateStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#16a34a", "#15803d"];
  
  const index = Math.min(Math.floor(score / 1.5), 5);
  return { score, label: labels[index], color: colors[index] };
}

export function PasswordGeneratorClient() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  const generate = useCallback(() => {
    const newPassword = generatePassword(length, useUpper, useLower, useNumbers, useSymbols);
    setPassword(newPassword);
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  const strength = password ? calculateStrength(password) : null;

  return (
    <div className="space-y-6">
      {/* Generated Password Display */}
      <div className="p-6 rounded-2xl" style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Generated Password</span>
          {password && <CopyButton text={password} label="Copy Password" />}
        </div>
        <div
          className="p-4 rounded-xl font-mono text-lg break-all text-center"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text)" }}
        >
          {password || "Click Generate to create a password"}
        </div>
        {strength && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>Strength</span>
              <span className="text-sm font-medium" style={{ color: strength.color }}>{strength.label}</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${(strength.score / 7) * 100}%`, background: strength.color }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h3 className="font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>Options</h3>
        
        {/* Length */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm" style={{ color: "var(--text-muted)" }}>Password Length</label>
            <span className="font-bold" style={{ color: "var(--accent)" }}>{length}</span>
          </div>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            <span>4</span>
            <span>32</span>
            <span>64</span>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Uppercase (A-Z)", checked: useUpper, onChange: setUseUpper },
            { label: "Lowercase (a-z)", checked: useLower, onChange: setUseLower },
            { label: "Numbers (0-9)", checked: useNumbers, onChange: setUseNumbers },
            { label: "Symbols (!@#$%)", checked: useSymbols, onChange: setUseSymbols },
          ].map(({ label, checked, onChange }) => (
            <label
              key={label}
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors"
              style={{ background: "var(--bg-subtle)" }}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generate}
        className="w-full py-4 rounded-xl text-lg font-semibold transition-transform active:scale-[0.98]"
        style={{ background: "var(--accent)", color: "white", fontFamily: "var(--font-display)" }}
      >
        🎲 Generate Password
      </button>
    </div>
  );
}
