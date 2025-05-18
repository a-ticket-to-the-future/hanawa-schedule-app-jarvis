// lib/utils/calculateWorkTimes.ts

import { categoryMap } from "@/lib/utils/categoryMap"

export type WorkInput = {
  department: "MAS" | "DAS" | "WDA"
  category: string // カタカナ（例：ショウミキゲン）
  pieces: number
  people: number
  productivity: number
}

export type WorkOutput = {
  department: string
  category: string
  pieces: number
  hours: number
}

export function normalizeCategoryName(kana: string): string {
  return categoryMap[kana] || kana // マッピングされていなければそのまま返す
}

export function calculateWorkTimes(data: WorkInput[]): WorkOutput[] {
  return data.map((entry) => {
    const category = normalizeCategoryName(entry.category)
    const hours = parseFloat(
      (entry.pieces / (entry.people * entry.productivity)).toFixed(2)
    )

    return {
      department: entry.department,
      category,
      pieces: entry.pieces,
      hours,
    }
  })
}

