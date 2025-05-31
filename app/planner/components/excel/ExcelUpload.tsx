// ✅ app/planner/components/excel/ExcelUpload.tsx
'use client';
import * as XLSX from 'xlsx';
import { convertExcelToParsedOrder } from '@/lib/utils/convertExcelToParsedOrder';
import { ParsedOrder } from '@/types/ParsedOrder';

export default function UploadExcel({ onParsed }: { onParsed: (data: ParsedOrder[]) => void }) {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const parsed = convertExcelToParsedOrder(rows);
    onParsed(parsed);
  };

  return (
    <input type="file" accept=".xlsx" onChange={handleFile} />
  );
}