// lib/parseOcrToJson.ts
import { normalizeBatchName } from "@/lib/normalizeBatchText"

type ParsedEntry = {
  department: "MAS" | "DAS" | "WDA"
  category: string
  pieces: number
}

export function parseOcrToJson(rawText: string): ParsedEntry[] {
  const lines = rawText.split("\n").map(line => line.trim()).filter(line => line.length > 0)
  const parsed: ParsedEntry[] = []

  let currentDept: ParsedEntry["department"] | null = null

  for (const line of lines) {
    // 部署識別（例: MAS、DAS、WDA）
    if (/^MAS/.test(line)) {
      currentDept = "MAS"
    } else if (/^DAS/.test(line)) {
      currentDept = "DAS"
    } else if (/^WDA/.test(line)) {
      currentDept = "WDA"
    }

    // バッチ名とピース数を抽出（部署名がない行）
    if (!/^MAS|DAS|WDA/.test(line) && currentDept) {
      const parts = line.split(/\s+/)
      const rawBatchName = parts.slice(0, -1).join(" ")
      const normalizedName = normalizeBatchName(rawBatchName)
      const pieceStr = parts[parts.length - 1].replace(/[^\d]/g, "")
      const pieces = parseInt(pieceStr, 10)

      if (!isNaN(pieces)) {
        parsed.push({
          department: currentDept,
          category: normalizedName,
          pieces,
        })
      }
    }
  }

  return parsed
}
