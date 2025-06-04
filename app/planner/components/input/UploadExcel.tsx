// ✅ UploadExcel.tsx を以前の安定していたバージョンに戻す
'use client';

import * as XLSX from 'xlsx';
import { convertExcelToParsedOrder } from '@/lib/utils/convertExcelToParsedOrder';
import { ParsedOrder } from '@/types/ParsedOrder';

type ExcelRow = {
  部門: 'MAS' | 'DAS' | 'WDA';
  パターン: "a'" | 'A当日' | 'A追加' | "b'" | 'B当日';
  バッチ名: string;
  アイテム: number;
  ピース: number;
  人数: number;
  生産性: number;
};

export default function UploadExcel({ onParsed }: { onParsed: (data: ParsedOrder[]) => void }) {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rows = XLSX.utils.sheet_to_json<ExcelRow>(sheet);

    // ✅ rows をそのまま変換
    const parsed =  convertExcelToParsedOrder(rows);
    onParsed(parsed);
    console.log('✅ Parsed:', parsed);
    console.log(rows)
    // console.log(rows)
  };
  return (
    <div className="space-y-2">
      <input type="file" accept=".xlsx" onChange={handleFile} className="border p-2" />
    </div>
  );
}
