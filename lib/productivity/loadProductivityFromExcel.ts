// lib/productivity/loadProductivityFromExcel.ts
import * as XLSX from "xlsx";
import { ProductivityRecord } from "@/types/productivity";

// シート名とカテゴリのマッピング
const sheetCategoryMap: Record<string, string> = {
  "賞味期限": "賞味期限",
  "ベビー衣料": "ベビー衣料",
  "子供肌着": "子供肌着",
  "男児": "男児",
  "女児": "女児"
};

export function loadProductivityFromExcel(file: File): Promise<ProductivityRecord[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) return reject("ファイル読み込みに失敗しました");

      const workbook = XLSX.read(data, { type: "array" });
      const allRecords: ProductivityRecord[] = [];

      for (const [sheetName, category] of Object.entries(sheetCategoryMap)) {
        const sheet = workbook.Sheets[sheetName];
        if (!sheet) continue;

        const json = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        for (const row of json as any[]) {
          const date = row["日付"]?.toString().split("(")[0].trim();
          const productivity = parseFloat(row["生産性(pcs)"] || row["O"] || row["o"]);
          const department = ""
          const value = ""

          if (date && !isNaN(productivity)) {
            allRecords.push({ category, date, productivity,department,value });
          }
        }
      }

      resolve(allRecords);
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}
