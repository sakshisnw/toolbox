import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Toolbox - Free Online Tools",
  description: "Read our disclaimer regarding the use of free online tools provided by Toolbox.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
        Disclaimer
      </h1>

      <div className="prose" style={{ color: "var(--text-muted)" }}>
        <p className="mb-4">
          <strong>Last updated:</strong> January 2026
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          General Disclaimer
        </h2>
        <p className="mb-4">
          The information and tools provided on Toolbox are for general informational purposes 
          only. While we strive to provide accurate and reliable tools, we make no representations 
          or warranties of any kind, express or implied, about the completeness, accuracy, 
          reliability, suitability, or availability of our tools or the information they produce.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          Calculator Tools Disclaimer
        </h2>
        <p className="mb-4">
          Our calculator tools (including but not limited to BMI calculator, EMI calculator, 
          and financial calculators) are provided for estimation purposes only:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Results should not be considered professional financial or medical advice</li>
          <li>Always consult with qualified professionals before making important decisions</li>
          <li>We are not responsible for any actions taken based on calculator results</li>
          <li>Actual results may vary from calculated estimates</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          Image & File Processing Tools
        </h2>
        <p className="mb-4">
          For our image and file processing tools:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>We are not responsible for any loss or corruption of files</li>
          <li>Always keep backups of important files before processing</li>
          <li>Results may vary depending on the input file format and quality</li>
          <li>We do not store or have access to your files</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          Security Tools
        </h2>
        <p className="mb-4">
          Regarding our security tools (password generators, etc.):
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Generated passwords are created using browser-based randomization</li>
          <li>We recommend reviewing generated passwords before use</li>
          <li>Always follow your organization&apos;s security policies</li>
          <li>Use at your own risk and discretion</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          External Links
        </h2>
        <p className="mb-4">
          Our website may contain links to external websites. We have no control over the content 
          and nature of these sites. The inclusion of any links does not necessarily imply a 
          recommendation or endorsement of the views expressed within them.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          No Liability
        </h2>
        <p className="mb-4">
          In no event will we be liable for any loss or damage including without limitation, 
          indirect or consequential loss or damage, or any loss or damage whatsoever arising 
          from loss of data or profits arising out of, or in connection with, the use of this 
          website and our tools.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          Consent
        </h2>
        <p className="mb-4">
          By using our website and tools, you hereby consent to our disclaimer and agree to its terms.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
          Updates
        </h2>
        <p className="mb-4">
          Should we update, amend, or make any changes to this document, those changes will be 
          prominently posted here.
        </p>
      </div>
    </div>
  );
}
