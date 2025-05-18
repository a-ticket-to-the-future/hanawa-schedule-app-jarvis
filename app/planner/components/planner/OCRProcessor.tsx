"use client"

import { useState } from "react"
import Tesseract from "tesseract.js"

export default function OCRProcessor({ image }: { image: File }) {
  const [text, setText] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleOCR = async () => {
    setIsLoading(true)
    const reader = new FileReader()

    reader.onload = async () => {
      const imageDataUrl = reader.result as string
      const result = await Tesseract.recognize(imageDataUrl, "jpn", {
        logger: (m) => console.log(m),
      })
      setText(result.data.text)
      setIsLoading(false)
    }

    reader.readAsDataURL(image)
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleOCR}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? "読み取り中..." : "OCR実行"}
      </button>
      <textarea
        className="w-full h-64 p-2 border border-gray-300 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  )
}

