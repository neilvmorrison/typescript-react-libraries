/**
 * Formats a Date object or date string into either a short (DD/MM/YYYY) or long (readable) format.
 *
 * @param date - The date to format. Can be a Date object or valid date string
 * @param format - The format type to use. Defaults to 'short'
 * @returns The formatted date string
 * @throws {Error} If the provided date is invalid
 *
 * @example
 * ```typescript
 * const date = new Date('2024-01-15');
 * format_date(date);              // '15/01/2024'
 * format_date(date, 'short');     // '15/01/2024'
 * format_date(date, 'long');      // 'Monday, January 15, 2024'
 * format_date('2024-01-15');      // '15/01/2024'
 * ```
 */
export function format_date(date, format = 'short') {
    const d = typeof date === 'string' ? new Date(date) : date;
    if (Number.isNaN(d.getTime())) {
        throw new Error('Invalid date');
    }
    if (format === 'long') {
        return d.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = String(d.getFullYear());
    return `${day}/${month}/${year}`;
}
//# sourceMappingURL=format_date.js.map