// lib/logic/calculateScheduleEntries.ts
import { ParsedOrder } from "@/types/ParsedOrder";
import { ScheduleEntry } from "@/lib/logic/schedule";

// 休憩時間定義（時間単位）
const LUNCH_BREAK_START = 11.75; // 11:45
const LUNCH_BREAK_END = 12.5;    // 12:30
const AFTERNOON_BREAK_START = 14.75; // 14:45
const AFTERNOON_BREAK_END = 15.0;    // 15:00

function applyBreaks(start: number, duration: number): number {
  let endTime = start + duration;

  if (start < LUNCH_BREAK_START && endTime > LUNCH_BREAK_START) {
    endTime += LUNCH_BREAK_END - LUNCH_BREAK_START;
  }

  if (start < AFTERNOON_BREAK_START && endTime > AFTERNOON_BREAK_START) {
    endTime += AFTERNOON_BREAK_END - AFTERNOON_BREAK_START;
  }

  return endTime;
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
    return (p1 === -1 ? Infinity : p1) - (p2 === -1 ? Infinity : p2);
  });

  console.log(endHour)

  const currentTimeByDept: Record<string, number> = {};
  const results: ScheduleEntry[] = [];

  for (const item of sorted) {
    const {
      department,
      category,
      batchName,
      pieces,
      people,
      productivity,
      personnel: rawPersonnel,
      
    } = item;

    // 型安全なチェック
    if (
      department === undefined ||
      category === undefined ||
      batchName === undefined ||
      productivity === undefined
    ) {
      continue;
    }

    const actualPeople = rawPersonnel ?? people ?? 1;
    const actualPieces = pieces ?? 0;
    const actualProductivity = productivity ?? 1;

    const startTime = currentTimeByDept[department] ?? startHour;
    const rawDuration = actualPieces / actualProductivity / actualPeople;
    const duration = Math.ceil(rawDuration * 4) / 4; // 15分単位に切り上げ
    const endTime = applyBreaks(startTime, duration);

    results.push({
      department,
      category,
      batchName,
      startTime,
      endTime,
      duration,
      people: actualPeople,
      pieces: actualPieces,
      productivity: actualProductivity,
      personnel: actualPeople,
    });

    currentTimeByDept[department] = endTime;
  }

  return results;
}