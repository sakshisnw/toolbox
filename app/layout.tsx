import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Free Online Tools for Images, PDFs, Calculations & Developers",
    template: "%s | Toolbox",
  },
  description:
    "Free online tools for images, PDFs, calculations, and developers. Fast, secure, no signup required. 20+ privacy-focused utilities.",
  keywords: [
    "online tools",
    "free tools",
    "image compressor",
    "pdf compressor",
    "json formatter",
    "password generator",
    "bmi calculator",
    "age calculator",
    "emi calculator",
    "word counter",
    "qr code generator",
    "uuid generator",
  ],
  openGraph: {
    type: "website",
    title: "Free Online Tools for Images, PDFs, Calculations & Developers",
    description: "Fast, secure, no signup required. 20+ free online tools.",
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
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
