// lib/utils/convertExcelToParsedOrder.ts
import { ParsedOrder } from "@/types/ParsedOrder";
import { utils, WorkBook } from "xlsx";

export function convertExcelToParsedOrder(workbook: WorkBook): ParsedOrder[] {
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const json = utils.sheet_to_json<Record<string, any>>(sheet, { defval: "" });
    console.log(json)
  return json
    .filter(row => row["部署"] && row["カテゴリ"] && row["ピース数"]) // データがある行だけ
    .map((row): ParsedOrder => ({
      department: String(row["部署"] ?? "").trim(),
      category: String(row["カテゴリ"] ?? "").trim(),
      pieces: Number(row["ピース数"]) || 0,
      batch: String(row["バッチ名"] ?? "").trim(),
      people: Number(row["人数"]) || 0,
      productivity: Number(row["生産性"]) || 0,
    }));
}