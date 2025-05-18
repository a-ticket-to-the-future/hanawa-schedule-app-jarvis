Upload Ocr Component
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
// components/ocr/UploadOCR.tsx
"use client"

import { useState } from "react"
import Tesseract from "tesseract.js"

export default function UploadOCR() {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setText("")

    try {
      const result = await Tesseract.recognize(file, "jpn", {
        logger: (m) => console.log(m),
      })
      setText(result.data.text)
    } catch (err) {
      console.error("OCR エラー:", err)
      setText("読み取りに失敗しました")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">受注データOCR読み取り</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="border p-2 rounded"
      />
      <div className="text-sm text-gray-600">
        {loading ? "読み取り中..." : text ? "読み取り結果:" : ""}
      </div>
      <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded max-h-96 overflow-y-auto">
        {text}
      </pre>
    </div>
  )
}

