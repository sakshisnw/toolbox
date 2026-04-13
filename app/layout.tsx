import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "Toolbox — Free Online Tools",
    template: "%s | Toolbox",
  },
  description:
    "Free online tools: BMI calculator, age calculator, EMI calculator, image compressor, resize image, and more.",
  keywords: [
    "online tools",
    "bmi calculator",
    "age calculator",
    "emi calculator",
    "image compressor",
    "resize image",
    "percentage calculator",
    "compound interest",
  ],
  openGraph: {
    type: "website",
    title: "Toolbox — Free Online Tools",
    description: "Fast, free, privacy-first online tools.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <footer className="py-10 text-center text-sm" style={{ color: "var(--text-muted)", borderTop: "1px solid var(--border)" }}>
            <p>Toolbox &copy; {new Date().getFullYear()} — Free tools, no tracking, no signup.</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
