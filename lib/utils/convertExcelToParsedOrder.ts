// lib/utils/convertExcelToParsedOrder.ts

import { ParsedOrder, Department, Pattern } from '@/types/ParsedOrder';
import { batchNameMap } from '@/lib/mappings/batchNameMap';
import { productivityMap } from '../mappings/productivityMap';
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
  人数:number;
};

function normalizeBatchName(raw: string): string {
  const cleaned = raw.trim();
  return batchNameMap[cleaned] || cleaned;

// const DEFAULT_PERSONNEL: Record<Department, number> = {
//   MAS: 33,
//   DAS: 16,
//   WDA: 10,
// };

}

export function convertExcelToParsedOrder(rows:ExcelRow[]): ParsedOrder[] {

  console.log(rows)

  return rows.map((row,) => {
    const rawDept = (row['部署'] || '').trim() as Department;
    const rawPattern = (row['パターン'] || '').trim() as Pattern;
    const rawBatch = String(row['バッチ名'] || '').trim();
    const category = normalizeBatchName(rawBatch);

    const pieces = Number(row['ピース'] || 0);
const rawPeople = Number(row['人数']);
const people = rawPeople > 0 ? rawPeople : DEFAULT_PERSONNEL[rawDept] || 1;
const productivity = Number(row['生産性']) || productivityMap[rawDept]?.[category] || 100;
  
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
      line:0
    };
  });
}