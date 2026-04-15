import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Free Online Tools for Images, PDFs & Developers",
  description: "Learn about Toolbox - your source for free online tools. We provide fast, secure, privacy-focused utilities for images, PDFs, calculations, and developers.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
        About Toolbox
      </h1>

      <div className="prose" style={{ color: "var(--text-muted)" }}>
        <p className="mb-4">
          Welcome to <strong style={{ color: "var(--text)" }}>Toolbox</strong> – your one-stop destination for 
          free, fast, and secure online tools. We believe everyone deserves access to powerful utilities 
          without compromising their privacy or dealing with intrusive advertisements.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          Our Mission
        </h2>
        <p className="mb-4">
          We created Toolbox to provide a better alternative to the cluttered, ad-heavy tool websites 
          that dominate search results. Our mission is simple: build genuinely useful tools that work 
          entirely in your browser, respect your privacy, and load instantly.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          What Makes Us Different
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong style={{ color: "var(--text)" }}>Privacy First:</strong> All processing happens client-side. Your files and data never leave your device.</li>
          <li><strong style={{ color: "var(--text)" }}>No Signup Required:</strong> Use any tool instantly without creating an account.</li>
          <li><strong style={{ color: "var(--text)" }}>Fast & Reliable:</strong> Our tools load quickly and work offline once loaded.</li>
          <li><strong style={{ color: "var(--text)" }}>Completely Free:</strong> All tools are free to use with no usage limits.</li>
          <li><strong style={{ color: "var(--text)" }}>Open Source Friendly:</strong> We believe in transparency and building in the open.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          Our Tools
        </h2>
        <p className="mb-4">
          We offer 20+ tools across multiple categories:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>🧮 <strong style={{ color: "var(--text)" }}>Calculators</strong> – BMI, Age, EMI, Percentage, and more</li>
          <li>🖼️ <strong style={{ color: "var(--text)" }}>Image Tools</strong> – Compress, resize, convert, and remove backgrounds</li>
          <li>💻 <strong style={{ color: "var(--text)" }}>Developer Tools</strong> – JSON formatter, Base64 encoder, URL encoder</li>
          <li>📄 <strong style={{ color: "var(--text)" }}>PDF Tools</strong> – Compress, merge, and convert PDFs</li>
          <li>⚙️ <strong style={{ color: "var(--text)" }}>Generators</strong> – Passwords, QR codes, UUIDs, and more</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          Contact Us
        </h2>
        <p className="mb-4">
          Have questions, suggestions, or found a bug? We&apos;d love to hear from you!
          Visit our <Link href="/contact" className="text-orange-500 hover:underline">Contact page</Link> to 
          get in touch with us.
        </p>

        <p className="mt-8 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
          Thank you for using Toolbox. We hope our tools help make your work easier and more efficient.
        </p>
      </div>
    </div>
  );
}
