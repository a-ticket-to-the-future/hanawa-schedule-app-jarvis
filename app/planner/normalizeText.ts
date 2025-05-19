// app/planner/normalizeText.ts

// 正規化用マッピング（Excelから反映）
const normalizationMap: Record<string, string> = {
  "ショウミキゲン": "賞味期限",
  "ジョコシギャン": "賞味期限",
  "コドモベーヒギ": "子供肌着",
  "ベーヒーニョヨコ": "ベビー衣料",
  "ジョシイリョウ": "女児",
  "タンシンイリョウ": "男児",
  "レ": "レインランチ",
  // 必要に応じて追加
};

export function normalizeBatchName(input: string): string {
  return normalizationMap[input] || input;
}

export function convertToJSON(rawText: string): { batch: string }[] {
  const lines = rawText.split("\n").map(line => line.trim()).filter(Boolean);

  // バッチ名とピース数などの仮パース（柔軟に改善予定）
  const data = lines.map(line => {
    const [katakana] = line.split(/\s+/);
    const normalized = normalizeBatchName(katakana);
    return { batch: normalized };
  });

  return data;
}
