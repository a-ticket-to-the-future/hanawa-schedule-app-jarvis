// lib/logic/calculateWorkTimes.ts
import { getProductivity } from "@/lib/productivity/getProductivity";
// import { NormalizedCategory } from "@/data/categoryMap";

export type InputCategoryData = {
  department: string;
  category: string;
  pieces: number;
  people: number;
};

export type WorkTimeResult = {
  department: string;
  category: string;
  pieces: number;
  people: number;
  productivity: number;
  duration: number;
};

export async function calculateWorkTimes(
  input: InputCategoryData[],
  selectedDate: string
): Promise<WorkTimeResult[]> {
  const results: WorkTimeResult[] = [];

  for (const item of input) {
    const { department, category, pieces, people } = item;

    const productivity = await getProductivity(department, category, selectedDate);

    if (!productivity || productivity <= 0 || !people || people <= 0){
      console.warn("生産性または人数が不正:", {
        department,
        category,
        productivity,
        people,
    });
     continue;
  }
    const hours = pieces / (people * productivity);
    const rounded = Math.ceil(hours / 0.25) * 0.25;

    results.push({
      department,
      category,
      pieces,
      people,
      productivity,
      duration: rounded,
    });
  }

  return results;
}