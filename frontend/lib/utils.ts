export function round(value: number | null) {
  return value === null ? "N/A" : Math.round(value * 10) / 10;
}
