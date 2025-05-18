import { useState } from "react"
import { extractAndConvertCategories } from "@/lib/tesseract/ocrHandler"

export default function OCRPage() {
  const [result, setResult] = useState<string[]>([])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const { categories } = await extractAndConvertCategories(file)
      setResult(categories)
    }
  }

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <ul className="mt-4 list-disc list-inside">
        {result.map((cat, i) => (
          <li key={i}>{cat}</li>
        ))}
      </ul>
    </div>
  )
}