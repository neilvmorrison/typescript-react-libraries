/**
 * Returns the previous value of a variable from the last render.
 *
 * @param value - The value to track
 * @returns The previous value (undefined on first render)
 *
 * @example
 * ```typescript
 * const [count, setCount] = useState(0);
 * const previousCount = usePrevious(count);
 *
 * // On first render: previousCount is undefined
 * // After increment: previousCount is 0, count is 1
 * ```
 */
export declare function usePrevious<T>(value: T): T | undefined;
//# sourceMappingURL=use_previous.d.ts.map