import Link from "next/link";
import { getToolBySlug, tools, calculatorTools, imageTools, textTools, pdfTools, generatorTools, type Tool } from "@/utils/tools";

interface SEOContent {
  whatIs?: string;
  howToUse?: string[];
  formula?: string;
  examples?: { input: string; output: string; explanation: string }[];
  faq?: { question: string; answer: string }[];
}

interface Props {
  tool: Tool;
  children: React.ReactNode;
  seoContent?: SEOContent;
  relatedTools?: string[];
}

const categoryLabels: Record<string, string> = {
  calculator: "Calculator",
  image: "Image Tool",
  text: "Developer Tool",
  pdf: "PDF Tool",
  generator: "Generator",
  converter: "Converter",
};

export function ToolLayout({ tool, children, seoContent, relatedTools }: Props) {
  // Get related tools from same category if not specified
  const getRelatedTools = () => {
    if (relatedTools) {
      return relatedTools.map(slug => getToolBySlug(slug)).filter(Boolean) as Tool[];
    }
    
    const categoryMap: Record<string, Tool[]> = {
      calculator: calculatorTools,
      image: imageTools,
      text: textTools,
      pdf: pdfTools,
      generator: generatorTools,
    };
    
    const sameCategory = categoryMap[tool.category] || [];
    return sameCategory.filter(t => t.slug !== tool.slug).slice(0, 3);
  };

  const related = getRelatedTools();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-6 text-xs" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="hover:text-orange-500 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
          Home
        </Link>
        <span>/</span>
        <Link href="/" className="hover:text-orange-500 transition-colors capitalize" style={{ fontFamily: "var(--font-display)" }}>
          {tool.category} Tools
        </Link>
        <span>/</span>
        <span style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>{tool.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: `color-mix(in srgb, ${tool.color} 15%, transparent)` }}
          >
            {tool.icon}
          </span>
          <span 
            className="text-xs px-3 py-1 rounded-full font-medium"
            style={{ 
              background: `color-mix(in srgb, ${tool.color} 15%, var(--bg-subtle))`,
              color: tool.color 
            }}
          >
            {categoryLabels[tool.category]}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>
          {tool.name}
        </h1>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {tool.description}
        </p>
      </div>

      {/* Tool content */}
      <div className="mb-12">
        {children}
      </div>

      {/* Privacy note */}
      <div
        className="mb-12 px-4 py-3 rounded-xl text-sm flex items-center gap-3"
        style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)" }}
      >
        <span className="text-xl">🔒</span>
        <span style={{ color: "var(--text-muted)" }}>
          <strong style={{ color: "var(--text)" }}>100% private:</strong> All processing happens{" "}
          entirely in your browser — no data is sent to any server.
        </span>
      </div>

      {/* SEO Content Section */}
      {seoContent && (
        <div className="space-y-8">
          {/* What is section */}
          {seoContent.whatIs && (
            <section className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                What is {tool.name}?
              </h2>
              <div 
                className="text-sm leading-relaxed space-y-3"
                style={{ color: "var(--text-muted)" }}
                dangerouslySetInnerHTML={{ __html: seoContent.whatIs }}
              />
            </section>
          )}

          {/* Formula section */}
          {seoContent.formula && (
            <section className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Formula
              </h2>
              <div 
                className="p-4 rounded-lg font-mono text-sm"
                style={{ background: "var(--bg-subtle)" }}
              >
                {seoContent.formula}
              </div>
            </section>
          )}

          {/* How to Use */}
          {seoContent.howToUse && seoContent.howToUse.length > 0 && (
            <section className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                How to Use
              </h2>
              <ol className="space-y-3">
                {seoContent.howToUse.map((step, index) => (
                  <li key={index} className="flex gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                    <span 
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-medium"
                      style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                    >
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Examples */}
          {seoContent.examples && seoContent.examples.length > 0 && (
            <section className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Examples
              </h2>
              <div className="space-y-4">
                {seoContent.examples.map((example, index) => (
                  <div key={index} className="p-4 rounded-xl" style={{ background: "var(--bg-subtle)" }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                      <div>
                        <span className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Input:</span>
                        <p className="font-mono text-sm mt-1">{example.input}</p>
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Output:</span>
                        <p className="font-mono text-sm mt-1" style={{ color: "var(--accent)" }}>{example.output}</p>
                      </div>
                    </div>
                    <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>{example.explanation}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          {seoContent.faq && seoContent.faq.length > 0 && (
            <section className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {seoContent.faq.map((item, index) => (
                  <details key={index} className="group">
                    <summary 
                      className="flex items-center justify-between cursor-pointer text-sm font-medium py-2"
                      style={{ color: "var(--text)" }}
                    >
                      {item.question}
                      <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <p className="text-sm mt-2 pl-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Related Tools */}
      {related.length > 0 && (
        <section className="mt-12 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
          <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Related Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map(relatedTool => (
              <Link
                key={relatedTool.slug}
                href={`/tools/${relatedTool.slug}`}
                className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-orange-50 dark:hover:bg-orange-900/20"
                style={{ background: "var(--bg-subtle)" }}
              >
                <span
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `color-mix(in srgb, ${relatedTool.color} 15%, transparent)` }}
                >
                  {relatedTool.icon}
                </span>
                <div>
                  <p className="font-medium text-sm" style={{ fontFamily: "var(--font-display)" }}>
                    {relatedTool.name}
                  </p>
                  <p className="text-xs line-clamp-1" style={{ color: "var(--text-muted)" }}>
                    {relatedTool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
