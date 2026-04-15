import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Toolbox - Free Online Tools",
  description: "Read our Terms of Service to understand the rules and guidelines for using Toolbox free online tools.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
        Terms of Service
      </h1>

      <div className="prose" style={{ color: "var(--text-muted)" }}>
        <p className="mb-4">
          <strong>Last updated:</strong> January 2026
        </p>

        <p className="mb-4">
          Please read these Terms of Service (&quot;Terms&quot;) carefully before using Toolbox 
          (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing or using our website, you agree to be bound by these Terms.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          1. Acceptance of Terms
        </h2>
        <p className="mb-4">
          By accessing or using our tools, you agree to these Terms of Service and our Privacy Policy. 
          If you disagree with any part of the terms, you may not access the service.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          2. Use of Our Tools
        </h2>
        <p className="mb-4">
          Our tools are provided free of charge for personal and commercial use. You may:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Use the tools for any legal purpose</li>
          <li>Process any files you have the right to process</li>
          <li>Use the tools in personal and commercial projects</li>
        </ul>
        <p className="mb-4">
          You may not:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Use our tools for any illegal purposes</li>
          <li>Attempt to abuse, hack, or disrupt our services</li>
          <li>Use automated means to access our tools in a way that puts excessive load on our servers</li>
          <li>Redistribute or sell our tools as your own</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          3. Disclaimer of Warranties
        </h2>
        <p className="mb-4">
          Our tools are provided &quot;as is&quot; without any warranty of any kind, either express or implied. 
          We do not warrant that:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>The tools will meet your specific requirements</li>
          <li>The tools will be uninterrupted, timely, secure, or error-free</li>
          <li>The results from using the tools will be accurate or reliable</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          4. Limitation of Liability
        </h2>
        <p className="mb-4">
          In no event shall Toolbox, its creators, or contributors be liable for any direct, 
          indirect, incidental, special, consequential, or punitive damages arising out of or 
          related to your use of our tools.
        </p>
        <p className="mb-4">
          This includes, but is not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Loss of data or files</li>
          <li>Business interruption</li>
          <li>Any other commercial damages or losses</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          5. Intellectual Property
        </h2>
        <p className="mb-4">
          The content, organization, graphics, design, and other matters related to our website 
          are protected under applicable copyrights and other proprietary laws. You may not 
          copy, modify, or distribute our website code or design without permission.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          6. Your Content
        </h2>
        <p className="mb-4">
          You retain all rights to any content you process using our tools. Since all processing 
          happens client-side in your browser, we never have access to your files or data.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          7. Modifications to Service
        </h2>
        <p className="mb-4">
          We reserve the right to modify or discontinue, temporarily or permanently, the 
          service (or any part thereof) with or without notice at any time.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          8. Governing Law
        </h2>
        <p className="mb-4">
          These Terms shall be governed by and construed in accordance with the laws applicable 
          in your jurisdiction, without regard to its conflict of law provisions.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          9. Changes to Terms
        </h2>
        <p className="mb-4">
          We reserve the right to update or change these Terms of Service at any time. We will 
          notify users of any changes by posting the new Terms on this page.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          10. Contact Information
        </h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us through our contact page.
        </p>
      </div>
    </div>
  );
}
