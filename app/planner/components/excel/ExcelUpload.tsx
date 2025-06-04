// 'use client';
// import * as XLSX from 'xlsx';
// import { convertExcelToParsedOrder } from '@/lib/utils/convertExcelToParsedOrder';
// import { ParsedOrder } from '@/types/ParsedOrder';

// type ExcelRow = {
//   部門: 'MAS' | 'DAS' | 'WDA';
//   バッチ名: string;
//   ピース: number;
//   パターン: "a'" | 'A当日' | 'A追加' | "b'" | 'B当日';
//   生産性:number,
//   人数:number
//   アイテム:number
// };


// export default function UploadExcel({ onParsed }: { onParsed: (data: ParsedOrder[]) => void }) {
//   const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const data = await file.arrayBuffer();
//     const workbook = XLSX.read(data, { type: 'array' });
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];

//     // 型注釈を明示
//     const rows = XLSX.utils.sheet_to_json<ExcelRow>(sheet);

//     // エラーレスな変換処理
//     // const parsed = await convertExcelToParsedOrder(rows);
//     onParsed(parsed);
//     console.log(parsed)
//   };

//   return (
//     <div className="space-y-2">
//       <input type="file" accept=".xlsx" onChange={handleFile} className="border p-2" />
//     </div>
//   );
// }