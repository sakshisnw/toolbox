import {
  Scale, Cake, Percent, Landmark, TrendingUp,
  FileImage, Maximize2, RefreshCw, Eraser,
  Braces, AlignLeft, CaseSensitive, Lock, Link,
  FileDown, FileOutput, FilePlus2, Paperclip,
  KeyRound, QrCode, Fingerprint, User,
  Calculator, Image, Code2, FileText, Wand2,
  Search, Sun, Moon, Zap, Shield, Menu,
  ChevronDown, X,
  LucideProps,
} from "lucide-react";
import type { FC } from "react";

const iconMap: Record<string, FC<LucideProps>> = {
  // Calculators
  Scale, Cake, Percent, Landmark, TrendingUp,
  // Image
  FileImage, Maximize2, RefreshCw, Eraser,
  // Text / Dev
  Braces, AlignLeft, CaseSensitive, Lock, Link,
  // PDF
  FileDown, FileOutput, FilePlus2, Paperclip,
  // Generators
  KeyRound, QrCode, Fingerprint, User,
  // Category icons
  Calculator, Image, Code2, FileText, Wand2,
  // UI
  Search, Sun, Moon, Zap, Shield, Menu, ChevronDown, X,
};

interface ToolIconProps extends LucideProps {
  name: string;
}

export function ToolIcon({ name, ...props }: ToolIconProps) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon {...props} />;
}
