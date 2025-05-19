// types/productivity.ts
export type ProductivityRecord = {
  department: string;
  category: string;
  date: string; // "YYYY-MM-DD"
  value: string; // pcs/hour
  productivity: number 
};

// types/ocr.ts
export type EditedCategory = {
  department: string;
  category: string;
  pieces: number;
};

// lib/utils/timeUtils.ts
export function ceilToQuarter(hours: number): number {
  return Math.ceil(hours / 0.25) * 0.25;
}
