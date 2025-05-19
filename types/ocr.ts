// types/ocr.ts
export type OCRParsedEntry = {
  department: string | null | undefined;
  category: string;
  pieces: number;
};

// // もし他の場所に定義されているなら
// import { ParsedOrder } from "@/types/ocr";

export type NormalizedCategoryEntry = {
  original: string;     // 認識されたカタカナ
  normalized: string;   // 正規化された名前（編集可能）
};