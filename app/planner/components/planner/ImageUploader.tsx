// components/planner/ImageUploader.tsx
"use client"
import { useState } from "react"

export default function ImageUploader({ onImageSelected }: { onImageSelected: (file: File) => void }) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      onImageSelected(file)
    }
  }

  return (
    <div className="space-y-2">
      <label className="block font-medium">受注画像をアップロード</label>
      <input type="file" accept="image/*" onChange={handleChange} />
      {preview && <img src={preview} alt="preview" className="w-full max-w-md border rounded shadow" />}
    </div>
  )
}
