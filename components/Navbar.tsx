"use client";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useState, useRef, useEffect } from "react";
import { calculatorTools, imageTools, textTools, pdfTools, generatorTools, tools } from "@/utils/tools";
import {
  Search, Sun, Moon, Menu, X, ChevronDown,
  Calculator, ImageIcon, Code2, FileText, Wand2,
  Zap,
} from "lucide-react";
import { ToolIcon } from "./ToolIcon";

const categories = [
  { id: "calculators", name: "Calculators",    tools: calculatorTools,  Icon: Calculator },
  { id: "image",       name: "Image Tools",    tools: imageTools,       Icon: ImageIcon  },
  { id: "text",        name: "Developer Tools",tools: textTools,        Icon: Code2      },
  { id: "pdf",         name: "PDF Tools",      tools: pdfTools,         Icon: FileText   },
  { id: "generators",  name: "Generators",     tools: generatorTools,   Icon: Wand2      },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setActiveDropdown(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredTools = searchQuery.length > 0
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <>
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
            <span className="inline-flex items-center gap-1.5">
              <Zap size={16} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
              Toolbox
            </span>
          </span>
          </Link>

          {/* Desktop nav with dropdowns */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1">
            {categories.map((cat) => (
              <div key={cat.id} className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === cat.id ? null : cat.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                  style={{ color: "var(--text-muted)", fontFamily: "var(--font-display)" }}
                >
                  <cat.Icon size={13} strokeWidth={2} />
                  {cat.name}
                  <ChevronDown size={11} className={`transition-transform ${activeDropdown === cat.id ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown */}
                {activeDropdown === cat.id && (
                  <div
                    className="absolute top-full left-0 mt-1 w-56 rounded-xl border shadow-lg overflow-hidden"
                    style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                  >
                    <div className="p-2">
                      <div className="text-xs font-medium px-2 py-1 mb-1 flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                        <cat.Icon size={12} strokeWidth={2} /> {cat.name}
                      </div>
                      {cat.tools.slice(0, 6).map((tool) => (
                        <Link
                          key={tool.slug}
                          href={`/tools/${tool.slug}`}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-colors"
                          style={{ color: "var(--text)" }}
                        >
                          <span
                            className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                            style={{ background: `color-mix(in srgb, ${tool.color} 15%, transparent)` }}
                          >
                            <ToolIcon name={tool.icon} size={13} color={tool.color} strokeWidth={2} />
                          </span>
                          <span style={{ fontFamily: "var(--font-display)" }}>{tool.shortName}</span>
                        </Link>
                      ))}
                      <Link
                        href="/"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-2 px-2 py-2 rounded-lg text-xs mt-1"
                        style={{ color: "var(--accent)", borderTop: "1px solid var(--border)" }}
                      >
                        View all {cat.tools.length} tools →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors"
              style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
            >
              <Search size={13} strokeWidth={2} />
              <span>Search</span>
              <span className="px-1.5 py-0.5 rounded text-xs" style={{ background: "var(--border)" }}>⌘K</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-8 h-8 rounded-lg flex flex-col items-center justify-center gap-1"
              style={{ background: "var(--bg-subtle)" }}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Open menu"
            >
              {mobileOpen
                ? <X size={16} strokeWidth={2} style={{ color: "var(--text)" }} />
                : <Menu size={16} strokeWidth={2} style={{ color: "var(--text)" }} />
              }
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t px-4 py-4"
            style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
          >
            {categories.map((cat) => (
              <div key={cat.id} className="mb-4">
                <div className="flex items-center gap-2 text-xs font-medium mb-2 px-2" style={{ color: "var(--text-muted)" }}>
                  <cat.Icon size={13} strokeWidth={2} />
                  <span>{cat.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {cat.tools.slice(0, 6).map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                      style={{ background: "var(--bg-subtle)", color: "var(--text)" }}
                    >
                      <ToolIcon name={tool.icon} size={14} color={tool.color} strokeWidth={2} />
                      <span>{tool.shortName}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setSearchOpen(false)}
        >
          <div 
            className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "var(--bg-card)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
                <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools..."
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 rounded-xl border"
                  style={{ background: "var(--bg-subtle)", borderColor: "var(--border)", color: "var(--text)" }}
                />
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded" style={{ background: "var(--border)" }}>
                  ESC
                </span>
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                  >
                    <span 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `color-mix(in srgb, ${tool.color} 15%, transparent)` }}
                    >
                      <ToolIcon name={tool.icon} size={18} color={tool.color} strokeWidth={1.8} />
                    </span>
                    <div className="flex-1">
                      <p className="font-medium" style={{ fontFamily: "var(--font-display)" }}>{tool.name}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{tool.description}</p>
                    </div>
                  </Link>
                ))
              ) : searchQuery ? (
                <div className="p-8 text-center">
                  <p style={{ color: "var(--text-muted)" }}>No tools found for &quot;{searchQuery}&quot;</p>
                </div>
              ) : (
                <div className="p-4">
                  <p className="text-xs font-medium mb-3 px-2" style={{ color: "var(--text-muted)" }}>Popular Tools</p>
                  <div className="grid grid-cols-2 gap-2">
                    {tools.slice(0, 6).map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                        style={{ background: "var(--bg-subtle)" }}
                      >
                        <span>{tool.icon}</span>
                        <span>{tool.shortName}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
