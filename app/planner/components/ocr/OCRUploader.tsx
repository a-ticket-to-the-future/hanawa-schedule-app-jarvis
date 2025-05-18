// components/ocr/OCRUploader.tsx
"use client"
import { useState } from "react"
import Tesseract from "tesseract.js"
import { normalizeOCRText } from "@/lib/morning/normalizeText"

export default function OCRUploader() {
  const [rawText, setRawText] = useState("")
  const [normalized, setNormalized] = useState<{ original: string; normalized: string }[]>([])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const { data: { text } } = await Tesseract.recognize(file, "jpn", {
      tessedit_char_whitelist: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンー",
    })

    setRawText(text)

    const normalizedResult = normalizeOCRText(text)
    setNormalized(normalizedResult)
  }

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <div>
        <h2 className="text-lg font-semibold">OCR結果（元テキスト）</h2>
        <pre className="bg-gray-100 p-2 whitespace-pre-wrap">{rawText}</pre>
      </div>
      <div>
        <h2 className="text-lg font-semibold">変換後カテゴリ一覧</h2>
        <ul className="list-disc list-inside">
          {normalized.map((entry, i) => (
            <li key={i}>
              <strong>{entry.normalized}</strong>（元: {entry.original}）
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}