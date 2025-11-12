/**
 * Creates a debounced function that delays execution until after a specified wait period
 * has elapsed since the last time it was invoked.
 *
 * @param fn - The function to debounce
 * @param delay - The number of milliseconds to delay execution
 * @returns A debounced version of the provided function
 *
 * @example
 * ```typescript
 * const search = debounce((query: string) => {
 *   console.log('Searching for:', query);
 * }, 300);
 *
 * search('react'); // Won't execute immediately
 * search('react hooks'); // Cancels previous call
 * // After 300ms of no calls, executes with 'react hooks'
 * ```
 */
export function debounce(fn, delay) {
    let timeout = null;
    return function debounced(...args) {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}
//# sourceMappingURL=debounce.js.map