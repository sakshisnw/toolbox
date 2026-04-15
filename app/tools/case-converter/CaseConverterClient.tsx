"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

const converters = [
  {
    id: "upper",
    label: "UPPERCASE",
    description: "ALL LETTERS CAPITALIZED",
    convert: (text: string) => text.toUpperCase(),
  },
  {
    id: "lower",
    label: "lowercase",
    description: "all letters small case",
    convert: (text: string) => text.toLowerCase(),
  },
  {
    id: "title",
    label: "Title Case",
    description: "First Letter Of Each Word",
    convert: (text: string) =>
      text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
  },
  {
    id: "sentence",
    label: "Sentence case",
    description: "First letter capitalized.",
    convert: (text: string) =>
      text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
  },
  {
    id: "camel",
    label: "camelCase",
    description: "firstWordLowercaseRestCapitalized",
    convert: (text: string) =>
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase()),
  },
  {
    id: "snake",
    label: "snake_case",
    description: "lowercase_with_underscores",
    convert: (text: string) =>
      text
        .trim()
        .replace(/\s+/g, "_")
        .toLowerCase(),
  },
  {
    id: "kebab",
    label: "kebab-case",
    description: "lowercase-with-hyphens",
    convert: (text: string) =>
      text
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase(),
  },
  {
    id: "alternating",
    label: "aLtErNaTiNg",
    description: "AlTeRnAtInG cAsE",
    convert: (text: string) =>
      text
        .split("")
        .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
        .join(""),
  },
];

export function CaseConverterClient() {
  const [text, setText] = useState("The Quick Brown Fox");

  const clearText = () => setText("");

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            Input Text
          </label>
          <div className="flex gap-2">
            <CopyButton text={text} label="Copy" />
            <button
              onClick={clearText}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              style={{ background: "var(--bg-subtle)", color: "var(--text)", border: "1px solid var(--border)" }}
            >
              🗑️ Clear
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full h-24 p-4 rounded-xl border text-sm resize-y focus:outline-none"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
          spellCheck={false}
        />
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 gap-4">
        {converters.map(({ id, label, description, convert }) => {
          const result = convert(text);
          return (
            <div
              key={id}
              className="p-4 rounded-xl"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
                      {label}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {description}
                    </span>
                  </div>
                  <p className="font-mono text-sm break-all" style={{ color: "var(--text)" }}>
                    {result || <em style={{ color: "var(--text-muted)" }}>(empty)</em>}
                  </p>
                </div>
                <CopyButton text={result} label="Copy" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
