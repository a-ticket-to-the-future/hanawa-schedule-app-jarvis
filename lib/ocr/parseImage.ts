// lib/ocr/parseImage.ts

import {categoryMap} from "@/data/categoryMap";

/**
 * OCRから取得したテキストをJSON形式に変換する。
 * @param text OCRで読み取ったテキスト
 * @returns { department: string; category: string; pieces: number }[]
 */
export function parseOCRText(text: string) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);

  const parsedData: {
    department: string;
    category: string;
    pieces: number;
  }[] = [];

  let currentDepartment = "";

  for (const line of lines) {
    if (/^(MAS|DAS|WDA)/i.test(line)) {
      currentDepartment = line.slice(0, 3).toUpperCase();
      continue;
    }

    // カタカナを正規化（例：ジョコシギャン → 賞味期限）
    const matched = Object.keys(categoryMap).find((key) => line.includes(key));
    if (!matched) continue;

    const normalizedCategory = categoryMap[matched];
    const numberMatch = line.match(/\d+/);
    const pieces = numberMatch ? parseInt(numberMatch[0], 10) : 0;

    parsedData.push({
      department: currentDepartment,
      category: normalizedCategory,
      pieces,
    });
  }

  return parsedData;
}
