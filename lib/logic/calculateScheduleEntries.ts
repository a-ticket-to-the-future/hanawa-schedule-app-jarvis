// lib/logic/calculateScheduleEntries.ts
import { WorkEntry } from "@/types/WorkEntry";
import { ScheduleEntry } from "@/lib/logic/schedule"; // ScheduleEntry 型を別途定義して使う前提

export function calculateScheduleEntries(entries: WorkEntry[]): ScheduleEntry[] {
  const currentTimeByDept: Record<string, number> = {};
  const result: ScheduleEntry[] = [];

  for (const entry of entries) {
    const { department, category, duration } = entry as WorkEntry & { duration: number };
    const start = currentTimeByDept[department] || 0;

    result.push({ department, category, start, duration });
    currentTimeByDept[department] = start + duration;
  }

  return result;
}
