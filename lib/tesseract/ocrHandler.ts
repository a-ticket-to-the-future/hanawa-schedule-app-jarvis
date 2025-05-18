import Tesseract from "tesseract.js"
import { convertKatakanaText } from "./convertText"

/**
 * 画像からテキストを読み取り、カテゴリー名を変換して返す
 * @param imageFile 画像ファイル（ブラウザでの File 型）
 * @returns 認識されたテキストと変換済みカテゴリー一覧
 */
export async function extractAndConvertCategories(imageFile: File): Promise<{
  rawText: string
  categories: string[]
}> {
  const result = await Tesseract.recognize(imageFile, "jpn", {
    logger: (m) => console.log(m), // 進捗表示用
  })

  const text = result.data.text
  const lines = text.split("\n").map(line => line.trim()).filter(line => line)

  // カタカナと思しき部分のみ変換対象とする（1行ごと）
  const converted = lines.map(line => convertKatakanaText(line))

  return {
    rawText: text,
    categories: converted,
  }
}