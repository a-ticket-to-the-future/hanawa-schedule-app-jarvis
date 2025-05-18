// lib/normalizeBatchText.ts

/**
 * カタカナから正規化されたカテゴリ名への変換テーブル
 */
const normalizationMap: Record<string, string> = {
  "ジョコシキヤン": "賞味期限",
  "ベーヒーニョヨコ": "ベビー衣料",
  "コドモベーヒギ": "子供肌着",
  "タンシンイリョウ": "男児衣料",
  "ジョシイリョウ": "女児衣料",
  "クツ": "靴",
  "コトモヘキヤキ": "子供肌着",
  "ジヨシイリヨウ": "女児衣料",
  // 他にも必要な置換があればここに追加
}

/**
 * カタカナを正規化名へ変換する
 * @param katakanaName OCRで読み取られたバッチ名（カタカナ）
 * @returns 日本語の正規化カテゴリ名
 */
export function normalizeBatchName(katakanaName: string): string {
  for (const [key, value] of Object.entries(normalizationMap)) {
    if (katakanaName.includes(key)) {
      return value
    }
  }
  return katakanaName // マッチしない場合はそのまま返す
}
