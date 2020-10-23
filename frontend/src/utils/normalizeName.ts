export default function (original: string, limit: number): string {
  if (!original) return '';

  if (original.length > limit) {
    return `${original.slice(0, limit).trim()}...`;
  }
  return original;
}
