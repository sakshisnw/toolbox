import Link from "next/link";
import { calculatorTools, imageTools, textTools, pdfTools, generatorTools } from "@/utils/tools";

const footerLinks = {
  tools: [
    { name: "Calculators", items: calculatorTools.slice(0, 4) },
    { name: "Image Tools", items: imageTools.slice(0, 4) },
    { name: "Developer Tools", items: textTools.slice(0, 4) },
    { name: "Generators", items: generatorTools.slice(0, 4) },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Disclaimer", href: "/disclaimer" },
  ],
};

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-lg font-bold gradient-text" style={{ fontFamily: "var(--font-display)" }}>
                ⚡ Toolbox
              </span>
            </Link>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Free online tools for images, PDFs, calculations, and developers. 
              Fast, secure, no signup required.
            </p>
            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }} />
              <span>All systems operational</span>
            </div>
          </div>

          {/* Tools by Category */}
          {footerLinks.tools.slice(0, 2).map((category) => (
            <div key={category.name}>
              <h3 className="font-semibold text-sm mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {category.name}
              </h3>
              <ul className="space-y-2">
                {category.items.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="text-sm transition-colors hover:text-orange-500"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-orange-500"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-orange-500"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              © {new Date().getFullYear()} Toolbox. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                href="/privacy-policy" 
                className="text-xs transition-colors hover:text-orange-500"
                style={{ color: "var(--text-muted)" }}
              >
                Privacy
              </Link>
              <Link 
                href="/terms" 
                className="text-xs transition-colors hover:text-orange-500"
                style={{ color: "var(--text-muted)" }}
              >
                Terms
              </Link>
              <Link 
                href="/contact" 
                className="text-xs transition-colors hover:text-orange-500"
                style={{ color: "var(--text-muted)" }}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
