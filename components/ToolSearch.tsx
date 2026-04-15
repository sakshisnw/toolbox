"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { tools } from "@/utils/tools";

export function ToolSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredTools = query.length > 0
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase()) ||
          t.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.length > 0);
          }}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          placeholder="Search tools..."
          className="w-full px-4 py-3 pl-10 pr-16 rounded-xl border text-sm"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">🔍</span>
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded"
          style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
        >
          Ctrl+K
        </span>
      </div>

      {isOpen && filteredTools.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-xl border overflow-hidden shadow-lg z-50"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          {filteredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
            >
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: `color-mix(in srgb, ${tool.color} 15%, transparent)` }}
              >
                {tool.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate" style={{ fontFamily: "var(--font-display)" }}>
                  {tool.name}
                </p>
                <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                  {tool.description}
                </p>
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: `color-mix(in srgb, ${tool.color} 15%, var(--bg-subtle))`,
                  color: tool.color,
                }}
              >
                {tool.category}
              </span>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.length > 0 && filteredTools.length === 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-xl border p-4 text-center"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            No tools found for "{query}"
          </p>
        </div>
      )}
    </div>
  );
}
