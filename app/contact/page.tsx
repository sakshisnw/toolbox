import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Toolbox - Free Online Tools",
  description: "Get in touch with the Toolbox team. Send us your questions, feedback, or suggestions for new tools.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
        Contact Us
      </h1>

      <div className="prose" style={{ color: "var(--text-muted)" }}>
        <p className="mb-6">
          We&apos;d love to hear from you! Whether you have a question about our tools, 
          want to suggest a new feature, found a bug, or just want to say hello.
        </p>

        <div 
          className="p-6 rounded-2xl mb-8"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
            How Can We Help?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl" style={{ background: "var(--bg-subtle)" }}>
              <span className="text-2xl mb-2 block">🐛</span>
              <h3 className="font-semibold mb-1" style={{ color: "var(--text)" }}>
                Report a Bug
              </h3>
              <p className="text-sm">
                Found something not working correctly? Let us know so we can fix it.
              </p>
            </div>

            <div className="p-4 rounded-xl" style={{ background: "var(--bg-subtle)" }}>
              <span className="text-2xl mb-2 block">💡</span>
              <h3 className="font-semibold mb-1" style={{ color: "var(--text)" }}>
                Suggest a Tool
              </h3>
              <p className="text-sm">
                Have an idea for a new tool? We&apos;re always looking to expand our collection.
              </p>
            </div>

            <div className="p-4 rounded-xl" style={{ background: "var(--bg-subtle)" }}>
              <span className="text-2xl mb-2 block">⭐</span>
              <h3 className="font-semibold mb-1" style={{ color: "var(--text)" }}>
                Share Feedback
              </h3>
              <p className="text-sm">
                Tell us what you like or how we can improve. Your feedback matters!
              </p>
            </div>

            <div className="p-4 rounded-xl" style={{ background: "var(--bg-subtle)" }}>
              <span className="text-2xl mb-2 block">🤝</span>
              <h3 className="font-semibold mb-1" style={{ color: "var(--text)" }}>
                Business Inquiries
              </h3>
              <p className="text-sm">
                Interested in partnerships or collaborations? Reach out to us.
              </p>
            </div>
          </div>
        </div>

        <div 
          className="p-6 rounded-2xl"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
            Get in Touch
          </h2>
          
          <p className="mb-4">
            While we currently don&apos;t have a contact form (we&apos;re working on it!), 
            here are the ways you can reach us:
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                style={{ background: "var(--accent-light)" }}
              >
                📧
              </span>
              <div>
                <p className="font-medium" style={{ color: "var(--text)" }}>Email</p>
                <p className="text-sm">contact@toolbox.example.com (placeholder)</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                style={{ background: "var(--accent-light)" }}
              >
                🐙
              </span>
              <div>
                <p className="font-medium" style={{ color: "var(--text)" }}>GitHub</p>
                <p className="text-sm">github.com/toolbox/tools (placeholder)</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                style={{ background: "var(--accent-light)" }}
              >
                🐦
              </span>
              <div>
                <p className="font-medium" style={{ color: "var(--text)" }}>Twitter/X</p>
                <p className="text-sm">@toolbox_tools (placeholder)</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center">
          We typically respond within 24-48 hours. Thank you for reaching out!
        </p>
      </div>
    </div>
  );
}
