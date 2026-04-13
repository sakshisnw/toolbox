"use client";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import { tools } from "@/utils/tools";

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        background: "color-mix(in srgb, var(--bg) 85%, transparent)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-lg font-bold gradient-text" style={{ fontFamily: "var(--font-display)" }}>
            ⚡ Toolbox
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {tools.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:text-orange-500"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-display)" }}
            >
              {t.shortName}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden w-8 h-8 rounded-lg flex flex-col items-center justify-center gap-1"
            style={{ background: "var(--bg-subtle)" }}
            onClick={() => setOpen((o) => !o)}
            aria-label="Open menu"
          >
            <span className="w-4 h-0.5 block" style={{ background: "var(--text)" }} />
            <span className="w-4 h-0.5 block" style={{ background: "var(--text)" }} />
            <span className="w-3 h-0.5 block" style={{ background: "var(--text)" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden border-t px-4 py-4 grid grid-cols-2 gap-2"
          style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
        >
          {tools.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{ background: "var(--bg-subtle)", color: "var(--text)" }}
            >
              <span>{t.icon}</span>
              <span style={{ fontFamily: "var(--font-display)" }}>{t.shortName}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
