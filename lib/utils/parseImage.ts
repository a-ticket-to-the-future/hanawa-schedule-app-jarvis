// lib/utils/parseImage.ts

import Tesseract from 'tesseract.js'

// OCR 処理関数（画像ファイルを受け取ってテキスト抽出）
export async function parseImageToText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(file, 'jpn', {
      logger: m => console.log(m), // 進行状況のログ（任意）
    })
      .then(({ data: { text } }) => {
        resolve(text)
      })
      .catch(err => {
        console.error('OCR failed:', err)
        reject(err)
      })
  })
}
