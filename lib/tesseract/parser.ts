import { categoryMap } from "@/data/categoryMap";
import { batchNameMap } from "@/lib/mappings/batchNameMap";

export type Department = "MAS" | "DAS" | "WDA";

export type ParsedTask = {
  department: Department;
  category: string;
  pieces: number;
  batchName?: string;
};

export function normalizeCategory(raw: string): string {
  const trimmed = raw.trim();
  return categoryMap[trimmed] || batchNameMap[trimmed] || trimmed;
}

export function parseRawText(rawText: string): ParsedTask[] {
  const lines = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const result: ParsedTask[] = [];

  lines.forEach((line) => {
    const match = line.match(/(MAS|DAS|WDA)[\s　]*(.+)[\s　]*(\d+)/i);
    if (match) {
      const [, deptRaw, rawCategory, piecesStr] = match;

      const department = deptRaw.toUpperCase() as Department;
      const pieces = parseInt(piecesStr, 10);

      const normalizedCategory = normalizeCategory(rawCategory);
      const batchName = Object.entries(batchNameMap).find(
        ([, value]) => value === normalizedCategory
      )?.[0] || normalizedCategory;

      result.push({
        department,
        category: normalizedCategory,
        batchName,
        pieces,
      });
    }
  });

  return result;
}