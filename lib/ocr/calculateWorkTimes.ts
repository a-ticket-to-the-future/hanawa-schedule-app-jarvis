// lib/ocr/calculateWorkTimes.ts
import { ProductivityRecord } from "@/types/productivity";
import { EditedCategory } from "@/types/productivity";
import { ceilToQuarter } from "@/types/productivity";

export type ScheduleEntry = {
  department: string;
  category: string;
  start: number; // 開始時間（時間単位、例: 9.5）
  duration: number; // 所要時間（0.25単位）
};

export function calculateWorkTimes(
  editedData: EditedCategory[],
  assignedPeople: Record<string, number>,
  productivity: ProductivityRecord[]
): ScheduleEntry[] {
  const schedule: ScheduleEntry[] = [];
  const departmentStartTimes: Record<string, number> = {
    MAS: 0,
    DAS: 0,
    WDA: 0,
  };

  for (const entry of editedData) {
    const { department, category, pieces } = entry;
    const people = assignedPeople[department] || 1; // デフォルト1人
    const prod = getProductivity(productivity, department, category);

    if (!prod) continue; // 該当データなし

    const totalMinutes = (pieces / prod) * 60; // 1人あたりの作業時間（分）
    const actualMinutes = totalMinutes / people;
    const quarterBlocks = ceilToQuarter(actualMinutes / 60); // 0.25単位で丸め

    schedule.push({
      department,
      category,
      start: departmentStartTimes[department],
      duration: quarterBlocks,
    });

    departmentStartTimes[department] += quarterBlocks;
  }

  return schedule;
}

function getProductivity(
  productivity: ProductivityRecord[],
  department: string,
  category: string
): number | undefined {
  return Number(
  productivity.find(
    (p) => p.department === department && p.category === category
  )?.value
);
}
