// lib/utils/ocrParser.ts
import Tesseract from 'tesseract.js'
import {batchNameMap}  from '@/data/batchNameMap.json'

export async function parseImageToCategories(file: File): Promise<{ category: string; pieces: number }[]> {
  const imageData = await file.arrayBuffer()

  const result = await Tesseract.recognize(imageData, 'jpn', {
    logger: (m) => console.log(m)
  })

  const lines = result.data.text.split(/\n|\r/).map(line => line.trim()).filter(Boolean)

  const extractedData: { category: string; pieces: number }[] = []

  for (const line of lines) {
    for (const katakana of Object.keys(batchNameMap)) {
      if (line.includes(katakana)) {
        const matched = batchNameMap[katakana]
        const pieceMatch = line.match(/\d{2,6}/) // 数字2桁以上をピース数と仮定
        const pieces = pieceMatch ? parseInt(pieceMatch[0], 10) : 0

        extractedData.push({ category: matched, pieces })
      }
    }
  }

  return extractedData
}

