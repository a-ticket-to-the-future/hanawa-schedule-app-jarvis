// lib/utils/convertExcelToParsedOrder.ts
import { ParsedOrder, Department, Pattern } from '@/types/ParsedOrder';
import { batchNameMap } from '@/lib/mappings/batchNameMap';
import { productivityMap } from '@/lib/mappings/productivityMap';

function normalizeBatchName(input: string): string {
  const cleaned = input.trim();
  return batchNameMap[cleaned] || cleaned;
}

const DEFAULT_PERSONNEL: Record<Department, number> = {
  MAS: 33,
  DAS: 16,
  WDA: 10,
};

type ExcelRow = {
  部署: string;
  バッチ名: string;
  ピース数: number;
  パターン: string;
};

export function convertExcelToParsedOrder(rows: ExcelRow[]): ParsedOrder[] {
  return rows.map((row) => {
    const department = (row['部署'] || '').trim() as Department;
    const pattern = (row['パターン'] || '').trim() as Pattern;
    const rawBatch = String(row['バッチ名'] || '').trim();
    const category = normalizeBatchName(rawBatch);
    const pieces = Number(row['ピース数'] || 0);
    const people = DEFAULT_PERSONNEL[department] || 1;
    const productivity = productivityMap[department]?.[category] ?? 20;
    const time = (pieces && people && productivity)
      ? +(pieces / (people * productivity)).toFixed(2)
      : 0;

    return {
      date: new Date().toISOString().split('T')[0],
      department,
      pattern,
      batchName: rawBatch,
      category,
      pieces,
      people,
      productivity,
      time,
      personnel: people,
    };
  });
}




// import { Department, ParsedOrder, Pattern } from "@/types/ParsedOrder";

// import { batchNameMap } from "../mappings/batchNameMap";
// import { productivityMap } from "../mappings/productivityMap";


// // convertExcelToParsedOrder.ts の冒頭に追加
// const DEFAULT_PERSONNEL: Record<Department, number> = {
//   MAS: 33,
//   DAS: 16,
//   WDA: 10,
// };

// export function convertExcelToParsedOrder(rows: any[]): ParsedOrder[] {
//   return rows.map((row) => {
//     const rawBatch = String(row['バッチ名'] || '').trim();
//     const category = batchNameMap[rawBatch] || rawBatch;

//     const department = (row['部署'] || '').trim() as Department;
//     const pattern = (row['パターン'] || '').trim() as Pattern;
//     const people = DEFAULT_PERSONNEL

//     const productivity = productivityMap[department]?.[category] ?? 20;
//    const time = people && productivity
//   ? +(pieces / (people * productivity)).toFixed(2)
//   : 0;

// const start = currentTime[department] ?? workStartTime;
// const end = start + time; // ここではtoFixedしない

// schedules.push({
//   ...order,
//   start,
//   end: +end.toFixed(2), // 必要ならこの行でtoFixedを適用
// });

//     return {
//       date: new Date().toISOString().split('T')[0],
//       department,
//       pattern,
//       batchName: rawBatch,
//       category,
//       pieces,
//       people,
//       productivity,
//       time,
//       personnel: people,
//     };
//   });
// }




// // // lib/utils/convertExcelToParsedOrder.ts
// // import { ParsedOrder, Department, Pattern } from '@/types/ParsedOrder';
// // import { batchNameMap } from '@/lib/mappings/batchNameMap';
// // import { productivityMap } from '@/lib/mappings/productivityMap';


// // // import { batchNameMap } from '@/lib/mappings/batchNameMap';

// // function normalizeBatchName(input: string): string {
// //   const cleaned = input.trim().toUpperCase(); // 大文字に変換（任意）
// //   return batchNameMap[cleaned] || input.trim(); // マップがなければそのまま返す
// // }

// // const DEFAULT_PERSONNEL: Record<Department, number> = {
// //   MAS: 33,
// //   DAS: 16,
// //   WDA: 10,
// // };

// // type ExcelRow = {
// //   部署: string;
// //   バッチ名: string;
// //   ピース数: number;
// //   パターン: string;
// // };


// // export function convertExcelToParsedOrder(rows: ExcelRow[]): ParsedOrder[] {

// //   console.log(rows)

// //   return rows.map((row) => {
// //     const rawDept = (row['部署'] || '').trim() as Department;
// //     const rawPattern = (row['パターン'] || '').trim() as Pattern;
// //     const rawBatch = String(row['バッチ名'] || '').trim();
// // const category = normalizeBatchName(rawBatch); // ←ここで変換済み名に置換
// //     const pieces = Number(row['ピース数'] || 0);
// //     const people = DEFAULT_PERSONNEL[rawDept] || 1;
// //     const productivity = productivityMap[rawDept]?.[category] ?? 20;
// //     const time = (pieces && people && productivity) ? +(pieces / (people * productivity)).toFixed(2) : 0;
// //     const date = new Date('2025-05-14');

// //     console.log(row['パターン'],date) 


// //     return {
// //       date: new Date().toISOString().split('T')[0],
// //       department: rawDept,
// //       pattern: rawPattern,
// //       batchName: rawBatch,
// //       category,
// //       pieces,
// //       people,
// //       productivity,
// //       time,
// //       personnel: people,
// //     };
// //   });
// // }