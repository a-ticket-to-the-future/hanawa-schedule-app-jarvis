// lib/utils/convertExcelToParsedOrder.ts

import { ParsedOrder, Department, Pattern } from '@/types/ParsedOrder';
import { batchNameMap } from '@/lib/mappings/batchNameMap';
// import { productivityMap } from '@/lib/mappings/productivityMap';

const DEFAULT_PERSONNEL: Record<Department, number> = {
  MAS: 33,
  DAS: 16,
  WDA: 10,
};


type ExcelRow = {
  部署: string;
  バッチ名: string;
  ピース: number;
  パターン: string;
  生産性:number;
};

function normalizeBatchName(raw: string): string {
  const cleaned = raw.trim();
  return batchNameMap[cleaned] || cleaned;



}

export function convertExcelToParsedOrder(rows:ExcelRow[]): ParsedOrder[] {

  console.log(rows)

  return rows.map((row, i) => {
    const rawDept = (row['部署'] || '').trim() as Department;
    const rawPattern = (row['パターン'] || '').trim() as Pattern;
    const rawBatch = String(row['バッチ名'] || '').trim();
    const category = normalizeBatchName(rawBatch);

    const pieces = Number(row['ピース']) || 0;
    const people = DEFAULT_PERSONNEL[rawDept] || 1;    // const productivity = productivityMap[rawDept]?.[category] ?? 20;
    const productivity = (row['生産性'])||100
  
    const time = pieces && people && productivity
      ? +(pieces / (people * productivity)).toFixed(2)
      : 0;

    return {
      date: new Date().toISOString().split('T')[0],
      department: rawDept,
      pattern: rawPattern,
      batchName: rawBatch ,
      category,
      pieces,
      people,
      productivity,
      time,
      personnel: people,
    };
  });
}