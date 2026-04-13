// ─── BMI ────────────────────────────────────────────────────────────────────
export type BMICategory =
  | "Underweight"
  | "Normal weight"
  | "Overweight"
  | "Obese";

export function calcBMI(
  weightKg: number,
  heightCm: number
): { bmi: number; category: BMICategory; description: string } {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  let category: BMICategory;
  let description: string;

  if (bmi < 18.5) {
    category = "Underweight";
    description = "You are below the healthy weight range.";
  } else if (bmi < 25) {
    category = "Normal weight";
    description = "You are within the healthy weight range.";
  } else if (bmi < 30) {
    category = "Overweight";
    description = "You are above the healthy weight range.";
  } else {
    category = "Obese";
    description = "You are significantly above the healthy weight range.";
  }

  return { bmi: Math.round(bmi * 10) / 10, category, description };
}

// ─── Age ────────────────────────────────────────────────────────────────────
export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthday: { days: number; date: string };
}

export function calcAge(birthDate: Date, now = new Date()): AgeResult {
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const daysInPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += daysInPrevMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;

  // Next birthday
  let nextBday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBday <= now) nextBday.setFullYear(nextBday.getFullYear() + 1);
  const daysUntilBday = Math.ceil((nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return {
    years,
    months,
    days,
    totalDays,
    totalHours,
    totalMinutes,
    nextBirthday: {
      days: daysUntilBday,
      date: nextBday.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
    },
  };
}

// ─── Percentage ─────────────────────────────────────────────────────────────
export function calcPercentOf(part: number, total: number) {
  if (total === 0) return null;
  return Math.round((part / total) * 10000) / 100;
}

export function calcXPercentOfY(percent: number, value: number) {
  return Math.round(((percent / 100) * value) * 100) / 100;
}

export function calcPercentChange(from: number, to: number) {
  if (from === 0) return null;
  const change = ((to - from) / Math.abs(from)) * 100;
  return Math.round(change * 100) / 100;
}

// ─── EMI ────────────────────────────────────────────────────────────────────
export interface EMIResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  schedule: { month: number; emi: number; principal: number; interest: number; balance: number }[];
}

export function calcEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): EMIResult {
  const r = annualRate / 12 / 100;
  if (r === 0) {
    const emi = principal / tenureMonths;
    return {
      emi,
      totalAmount: principal,
      totalInterest: 0,
      schedule: Array.from({ length: tenureMonths }, (_, i) => ({
        month: i + 1,
        emi,
        principal: emi,
        interest: 0,
        balance: principal - emi * (i + 1),
      })),
    };
  }

  const emi = (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
  const totalAmount = emi * tenureMonths;
  const totalInterest = totalAmount - principal;

  const schedule = [];
  let balance = principal;
  for (let i = 1; i <= tenureMonths; i++) {
    const interest = balance * r;
    const principalPaid = emi - interest;
    balance = Math.max(0, balance - principalPaid);
    schedule.push({
      month: i,
      emi: Math.round(emi * 100) / 100,
      principal: Math.round(principalPaid * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      balance: Math.round(balance * 100) / 100,
    });
  }

  return {
    emi: Math.round(emi * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    schedule,
  };
}

// ─── Compound Interest ───────────────────────────────────────────────────────
export interface CIResult {
  finalAmount: number;
  totalInterest: number;
  yearlyBreakdown: { year: number; amount: number; interest: number }[];
}

export function calcCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundingFrequency: number // 1=annually, 4=quarterly, 12=monthly, 365=daily
): CIResult {
  const r = annualRate / 100;
  const yearlyBreakdown = [];

  for (let y = 1; y <= years; y++) {
    const amount = principal * Math.pow(1 + r / compoundingFrequency, compoundingFrequency * y);
    yearlyBreakdown.push({
      year: y,
      amount: Math.round(amount * 100) / 100,
      interest: Math.round((amount - principal) * 100) / 100,
    });
  }

  const finalAmount = yearlyBreakdown[yearlyBreakdown.length - 1]?.amount ?? principal;

  return {
    finalAmount,
    totalInterest: Math.round((finalAmount - principal) * 100) / 100,
    yearlyBreakdown,
  };
}

// ─── Formatting ─────────────────────────────────────────────────────────────
export function formatCurrency(n: number, currency = "₹") {
  return currency + n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

export function formatNumber(n: number) {
  return n.toLocaleString("en-IN");
}
