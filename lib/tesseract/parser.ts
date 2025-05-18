import { categoryMap } from "@/data/categoryMap"

export type ParsedTask = {
  department: "MAS" | "DAS" | "WDA"
  category: string
  pieces: number
}

export function normalizeCategory(raw: string): string {
  return categoryMap[raw.trim()] || raw.trim()
}

export function parseRawText(rawText: string): ParsedTask[] {
  const lines = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)

  const result: ParsedTask[] = []

  lines.forEach((line) => {
    const match = line.match(/(MAS|DAS|WDA)[\s　]*(.+)[\s　]*(\d+)/i)
    if (match) {
      const [, department, rawCategory, piecesStr] = match
      const category = normalizeCategory(rawCategory)
      const pieces = parseInt(piecesStr)
      result.push({ department: department.toUpperCase() as any, category, pieces })
    }
  })

  return result
}