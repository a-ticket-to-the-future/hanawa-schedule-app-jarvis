import { batchNameMap } from "@/lib/mappings/batchNameMap";

// Levenshtein距離を使って近似補正
function levenshtein(a: string, b: string): number {
  const matrix: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
    Array(b.length + 1).fill(i)
  );
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
}

export function normalizeBatchName(input: string): string {
  const entries = Object.entries(batchNameMap);

  const exact = entries.find(([key]) => key === input);
  if (exact) return exact[1];

  const ranked = entries
    .map(([key, value]) => ({
      key,
      value,
      distance: levenshtein(input, key),
    }))
    .sort((a, b) => a.distance - b.distance);

  const best = ranked[0];
  return best.distance <= 3 ? best.value : input;
}




//↓エラーがなかった↓

// import { batchNameMap } from "@/lib/mappings/batchNameMap";

// // Levenshtein距離を使って近似補正
// function levenshtein(a: string, b: string): number {
//   const matrix: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
//     Array(b.length + 1).fill(i)
//   );
//   for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

//   for (let i = 1; i <= a.length; i++) {
//     for (let j = 1; j <= b.length; j++) {
//       const cost = a[i - 1] === b[j - 1] ? 0 : 1;
//       matrix[i][j] = Math.min(
//         matrix[i - 1][j] + 1,
//         matrix[i][j - 1] + 1,
//         matrix[i - 1][j - 1] + cost
//       );
//     }
//   }

//   return matrix[a.length][b.length];
// }

// export function normalizeBatchName(input: string): string {
//   const entries = Object.entries(batchNameMap);

//   const exact = entries.find(([key]) => key === input);
//   if (exact) return exact[1];

//   const ranked = entries
//     .map(([key, value]) => ({
//       key,
//       value,
//       distance: levenshtein(input, key),
//     }))
//     .sort((a, b) => a.distance - b.distance);

//   const best = ranked[0];
//   return best.distance <= 3 ? best.value : input;
// }