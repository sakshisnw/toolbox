import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-6 py-24 text-center">
      <div className="text-6xl mb-6">🔧</div>
      <h1 className="text-4xl font-extrabold mb-3" style={{ fontFamily: "var(--font-display)" }}>
        404
      </h1>
      <p className="mb-8" style={{ color: "var(--text-muted)" }}>
        That page doesn&apos;t exist. Head back to the toolbox.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm"
        style={{ background: "var(--accent)", color: "white", fontFamily: "var(--font-display)" }}
      >
        ← Back to Toolbox
      </Link>
    </div>
  );
}
