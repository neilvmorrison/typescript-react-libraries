/**
 * Extracts and returns the first two initials from a full name string.
 *
 * @param full_name - The full name to extract initials from
 * @returns Up to two uppercase initials derived from the name
 *
 * @example
 * ```typescript
 * get_user_initials('John Doe');        // 'JD'
 * get_user_initials('Jane Smith');      // 'JS'
 * get_user_initials('Madonna');         // 'M'
 * get_user_initials('Mary Jane Watson'); // 'MJ'
 * ```
 */
export function get_user_initials(full_name: string): string {
  return full_name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
}
