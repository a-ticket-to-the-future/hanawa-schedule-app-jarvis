import * as XLSX from "xlsx";
import { ParsedOrder, Department, Pattern } from "@/types/ParsedOrder";
import { batchNameMap } from "@/lib/mappings/batchNameMap";
import { productivityMap } from "@/lib/mappings/productivityMap";

const DEFAULT_PERSONNEL: Record<Department, number> = {
  MAS: 33,
  DAS: 16,
  WDA: 10,
};

export async function parseExcel(file: File): Promise<ParsedOrder[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

      const parsed: ParsedOrder[] = [];

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const [deptRaw, categoryRaw, piecesStr, batchNameRaw, patternRaw] = row;

        const department = (deptRaw || '').trim() as Department;
        const category = (categoryRaw || '').trim();
        const batchName = (batchNameRaw || '').trim();
        const pattern = (patternRaw || '').trim() as Pattern;
        const pieces = parseInt(piecesStr as string, 10);

        if (!department || !category || isNaN(pieces)) continue;

        const mappedCategory = batchNameMap[category] || category;
        const productivity = productivityMap[department]?.[mappedCategory] ?? 20;
        const people = DEFAULT_PERSONNEL[department] ?? 1;
        const time = +(pieces / (people * productivity)).toFixed(2);

        parsed.push({
          date: new Date().toISOString().split('T')[0],
          department,
          category: mappedCategory,
          batchName,
          pattern,
          pieces,
          people,
          productivity,
          time,
          personnel: people,
        });
      }

      resolve(parsed);
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}