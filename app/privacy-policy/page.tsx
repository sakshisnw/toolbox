import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Toolbox - Free Online Tools",
  description: "Our privacy policy explains how Toolbox handles your data. All tools run client-side - your files and data never leave your device.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
        Privacy Policy
      </h1>

      <div className="prose" style={{ color: "var(--text-muted)" }}>
        <p className="mb-4">
          <strong>Last updated:</strong> January 2026
        </p>

        <div 
          className="p-4 rounded-xl mb-8"
          style={{ background: "var(--accent-light)", border: "1px solid var(--accent)" }}
        >
          <p className="font-medium" style={{ color: "var(--accent)" }}>
            🔒 Key Point: All our tools run entirely in your browser. Your files and data are 
            never sent to or stored on any server.
          </p>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          Information We Collect
        </h2>
        <p className="mb-4">
          We do not collect any personal information. Specifically:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>We do not store files you process with our tools</li>
          <li>We do not track your usage or activities</li>
          <li>We do not require account creation</li>
          <li>We do not use cookies for tracking</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          How Our Tools Work
        </h2>
        <p className="mb-4">
          All our tools use client-side processing. This means:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Image processing happens in your browser using JavaScript</li>
          <li>PDF manipulation is done locally on your device</li>
          <li>Calculations and conversions run entirely on your machine</li>
          <li>No data is transmitted to our servers or any third parties</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          Analytics
        </h2>
        <p className="mb-4">
          We may use privacy-focused analytics to understand how our tools are used. This helps 
          us improve our services. Any analytics we use:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Does not use cookies</li>
          <li>Does not track individual users</li>
          <li>Does not collect personal information</li>
          <li>Only collects anonymous, aggregated data</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          Third-Party Services
        </h2>
        <p className="mb-4">
          Our website may use the following third-party services:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Hosting providers (for serving the website)</li>
          <li>CDN services (for faster content delivery)</li>
        </ul>
        <p className="mb-4">
          These services may have access to basic technical information (like your IP address) 
          necessary to serve the website, but do not have access to any files or data you process 
          with our tools.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          Data Security
        </h2>
        <p className="mb-4">
          Since all processing happens in your browser, your data security is in your hands:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Your files never leave your device</li>
          <li>No data is stored on our servers</li>
          <li>We use HTTPS to secure the connection between your browser and our servers</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          Children&apos;s Privacy
        </h2>
        <p className="mb-4">
          Our services are not directed to children under 13. We do not knowingly collect 
          personal information from children under 13.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          Changes to This Policy
        </h2>
        <p className="mb-4">
          We may update this privacy policy from time to time. Any changes will be posted on 
          this page with an updated revision date.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          Contact Us
        </h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us through our 
          contact page.
        </p>
      </div>
    </div>
  );
}
