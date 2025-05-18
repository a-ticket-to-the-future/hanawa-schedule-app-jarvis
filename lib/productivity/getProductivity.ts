// lib/productivity/getProductivity.ts

// 仮の生産性取得関数（現在は固定値を返す）
export async function getProductivity(
  department: string,
  category: string,
  date: string
): Promise<number> {
  // ここでは一旦ハードコードで返却（実運用ではAPIかDBアクセス）

  console.log(department)
  console.log(category)
  console.log(date)
  return 330; // pcs/人時
}
