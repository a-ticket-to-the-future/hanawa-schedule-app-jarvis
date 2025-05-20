// components/ocr/UploadOCR.tsx
'use client';
import { useState } from 'react';
import { parseImage } from '@/lib/ocr/parseImage';
import ParsedResultEditor from '@/app/planner/components/editor/ParsedResultEditor';
import { ParsedOrder } from '@/types/ParsedOrder';

export default function UploadOCR() {
  const [orders, setOrders] = useState<ParsedOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const result = await parseImage(file);
    setOrders(result);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFile} className="border p-2" />
      {loading && <p>OCR解析中...</p>}
      {orders.length > 0 && (
        <ParsedResultEditor data={orders} onUpdate={setOrders} />
      )}
    </div>
  );
}
