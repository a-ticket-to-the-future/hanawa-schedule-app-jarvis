// components/morning/ImageUploader.tsx

import { useState } from "react"
import { extractCategoryDataFromImage } from "@/lib/morning/parseImage"

export default function ImageUploader() {
  const [result, setResult] = useState<{ category: string; pieces: number }[]>([])
  const [loading, setLoading] = useState(false)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)

    const reader = new FileReader()
    reader.onload = async () => {
      const imageData = reader.result as string
      const parsed = await extractCategoryDataFromImage(imageData)
      setResult(parsed)
      setLoading(false)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">画像からの受注データ解析</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {loading && <p className="text-blue-500">読み取り中...</p>}
      {!loading && result.length > 0 && (
        <div className="border p-2 rounded">
          <h3 className="font-bold">抽出されたカテゴリとピース数</h3>
          <ul className="list-disc pl-5">
            {result.map((item, idx) => (
              <li key={idx}>
                {item.category}: {item.pieces}ピース
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
