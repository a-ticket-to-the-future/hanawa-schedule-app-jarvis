// lib/utils/convertExcelToParsedOrder.ts
import { ParsedOrder } from '@/types/ParsedOrder';
import { batchNameMap } from '@/lib/mappings/batchNameMap';
import { productivityMap } from '@/lib/mappings/productivityMap';

export function convertExcelToParsedOrder(rows: any[]): ParsedOrder[] {
  return rows.map((row) => {
    const rawBatch = String(row['バッチ名'] || '').trim();
    const category = batchNameMap[rawBatch] || rawBatch;
    const productivity = productivityMap[category] || 20;
    const department = row['部署']?.trim();
    const personnel = ""
    console.log(personnel)

    return {
      date: new Date().toISOString().split('T')[0],
      department,
      pattern: row['パターン'],
      batchName: rawBatch,
      category,
      pieces: Number(row['ピース数'] || 0),
      people: 0, // 初期は0としておき後から反映
      productivity,
    };
  });
}
