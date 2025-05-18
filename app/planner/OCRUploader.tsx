// 修正対象: app/planner/components/ocr/OCRUploader.tsx

import { useState } from "react";
import { parseImage } from "@/lib/morning/parseImage";
import { OCRParsedEntry } from "@/types/ocr";
// import {}from ;

export default function OCRUploader({ onParsed }: { onParsed: (data: OCRParsedEntry[]) => void }) {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    if (file) {
      setImageFile(file);
      const parsed = await parseImage(file);
      onParsed(parsed);
    }
    console.log(file)
  };

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imageFile && <p>読み込んだファイル: {imageFile.name}</p>}
    </div>
  );
}
