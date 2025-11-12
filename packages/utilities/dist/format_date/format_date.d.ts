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
export declare function format_date(date: Date | string, format?: 'short' | 'long'): string;
//# sourceMappingURL=format_date.d.ts.map