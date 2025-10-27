/**
 * Creates a throttled function that only executes at most once per specified time period.
 *
 * @param fn - The function to throttle
 * @param delay - The minimum time (in milliseconds) between function executions
 * @returns A throttled version of the provided function
 *
 * @example
 * ```typescript
 * const logScroll = throttle(() => {
 *   console.log('Scroll position:', window.scrollY);
 * }, 1000);
 *
 * window.addEventListener('scroll', logScroll);
 * // Executes immediately on first scroll, then at most once per second
 * ```
 */
export function throttle<T extends (...args: Parameters<T>) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let last_call = 0;

  return function throttled(...args: Parameters<T>) {
    const now = Date.now();
    if (now - last_call >= delay) {
      fn(...args);
      last_call = now;
    }
  };
}
