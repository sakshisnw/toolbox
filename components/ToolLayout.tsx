import Link from "next/link";
import {
  getToolBySlug,
  calculatorTools,
  imageTools,
  textTools,
  pdfTools,
  generatorTools,
  type Tool,
} from "@/utils/tools";

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

export function ToolLayout({
  tool,
  children,
  seoContent,
  relatedTools,
}: Props) {
  const getRelatedTools = () => {
    if (relatedTools) {
      return relatedTools
        .map((slug) => getToolBySlug(slug))
        .filter(Boolean) as Tool[];
    }
    const categoryMap: Record<string, Tool[]> = {
      calculator: calculatorTools,
      image: imageTools,
      text: textTools,
      pdf: pdfTools,
      generator: generatorTools,
    };
    const sameCategory = categoryMap[tool.category] || [];
    return sameCategory.filter((t) => t.slug !== tool.slug).slice(0, 3);
  };

  const related = getRelatedTools();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

      {/* Header */}
      <div className="mb-3">
        <h1
          className="text-2xl sm:text-3xl font-bold leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {tool.name}
        </h1>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {tool.description}
        </p>
      </div>

      {/* Tool UI */}
      <div
        className="rounded-xl p-5 mb-4"
        style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
        }}
      >
        {children}
      </div>

      {/* Privacy note */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 rounded-lg mb-10 text-[11px]"
        style={{
          background: "var(--bg-subtle)",
          border: "0.5px solid var(--border)",
          color: "var(--text-muted)",
        }}
      >
        <span className="text-sm flex-shrink-0">🔒</span>
        <span>
          <strong style={{ color: "var(--text)" }}>100% private.</strong>{" "}
          All processing happens in your browser — no data is ever sent to a server.
        </span>
      </div>

      {/* SEO Content */}
      {seoContent && (
        <div className="space-y-8">

          {seoContent.whatIs && (
            <section>
              <h2
                className="text-base font-semibold mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What is {tool.name}?
              </h2>
              <div
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
                dangerouslySetInnerHTML={{ __html: seoContent.whatIs }}
              />
            </section>
          )}

          {seoContent.formula && (
            <section>
              <h2
                className="text-base font-semibold mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Formula
              </h2>
              <div
                className="px-4 py-3 rounded-lg font-mono text-sm"
                style={{
                  background: "var(--bg-subtle)",
                  border: "0.5px solid var(--border)",
                  color: "var(--text)",
                }}
              >
                {seoContent.formula}
              </div>
            </section>
          )}

          {/* How to Use — 2×3 grid */}
          {seoContent.howToUse && seoContent.howToUse.length > 0 && (
            <section>
              <h2
                className="text-base font-semibold mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                How to use
              </h2>
              <ol
                className="grid grid-cols-1 sm:grid-cols-2 list-none p-0 m-0 overflow-hidden rounded-xl"
                style={{
                  gap: "0.5px",
                  background: "var(--border)",
                  border: "0.5px solid var(--border)",
                }}
              >
                {seoContent.howToUse.map((step, i) => (
                  <li
                    key={i}
                    className="flex gap-3 p-4"
                    style={{ background: "var(--bg-card)" }}
                  >
                    <span
                      className="text-[11px] font-medium flex-shrink-0 pt-0.5"
                      style={{ color: "var(--text-muted)", minWidth: 20 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <div
                        className="h-0.5 w-6 rounded-full"
                        style={{ background: "var(--border)" }}
                      />
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {step}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Examples — 2×2 grid */}
          {seoContent.examples && seoContent.examples.length > 0 && (
            <section>
              <h2
                className="text-base font-semibold mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Examples
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {seoContent.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl flex flex-col gap-3"
                    style={{
                      background: "var(--bg-subtle)",
                      border: "0.5px solid var(--border)",
                    }}
                  >
                    <div>
                      <span
                        className="text-[10px] uppercase tracking-wider"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Input
                      </span>
                      <p
                        className="font-mono text-xs mt-1 p-2 rounded-lg"
                        style={{
                          background: "var(--bg-card)",
                          border: "0.5px solid var(--border)",
                          color: "var(--text)",
                          wordBreak: "break-all",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {ex.input}
                      </p>
                    </div>
                    <div>
                      <span
                        className="text-[10px] uppercase tracking-wider"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Output
                      </span>
                      <p
                        className="font-mono text-xs mt-1 p-2 rounded-lg"
                        style={{
                          background: "var(--bg-card)",
                          border: "0.5px solid var(--border)",
                          color: tool.color,
                          wordBreak: "break-all",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {ex.output}
                      </p>
                    </div>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {ex.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {seoContent.faq && seoContent.faq.length > 0 && (
            <section>
              <h2
                className="text-base font-semibold mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Frequently asked questions
              </h2>
              <div style={{ borderTop: "0.5px solid var(--border)" }}>
                {seoContent.faq.map((item, i) => (
                  <details
                    key={i}
                    className="group"
                    style={{ borderBottom: "0.5px solid var(--border)" }}
                  >
                    <summary
                      className="flex items-center justify-between cursor-pointer text-sm py-3 gap-2"
                      style={{ color: "var(--text)" }}
                    >
                      <span>{item.question}</span>
                      <span
                        className="text-xs transition-transform group-open:rotate-90 flex-shrink-0"
                        style={{ color: "var(--text-muted)" }}
                      >
                        ›
                      </span>
                    </summary>
                    <p
                      className="text-sm pb-4 leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Related tools */}
      {related.length > 0 && (
        <section
          className="mt-10 pt-6"
          style={{ borderTop: "0.5px solid var(--border)" }}
        >
          <p
            className="text-[10px] tracking-widest mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            RELATED TOOLS
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {related.map((t) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-orange-50 dark:hover:bg-orange-900/10"
                style={{
                  background: "var(--bg-subtle)",
                  border: "0.5px solid var(--border)",
                }}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                  style={{
                    background: `color-mix(in srgb, ${t.color} 12%, transparent)`,
                  }}
                >
                  {t.icon}
                </span>
                <div className="min-w-0">
                  <p
                    className="text-xs font-medium leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-[10px] mt-0.5 truncate"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t.description}
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