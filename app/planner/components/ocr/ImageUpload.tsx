// components/ocr/ImageUpload.tsx
"use client"

import { useState } from "react"
// ⛳️ 修正ポイント：関数名を parseImage に合わせる
import { parseImage } from "@/lib/morning/parseImage"
import { ParsedOrder } from "@/types/ParsedOrder"

export default function ImageUpload({ onParsed }: { onParsed: (data: ParsedOrder[]) => void }) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [result, setResult] = useState<ParsedOrder[] | null>(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setLoading(true)

    try {
      const parsed = await parseImage(file);
      onParsed(parsed)
      setResult(parsed);
    } catch (error) {
      console.error("OCR解析中にエラーが発生しました:", error);
    } finally {
      setLoading(false);
      
    }
  };
  console.log(imageFile)
  console.log(result)


  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">受注データ画像アップロード</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {loading && <p className="text-blue-600">画像解析中...</p>}

      {result && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">解析結果</h3>
          <ul className="list-disc list-inside">
            {result.map((entry, idx) => (
              <li key={idx}>
                {entry.category} - {entry.pieces} pcs
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}