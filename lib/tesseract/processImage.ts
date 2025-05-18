// lib/tesseract/processImage.ts
import Tesseract from "tesseract.js"

/**
 * アップロードされた画像ファイルからテキストを抽出する処理
 * @param imageFile 画像ファイル（input type="file" から受け取った File）
 * @returns 読み取ったテキスト（string）
 */
export async function extractTextFromImage(imageFile: File): Promise<string> {
  try {
    const result = await Tesseract.recognize(imageFile, "jpn", {
      logger: (m) => console.log("Tesseract:", m),
    })
    return result.data.text
  } catch (error) {
    console.error("画像からのテキスト抽出に失敗しました", error)
    throw error
  }
}
