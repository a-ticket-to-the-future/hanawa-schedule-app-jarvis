// lib/excel/parseExcel.ts
import * as XLSX from "xlsx";
import { ParsedOrder } from "@/types/ParsedOrder";

export async function parseExcel(file: File): Promise<ParsedOrder[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

      const parsed: ParsedOrder[] = [];

      for (let i = 1; i < json.length; i++) {
        const row = json[i];
        const [ department,category, piecesStr,batchName] = row;
        // const department = row 
        const productivity = Number(row);
        const people = Number(row)
        if (typeof department === "string" && typeof category === "string" && typeof piecesStr === "number" || typeof piecesStr === "string") {
          const pieces = parseInt(piecesStr as string, 10);
        //   const people = 
        //   const productivity = 
          if (!isNaN(pieces)) {
            parsed.push({ department, category, pieces,people,productivity,batchName });
            
          }
          console.log(parsed)
        }
      }

      resolve(parsed);
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}
