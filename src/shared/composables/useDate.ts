export function formatDate(value: string | Date | null | undefined, options?: Intl.DateTimeFormatOptions): string {
  if (!value) return 'Present';
  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    ...options,
  });
}

export function formatDateRange(start: string | Date | null, end: string | Date | null): string {
  const startStr = formatDate(start);
  const endStr = formatDate(end);
  return `${startStr} — ${endStr}`;
}