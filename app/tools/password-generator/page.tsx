import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolBySlug } from "@/utils/tools";
import { PasswordGeneratorClient } from "./PasswordGeneratorClient";

const tool = getToolBySlug("password-generator")!;

export const metadata: Metadata = {
  title: tool.metaTitle || `${tool.name} | Toolbox`,
  description: tool.metaDescription || tool.description,
  keywords: ["password generator", "secure password", "random password", "strong password", "password creator"],
};

const seoContent = {
  whatIs: `<p>A password generator is a security tool that creates random, strong passwords that are difficult to guess or crack. Strong passwords are essential for protecting your online accounts from unauthorized access and cyber attacks.</p>
  <p>Our password generator creates cryptographically secure passwords using your browser's built-in random number generator. The passwords include:</p>
  <ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
    <li>Uppercase letters (A-Z)</li>
    <li>Lowercase letters (a-z)</li>
    <li>Numbers (0-9)</li>
    <li>Special symbols (!@#$%^&*)</li>
  </ul>`,
  howToUse: [
    "Select your desired password length (8-128 characters recommended)",
    "Choose which character types to include (uppercase, lowercase, numbers, symbols)",
    "Click 'Generate Password' to create a new password",
    "Review the password strength indicator",
    "Click the copy button to copy the password to your clipboard",
    "Generate again if you need a different password",
  ],
  faq: [
    {
      question: "Are the passwords truly random?",
      answer: "Yes, we use the Web Crypto API (crypto.getRandomValues) which provides cryptographically secure random numbers. This is the same technology used by banks and security software.",
    },
    {
      question: "Is my password stored anywhere?",
      answer: "No, your password is generated in your browser and never sent to any server. Once you close the page, the password is gone unless you've copied it.",
    },
    {
      question: "What length should my password be?",
      answer: "We recommend at least 12 characters for regular accounts and 16+ characters for sensitive accounts like banking or email. Longer passwords are exponentially harder to crack.",
    },
    {
      question: "Why include special characters?",
      answer: "Special characters significantly increase password complexity. Each additional character type multiplies the number of possible combinations, making brute-force attacks much more difficult.",
    },
  ],
};

export default function PasswordGeneratorPage() {
  return (
    <ToolLayout tool={tool} seoContent={seoContent}>
      <PasswordGeneratorClient />
    </ToolLayout>
  );
}
