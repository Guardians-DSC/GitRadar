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

export function normalizeDateLabel(original: Date): string {
  const day = String(original.getDate()).padStart(2, '0');
  const month = String(original.getMonth() + 1).padStart(2, '0');

  return `${day}/${month}`;
}
