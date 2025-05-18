// lib/morning/parseImage.ts
import { createWorker } from "tesseract.js";
import { OCRParsedEntry } from "@/types/ocr";
// import { parseImageToText } from "../utils/parseImage";

const katakanaToCategory: Record<string, string> = {
  "ショウミキゲン": "賞味期限",
  "ベビーイリョウ": "ベビー衣料",
  "コドモハダギ": "子供肌着",
  "タンシンイリョウ": "男児",
  "ジョシイリョウ": "女児",
  "ベーヒーニョヨコ": "ベビー衣料",
  "コドモベーヒギ": "子供肌着"
};

export async function parseImage(image: File): Promise<OCRParsedEntry[]> {

  const worker = await createWorker("jpn");
  // ({
  //   logger: (m) => console.log(m), // 進行状況確認用（任意）
  // });

  // await worker.load();
  // await worker.loadLanguage("jpn");
  // await worker.reinitialize("jpn");

  await worker.setParameters({
    tessedit_char_whitelist:
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789",
  });

  const { data } = await worker.recognize(image)
  //   ,undefined,{
  //   logger: (m:any) => console.log(m), 
  // });
  await worker.terminate();

  const lines = data.text.split("\n").map((line) => line.trim()).filter(Boolean);
  const results: OCRParsedEntry[] = [];

  for (const line of lines) {
    const match = line.match(/^([\u30A0-\u30FFー]+)[^0-9]*([0-9]{1,5})/);
    if (match) {
      const rawKatakana = match[1];
      const pieces = parseInt(match[2], 10);
      const category = katakanaToCategory[rawKatakana] || rawKatakana;
      // const department = ""
      results.push({ category, pieces,department:"" });
    }
    console.log("Image type:", image); // File として渡されているか？
  }

  return results;
}