// // lib/ocr/parseImage.ts

// import {categoryMap} from "@/data/categoryMap";



// // lib/ocr/parseImage.ts や components/ocr/OCRParser.tsx など
// import { batchNameMap } from "@/lib/mappings/batchNameMap";

// //参考例
// // const raw = "ベビーイリョウ";
// // const corrected = normalizeBatchName(raw); // → "ベビー衣料"

// // OCR結果を正規化
// const correctedName = batchNameMap[ocrText] ?? ocrText;


// console.log(correctedName)
// console.log(ocrText)
// /**
//  * 
//  * 
//  * OCRから取得したテキストをJSON形式に変換する。
//  * @param text OCRで読み取ったテキスト
//  * @returns { department: string; category: string; pieces: number }[]
//  */
// export function parseOCRText(text: string) {
//   const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);

//   const parsedData: {
//     department: string;
//     category: string;
//     pieces: number;
//   }[] = [];

//   let currentDepartment = "";

//   for (const line of lines) {
//     if (/^(MAS|DAS|WDA)/i.test(line)) {
//       currentDepartment = line.slice(0, 3).toUpperCase();
//       continue;
//     }

//     // カタカナを正規化（例：ジョコシギャン → 賞味期限）
//     const matched = Object.keys(categoryMap).find((key) => line.includes(key));
//     if (!matched) continue;

//     const normalizedCategory = categoryMap[matched];
//     const numberMatch = line.match(/\d+/);
//     const pieces = numberMatch ? parseInt(numberMatch[0], 10) : 0;

//     parsedData.push({
//       department: currentDepartment,
//       category: normalizedCategory,
//       pieces,
//     });
//   }

//   return parsedData;
// }


//↑エラーはなかった↑
// lib/ocr/parseImage.ts
import Tesseract from 'tesseract.js';
import { normalizeBatchName } from '@/lib/utils/normalizeBatchName';
import { ParsedOrder } from '@/types/ParsedOrder';

export async function parseImage(file: File): Promise<ParsedOrder[]> {
  const { data: { text } } = await Tesseract.recognize(file, 'jpn');
  const lines = text.split('\n').filter(line => line.trim() !== '');

  const parsedOrders: ParsedOrder[] = lines.map(line => {
    const batchMatch = line.match(/([\u30A0-\u30FF]+|[A-Za-z]+)/); // カタカナor英文字
    const piecesMatch = line.match(/\d{3,6}/); // 数値（ピース数）

    const rawBatch = batchMatch ? batchMatch[0] : '不明';
    const batchName = normalizeBatchName(rawBatch);

    return {
      date: new Date().toISOString().split('T')[0],
      department: 'MAS', // 仮: 手動で編集可
      pattern: "a'",     // 仮: 手動で編集可
      batchName,
      pieces: piecesMatch ? parseInt(piecesMatch[0]) : 0,
    };
  });

  return parsedOrders;
}
