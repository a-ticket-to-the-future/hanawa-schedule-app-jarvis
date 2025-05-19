// export function ceilToQuarter(hours: number): number {
//   return Math.ceil(hours / 0.25) * 0.25;
// }


export function minutesToTimeString(minutes: number): string {
  const totalMinutes = Math.round(minutes);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}


// lib/utils/timeUtils.ts
export function roundToQuarter(hours: number): number {
  return Math.ceil(hours * 4) / 4;
}