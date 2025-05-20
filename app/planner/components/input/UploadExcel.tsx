// components/input/UploadExcel.tsx
'use client';
import * as XLSX from 'xlsx';
import { ParsedOrder } from '@/types/ParsedOrder';
import { useState } from 'react';

type ExcelRow = {
  部署: "MAS" | "DAS" | "WDA";
  バッチ名: string;
  ピース数: number;
  パターン: "a'" | "A当日" | "A追加" | "b'" | "B当日";
};




export default function UploadExcel({ onParsed }: {
  onParsed: (data: ParsedOrder[]) => void;
}) {
  const [fileName, setFileName] = useState<string>('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    
    setFileName(file.name);
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<ExcelRow>(sheet);

    const parsed: ParsedOrder[] = rows.map(row => ({
      date: new Date().toISOString().split('T')[0],
      department: row['部署'],
      batchName: row['バッチ名'],
      pieces: Number(row['ピース数']),
      pattern: row['パターン'],
    }));

    onParsed(parsed);
  };

  return (
    <div className="space-y-2">
      <input type="file" accept=".xlsx" onChange={handleFile} className="border p-2" />
      {fileName && <p className="text-xs text-gray-500">読み込み済み: {fileName}</p>}
    </div>
  );
}
