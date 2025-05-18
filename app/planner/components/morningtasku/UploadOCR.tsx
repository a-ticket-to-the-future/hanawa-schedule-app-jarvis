"use client";

import { useState } from "react";
import Tesseract from "tesseract.js";
import { parseOCRText } from "@/lib/ocr/parseImage";

export default function UploadOCR({ onParsed }: { onParsed: (data: any[] ) => void }) {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleProcess = async () => {
    if (!image) return;

    setLoading(true);
    setError("");

    try {
      const { data: { text } } = await Tesseract.recognize(image, "jpn");
      const json = parseOCRText(text);
      onParsed(json);  // ← JSONを親に渡す
    } catch (err) {
      setError("OCR処理に失敗しました");

      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        onClick={handleProcess}
        disabled={!image || loading}
        className="bg-blue-600 text-white px-4 py-1 rounded"
      >
        {loading ? "処理中…" : "画像から読み取り"}
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}