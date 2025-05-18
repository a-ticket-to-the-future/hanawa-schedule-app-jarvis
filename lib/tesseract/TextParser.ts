// lib/tesseract/TextParser.ts

import { createWorker } from 'tesseract.js'

/**
 * Tesseract.jsを使って画像からテキストを抽出する関数
 * @param imagePath - 画像ファイルのパスまたはBlob
 * @returns OCR結果としてのテキスト
 */
export async function extractTextFromImage(imagePath: string | File): Promise<string> {
  const worker = await createWorker('jpn', 1, {
    logger: (m) => console.log(m) // 進行状況のログ（必要に応じて）
  })

  await worker.load()
  await worker.loadLanguage('jpn')
  await worker.initialize('jpn')

  const {
    data: { text }
  } = await worker.recognize(imagePath)

  await worker.terminate()
  return text
}

/**
 * カタカナ → 正しいカテゴリー名への変換
 * Excelデータを参照して辞書化する予定がある場合は、ここを差し替え予定
 */
const categoryMap: Record<string, string> = {
  'ショウミキゲン': '賞味期限',
  'ベーヒーニョヨコ': 'ベビー衣料',
  'コドモベーヒギ': '子供肌着',
  'タンシンイリョウ': '男児',
  'ジョシイリョウ': '女児',
  // 追加可能
}

/**
 * テキストからカテゴリーごとのバッチ名やピース数を抽出・整形
 */
export function parseToJson(rawText: string): { category: string; pieces: number }[] {
  const lines = rawText.split('\n')
  const parsed = [] as { category: string; pieces: number }[]

  for (const line of lines) {
    const matched = line.match(/([\u30A0-\u30FFー]+).*?(\d{3,5})/) // カタカナ＋数字（ピース数）
    if (matched) {
      const katakana = matched[1].replace(/[ー]/g, '')
      const pieces = parseInt(matched[2])
      const category = categoryMap[katakana] || katakana // マップされていない場合は原文
      parsed.push({ category, pieces })
    }
  }

  return parsed
}
