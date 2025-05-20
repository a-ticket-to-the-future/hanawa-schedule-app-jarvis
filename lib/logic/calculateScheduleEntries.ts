// lib/logic/calculateScheduleEntries.ts
import { ParsedOrder } from "@/types/ParsedOrder";
import { ScheduleEntry } from "@/lib/logic/schedule";
// import { batchNameMap } from "../mappings/batchNameMap";

const LUNCH_BREAK_START = 11.75; // 11:45
const LUNCH_BREAK_END = 12.5; // 12:30
const AFTERNOON_BREAK_START = 14.75; // 14:45
const AFTERNOON_BREAK_END = 15.0; // 15:00

function applyBreaks(start: number, duration: number): number {
  let end = start + duration;

  // 昼休憩をまたぐ場合
  if (start < LUNCH_BREAK_START && end > LUNCH_BREAK_START) {
    end += LUNCH_BREAK_END - LUNCH_BREAK_START;
  }

  // 午後休憩をまたぐ場合
  if (start < AFTERNOON_BREAK_START && end > AFTERNOON_BREAK_START) {
    end += AFTERNOON_BREAK_END - AFTERNOON_BREAK_START;
  }

  return end;
}

export function calculateScheduleEntries(
  parsed: ParsedOrder[],
  priority: string[],
  startHour: number,
  endHour: number
): ScheduleEntry[] {
  const sorted = [...parsed].sort((a, b) => {
    const p1 = priority.indexOf(a.batchName || "");
    const p2 = priority.indexOf(b.batchName || "");
    return p1 - p2;
  });
  console.log(endHour)

  const currentTimeByDept: Record<string, number> = {};
  const results: ScheduleEntry[] = [];

  for (const item of sorted) {
    const { department, category, pieces, people, productivity, batchName } = item;
    if (!department || !pieces || !people || !productivity) continue;

    const start = currentTimeByDept[department] ?? startHour;
    const duration = (pieces / productivity) / people; // 時間（hour）
    const adjustedEnd = applyBreaks(start, duration);

    results.push({
      department,
      category,
      batchName,
      start,
      end: adjustedEnd,
      duration,
      people,
      pieces,
      productivity,

    });

    currentTimeByDept[department] = adjustedEnd;
  }

  return results;
}
