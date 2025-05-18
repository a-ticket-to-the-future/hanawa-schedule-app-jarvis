// lib/tesseract/ocr.ts
import Tesseract from 'tesseract.js'

export async function extractTextFromImage(imageFile: File): Promise<string> {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(imageFile, 'jpn', {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        resolve(text)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
