# ⚡ Toolbox — Free Online Tools

A production-ready, responsive multi-tool web application built with **Next.js 14 (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**.

---

## 🗂 Folder Structure

```
toolbox/
├── app/
│   ├── layout.tsx                  # Root layout with Navbar, ThemeProvider
│   ├── page.tsx                    # Homepage — grid of all tools
│   ├── not-found.tsx               # 404 page
│   ├── bmi-calculator/
│   │   ├── page.tsx
│   │   └── BMIClient.tsx
│   ├── age-calculator/
│   │   ├── page.tsx
│   │   └── AgeClient.tsx
│   ├── percentage-calculator/
│   │   ├── page.tsx
│   │   └── PercentageClient.tsx
│   ├── emi-calculator/
│   │   ├── page.tsx
│   │   └── EMIClient.tsx
│   ├── compound-interest/
│   │   ├── page.tsx
│   │   └── CIClient.tsx
│   ├── compress-image/
│   │   ├── page.tsx
│   │   └── CompressClient.tsx
│   ├── resize-image/
│   │   ├── page.tsx
│   │   └── ResizeClient.tsx
│   ├── convert-image/
│   │   ├── page.tsx
│   │   └── ConvertClient.tsx
│   └── remove-bg/
│       ├── page.tsx
│       └── RemoveBGClient.tsx
├── components/
│   ├── Navbar.tsx                  # Sticky navbar with mobile menu
│   ├── ThemeProvider.tsx           # Dark/light mode context
│   ├── ToolLayout.tsx              # Shared tool page wrapper
│   └── ImageDropzone.tsx           # Drag-and-drop image upload
├── utils/
│   ├── calculators.ts              # All calculation logic
│   ├── imageTools.ts               # All image processing (client-side)
│   └── tools.ts                    # Central tools registry
├── styles/
│   └── globals.css                 # Design tokens, Tailwind, custom classes
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── postcss.config.mjs
```

---

## 🚀 Setup Instructions

### 1. Prerequisites
- Node.js ≥ 18.17
- npm, yarn, or pnpm

### 2. Install dependencies

```bash
cd toolbox
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm start
```

---

## 🛠 Tools & Routes

| Tool | Route |
|------|-------|
| BMI Calculator | `/bmi-calculator` |
| Age Calculator | `/age-calculator` |
| Percentage Calculator | `/percentage-calculator` |
| EMI / Loan Calculator | `/emi-calculator` |
| Compound Interest | `/compound-interest` |
| Image Compressor | `/compress-image` |
| Resize Image | `/resize-image` |
| Image Converter | `/convert-image` |
| Remove Background | `/remove-bg` |

---

## 📊 Sample Expected Outputs

### BMI Calculator
- Input: Weight = 70kg, Height = 175cm  
- Output: BMI = **22.9**, Category = **Normal weight**

### Age Calculator
- Input: DOB = 1995-06-15  
- Output: **28 years, 9 months, 27 days** | Total: 10,588 days | Next birthday: 79 days away

### Percentage Calculator (X% of Y)
- Input: 15% of 240  
- Output: **36**

### Percentage Calculator (% Change)
- Input: From 200 → 250  
- Output: **+25%** increase

### EMI Calculator
- Input: ₹5,00,000 loan, 8.5% rate, 60 months  
- Output: EMI = **₹10,224**, Total Interest = **₹1,13,437**, Total Payable = **₹6,13,437**

### Compound Interest
- Input: ₹1,00,000 principal, 12% rate, 10 years, monthly compounding  
- Output: Final Amount = **₹3,30,039**, Total Interest = **₹2,30,039** (3.3x growth)

### Image Compress
- Input: 2MB JPEG, quality 70%  
- Output: ~600KB JPEG (~70% reduction)

### Resize Image
- Input: 1920×1080 image, resize to 50%  
- Output: 960×540 image

### Image Convert
- Input: PNG file, convert to WebP at 90% quality  
- Output: WebP file (typically 30-50% smaller)

### Remove Background
- Input: Photo with solid white background  
- Output: PNG with transparent background

---

## ✨ Features

- **Dark / Light mode** — persisted in localStorage, respects system preference
- **Fully responsive** — mobile-first, works on all screen sizes
- **SEO-friendly** — each tool has its own `<title>` and `<meta>` description
- **100% client-side** — no data leaves your browser, no servers, no accounts
- **Instant results** — calculators update as you type, no submit button needed
- **Amortization schedule** — EMI calculator shows full month-by-month breakdown
- **Year-by-year chart** — compound interest shows visual bar chart

---

## 🎨 Design

- **Fonts**: Syne (display) + DM Sans (body) + DM Mono (numbers)
- **Accent**: Orange (`#f97316`)
- **Theme**: Warm neutral tones (not grey, not white — slightly warm)
- **Components**: card, result-box, input-base, label, stat-value, badge, tool-card

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `next` 14 | Framework |
| `react` 18 | UI |
| `tailwindcss` | Styling |
| `typescript` | Type safety |
| `clsx` | Conditional classnames |

No heavy image-processing libraries required — all image tools use the **Canvas API** natively available in browsers.
