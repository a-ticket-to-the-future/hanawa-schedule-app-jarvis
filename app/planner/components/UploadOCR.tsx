// components/OCRUploader.tsx
"use client"

import { useState } from "react"
import Tesseract from "tesseract.js"

export default function OCRUploader({ onResult }: { onResult: (text: string) => void }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [ocrText, setOcrText] = useState<string>("")

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    setImageUrl(imageUrl)
    setIsLoading(true)
    setOcrText("")

    try {
      const result = await Tesseract.recognize(file, "jpn", {
        logger: (m) => console.log(m)
      })
      const text = result.data.text
      setOcrText(text)
      onResult(text)
    } catch (err) {
      console.error("OCR error:", err)
      alert("OCRに失敗しました。画像を確認してください。")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block border rounded p-2"
      />
      {isLoading && <p className="text-blue-600">読み取り中…</p>}
      {ocrText && (
        <div>
          <h3 className="font-semibold">OCR結果:</h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded border max-h-64 overflow-y-auto">
            {ocrText}
          </pre>
        </div>
      )}
      {imageUrl && <img src={imageUrl} alt="uploaded" width={300} height={400} className="max-w-xs border rounded" />}
    </div>
  )
}
