// lib/morning/normalizeText.ts

// 変換マップ：カタカナ → 正規化日本語（読みやすいカテゴリ名）
const categoryMap: Record<string, string> = {
  "ショウミキゲン": "賞味期限",
  "ベーヒーニョヨコ": "ベビー衣料",
  "コドモベーヒギ": "子供肌着",
  "タンシンイリョウ": "男児",
  "ジョシイリョウ": "女児",
  // 必要に応じて他の変換もここに追加
}

// 入力テキスト（OCR結果の文字列）から行単位で正規化カテゴリを抽出
export function normalizeOCRText(rawText: string): { category: string; raw: string }[] {
  const lines = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  const normalized = lines.map((line) => {
    const katakana = Object.keys(categoryMap).find((key) => line.includes(key))
    return {
      raw: line,
      category: katakana ? categoryMap[katakana] : line, // 見つからなければそのまま表示
    }
  })

  return normalized
}
