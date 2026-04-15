"use client";

import { useState, useMemo } from "react";
import { CopyButton } from "@/components/CopyButton";

interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTime: string;
  speakingTime: string;
}

function calculateStats(text: string): TextStats {
  const trimmed = text.trim();
  
  if (!trimmed) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: "0 min",
      speakingTime: "0 min",
    };
  }

  const words = trimmed.split(/\s+/).filter(w => w.length > 0).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = trimmed.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
  
  const readingMinutes = Math.ceil(words / 200);
  const speakingMinutes = Math.ceil(words / 130);

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingTime: readingMinutes < 1 ? "< 1 min" : `${readingMinutes} min`,
    speakingTime: speakingMinutes < 1 ? "< 1 min" : `${speakingMinutes} min`,
  };
}

export function WordCounterClient() {
  const [text, setText] = useState("");
  const stats = useMemo(() => calculateStats(text), [text]);

  const clearText = () => setText("");

  const StatCard = ({ label, value, subvalue }: { label: string; value: number | string; subvalue?: string }) => (
    <div className="p-4 rounded-xl" style={{ background: "var(--bg-subtle)" }}>
      <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
        {label}
      </p>
      <p className="text-2xl font-bold" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {subvalue && (
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          {subvalue}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Words" value={stats.words} />
        <StatCard label="Characters" value={stats.characters} subvalue={`${stats.charactersNoSpaces} no spaces`} />
        <StatCard label="Sentences" value={stats.sentences} />
        <StatCard label="Paragraphs" value={stats.paragraphs} />
      </div>

      {/* Time Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl flex items-center gap-3" style={{ background: "var(--accent-light)" }}>
          <span className="text-2xl">📖</span>
          <div>
            <p className="text-xs" style={{ color: "var(--accent)" }}>Reading Time</p>
            <p className="font-bold" style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}>
              {stats.readingTime}
            </p>
          </div>
        </div>
        <div className="p-3 rounded-xl flex items-center gap-3" style={{ background: "var(--accent-light)" }}>
          <span className="text-2xl">🎤</span>
          <div>
            <p className="text-xs" style={{ color: "var(--accent)" }}>Speaking Time</p>
            <p className="font-bold" style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}>
              {stats.speakingTime}
            </p>
          </div>
        </div>
      </div>

      {/* Text Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            Your Text
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
          className="w-full h-64 p-4 rounded-xl border text-sm resize-y focus:outline-none focus:ring-2"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
