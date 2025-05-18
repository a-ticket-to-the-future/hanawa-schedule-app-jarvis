// // lib/ocr/tesseractClient.ts

// import Tesseract from "tesseract.js"

// export async function extractTextFromImage(file: File): Promise<string> {
//   try {
//     const { data: { text } } = await Tesseract.recognize(
//       file,
//       "jpn", // 日本語に対応したOCR
//       {
//         logger: (m) => console.log(m),
//       }
//     )
//     return text
//   } catch (error) {
//     console.error("OCRエラー:", error)
//     throw new Error("画像からテキストを抽出できませんでした。")
//   }
// }
// lib/ocr/tesseractClient.ts
import Tesseract from 'tesseract.js'

export async function recognizeTextFromImage(image: File): Promise<string> {
  const result = await Tesseract.recognize(image, 'jpn', {
    logger: m => console.log(m) // デバッグ用ログ（開発中のみ）
  })
  return result.data.text
}