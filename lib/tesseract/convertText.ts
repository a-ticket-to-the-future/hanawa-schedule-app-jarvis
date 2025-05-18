// lib/tesseract/convertText.ts

// カタカナ -> 日本語変換マップ
const categoryMap: Record<string, string> = {
  "ショウミキゲン": "賞味期限",
  "ジョコシギャン": "賞味期限",
  "ベーヒーニョヨコ": "ベビー衣料",
  "コドモベーヒギ": "子供肌着",
  "タンシンイリョウ": "男児",
  "ジョシイリョウ": "女児"
  // 必要に応じて追加
}

/**
 * OCRで抽出されたテキストを正規のカテゴリー名に変換する
 * @param input - Tesseract.js などから取得したカタカナ文字列
 * @returns 変換後の日本語カテゴリー名（該当なしの場合は入力値）
 */
export function convertKatakanaText(input: string): string {
  const normalized = input.replace(/[^ァ-ン]/g, "") // カタカナのみ抽出
  return categoryMap[normalized] || input // 該当すれば変換、なければそのまま返す
}