export function normalizeName(original: string, limit: number): string {
  if (!original) return '';

  if (original.length > limit) {
    return `${original.slice(0, limit).trim()}...`;
  }
  return original;
}

export function normalizeInformation(original: number): string {
  return String(original.toFixed(2));
}
