// app/planner/components/excel/ExcelUpload.tsx
"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { ParsedOrder } from "@/types/ParsedOrder";
import { convertExcelToParsedOrder } from "@/lib/utils/convertExcelToParsedOrder";

interface ExcelUploadProps {
  onParsed: (data: ParsedOrder[]) => void;
}

export default function ExcelUpload({ onParsed }: ExcelUploadProps) {
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

    const parsed: ParsedOrder[] = convertExcelToParsedOrder(workbook);;
    for (let i = 0; i < json.length; i++) {
      const row = json[i];
      if (row[0] === "予") {
        const department = (row[1] || "").toString().trim();
        const category = (row[2] || "").toString().trim();
        const pieces = parseInt((row[3] || "0").toString().trim(), 10);
        const people =  + "人"
        const productivity = Number(row[5] ?? 0); // もしくは正しい列インデックス        
        const batch = "";
        if (department && category && !isNaN(pieces)) {
          parsed.push({ department, category, pieces,people,productivity,batch });
        }
        console.log(parsed);
      }
    }
    console.log(parsed)
    onParsed(parsed);
  };

  return (
    <div className="space-y-2">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {fileName && <p className="text-sm text-gray-500">読み込んだファイル: {fileName}</p>}
    </div>
  );
}




//けっきょく再度手直しさせられました。イラッとしてます。笑


// "use client";

// import { useRef } from "react";
// import * as XLSX from "xlsx";
// import { ParsedOrder } from "@/types/ParsedOrder";

// type Props = {
//   onParsed: (data: ParsedOrder[]) => void;
// };

// export default function ExcelUpload({ onParsed }: Props) {
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const data = await file.arrayBuffer();
//     const workbook = XLSX.read(data);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];

//     const json = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

//     // 例: 1行目はヘッダー想定
//     const parsed: ParsedOrder[] = json
//       .slice(1)
//       .filter((row) => row[0] && row[1])
//       .map((row) => ({
//         category: row[0] as string,
//         pieces: Number(row[1]),
//         department:"",
//         people:"",
//         productivity:"",
//       }));

//     onParsed(parsed);
//   };

//   return (
//     <div className="space-y-2">
//       <label className="font-medium">Excelファイルから読み込み</label>
//       <input type="file" accept=".xlsx,.xls" onChange={handleFile} ref={inputRef} />
//     </div>
//   );
// }




//先に提示された方がここより下でこちらが完全版のような説明をしている。上は最小限のものになっているというせつめいがあった


// // components/excel/ExcelUpload.tsx
// "use client";

// import { useState } from "react";
// import * as XLSX from "xlsx";
// import { ParsedOrder } from "@/types/ParsedOrder";

// export default function ExcelUpload({ onParsed }: { onParsed: (data: ParsedOrder[]) => void }) {
//   const [fileName, setFileName] = useState<string | null>(null);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setFileName(file.name);

//     const data = await file.arrayBuffer();
//     const workbook = XLSX.read(data);
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//     // ヘッダーとデータ行を分離し、"予"の行のみフィルタ
//     const parsed: ParsedOrder[] = [];
//     for (const row of jsonData as string[][]) {
//       if (row[0] && row[0].toString().includes("予")) {
//         const category = row[1]?.toString().trim() || "";
//         const pieces = parseInt(row[2]?.toString() || "0", 10);
//         if (category && !isNaN(pieces)) {
//           parsed.push({ category, pieces,department,people,productivity });
//         }
//       }
//     }

//     onParsed(parsed);
//   };

//   return (
//     <div className="space-y-2">
//       <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
//       {fileName && <p className="text-sm text-gray-500">読み込みファイル: {fileName}</p>}
//     </div>
//   );
// }
